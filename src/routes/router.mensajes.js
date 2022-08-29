// const ContenedorMensajes = require("../controllers/mongodb/contenedorMensajes");
const ContenedorMensajes = require("../controllers/file/contenedorMensajes");
const { loggerError } = require("../logs/winston");

const Router = require("express").Router;

const routerMensajes = Router();


const mensajes = new ContenedorMensajes("./src/DB/mensajes.json");

routerMensajes.get("/api/mensajes", async (req, res) => {
    res.status(200).send(await mensajes.getAll());
});

routerMensajes.get("/api/mensajes/:id?", async (req, res) => {
    const id = req.params.id;
    const mensajePorId = await mensajes.getById(Number(id));
    if (mensajePorId !== null) return res.status(200).send(mensajePorId);
    else {
        loggerError.log({
            level: "error",
            message: `Error Metodo: ${req.method} Mensaje ${id} no existe`,
        });
        return res.status(404).send(await mensajes.getAll());
    }
});

routerMensajes.delete("/api/mensajes/:id", async (req, res) => {
    const id = req.params.id;
    const mensajePorId = await mensajes.getById(Number(id));
    if (mensajePorId !== null) {
        await mensajes.deleteById(Number(id));
        return res.status(201).send(`Message ID: ${id} borrado`);
    } else {
        loggerError.log({
            level: "error",
            message: `Error Metodo: ${req.method} Mensaje ${id} no existe`,
        });
        return res.status(404).json(`ERROR Mensaje ID:${id} no encontrado`);
    }
});

// routerMensajes.post("/api/mensajes", async (req, res) => {
//     const { nombre, apellido, edad, email , alias, avatar, text } = req.body;
//     if (!nombre || !apellido || !edad || !email || !alias || !avatar || !text) {
//         return res.status(400).send("Faltan datos");
//     }
//     const mensaje = {
//         id: 1,
//         author: {
//             email: email,
//             nombre: nombre, 
//             apellido: apellido,
//             edad: edad,
//             alias: alias,
//             avatar: avatar,
//             fecha: new Date().toLocaleString(),
//         },
//         text: text,
//         id_text: 1
//     };
//     await mensajes.save(mensaje);
//     res.status(201).send(mensaje);
// });

module.exports = routerMensajes;