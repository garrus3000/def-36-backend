
// const ContenedorMensajes = require("../controllers/mongodb/contenedorMensajes.js");
const ContenedorMensajes = require("../controllers/file/contenedorMensajes");

const { logger } = require("../logs/winston.js");


const mensajes = new ContenedorMensajes("./src/DB/mensajes.json");
const productosDao = require('../daos/index.js')

const productos = productosDao;


// const {allNormalizeProcess} = require("../controllers/normalizr");

const scocketMsjAndProd =  (ioServer) => {
    ioServer.on("connection", async (socket) => {
        logger.log("info", `Nuevo usuario conectado`);

        socket.emit("messages", await mensajes.getAll());

        socket.on("new-message", async (msj) => {
            await mensajes.save(msj);
            await mensajes.getAll(),
            ioServer.sockets.emit(
                    "messages",
                    await mensajes.getAll()
                );
        });

        socket.emit("productos", await productos.productsDao.getAll());

        socket.on("agregarProducto", async (producto) => {
            await productos.productsDao.save(producto);
            ioServer.sockets.emit("productos", await productos.productsDao.getAll());
        });
    });
};

module.exports = {scocketMsjAndProd};