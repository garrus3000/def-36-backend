const Router = require("express").Router;
const routerProductos = Router();


// const ContenedorProductos = require("../controllers/contenedorProductos");
// const productosDao = require('../daos/index.js')

// const ContenedorProductos = require('../controllers/mongodb/ProdMongoController')

const {loggerError} = require("../logs/winston");


// const productos = new ContenedorProductos("./src/DB/productos.json");
// const productos = productosDao;

const productosDao = require('../daos/index.js')

const productos = productosDao;


routerProductos.get('/api/productos', async (req, res) => {
    res.status(200).send(await productos.productsDao.getAll())
});

routerProductos.get("/api/productos/:id?", async (req, res) => {
    const id = req.params.id;
    const productoPorId = await productos.productsDao.getById(id);
    if (productoPorId !== null) return res.status(200).send(productoPorId);
    else {
        loggerError.log({
            level: "error",
            message: `Error Metodo: ${req.method} Producto ${id} no existe`,
        });
        return res.status(404).send(await productos.productsDao.getAll());
    }
});

routerProductos.post("/api/productos", async (req, res) => {
    const producto = req.body;
    const producto_agregado = await productos.productsDao.save(
        producto,
        (producto.codigo = Date.now()),
        (producto.timestamp = new Date().toISOString())
    );
    res.status(201).send(producto_agregado);
});

routerProductos.delete("/api/productos/:id", async (req, res) => {
    const id = req.params.id;
    const productoPorId = await productos.productsDao.getById(id);
    if (productoPorId !== null) {
        await productos.productsDao.deleteById(id);
        return res.status(201).send(`Producto ID: ${id} borrado`);
    } else {
        loggerError.log({
            level: "error",
            message: `Error Metodo: ${req.method} Producto ${id} no existe`,
        });
        return res.status(404).json(`ERROR Producto ID:${id} no encontrado`);
    }
});

routerProductos.put("/api/productos/:id", async (req, res) => {
    const id = req.params.id;
    const exist = await productos.productsDao.getById(id);
    if (exist !== null) {
        const { nombre, precio, foto, stock } = req.body;
        const prod_editado = await productos.productsDao.updateById((id), {
            nombre,
            precio,
            foto,
            stock,
        });
        res.status(201).send(await productos.productsDao.getById(id));
    } else res.status(404).json(`ERROR ID:${id} no encontrado`);
});

module.exports = routerProductos;