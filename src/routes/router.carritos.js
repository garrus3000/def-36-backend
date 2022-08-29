const Router = require("express").Router;
const routerCarritos = Router();


const { cartDao } = require("../daos/index.js");
// const { isAuth } = require("../middlewares/permisos.js");

const carritos = cartDao;
const { productsDao } = require("../daos");
const productos = productsDao;

routerCarritos.get("/", async ( req, res) => {
    carts = await carritos.getAllCart()
    carts
        ? res.status(200).send(carts)
        : res.status(404).json({ message: "No hay carritos disponibles" });
});

routerCarritos.post("/",  async (req, res) => {
    const id = await carritos.createCarrito();
    res.status(201).send(`Carrito creado con el id: ${id} correctamente`);
});

routerCarritos.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await carritos.deleteCartbyId(id) !== null
        ? res.status(201).send(`Carrito con el ID: ${id} eliminado`)
        : res.status(404).send(`Error ID:${id} no encontrado`);
});

routerCarritos
    .route("/:id/productos")
    .get( async (req, res) => {
        const id = req.params.id;
        const prodInCart = await carritos.getById(id);
        prodInCart !== null
            ? res.status(200).send(prodInCart)
            : res.status(404).send(`Error ID cart:${id} no encontrado`);
    })
    .post( async (req, res) => {
        const id = req.params.id;
        const { id_prod } = req.body;
        const carrito = await carritos.getById(id);
        const prod = await productos.getById(id_prod);
        if (prod !== null && carrito !== null) {
            await carritos.addProduct(id, prod)
            res.status(201).send(await carritos.getById(id));
        } else {
            res.status(404).send(`Error en ID cart:${id} y/o ID prod:${id_prod}, no encontrado/s`);
        }
    });

routerCarritos.delete("/:id/productos/:id_prod", async (req, res) => {
    const id = req.params.id;
    const {id_prod} = req.params;
    (await carritos.deleteProduct(id, id_prod)) !== null
        ? res.status(201).send(`Producto/s ID: ${id_prod} eliminado/s del carrito ID: ${id}`)
        : res.status(404).send(`Error en ID cart:${id} y/o ID prod:${id_prod}, no encontrado/s`);
});

module.exports = routerCarritos;