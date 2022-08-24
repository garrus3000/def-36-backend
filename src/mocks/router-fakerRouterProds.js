const Router = require('express').Router;
const  {createFakeProducts}  = require('./createFakeProds.js');

const fakerRouterProds = Router();

fakerRouterProds.get("/productos-test", async (req, res) => {
    const productos = await createFakeProducts();
    if (productos.length > 0)
        return res
            .status(200)
            .render("mockprod", { productos, title: "Faker.js Productos" })
    else return res.status(404).send("No se encontraron productos");
});


module.exports = fakerRouterProds;