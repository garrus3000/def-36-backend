const mongoose = require("mongoose");
const usuarioSchema = require("../../config/models/usuarios");

const UserMongoController = require("../../controllers/mongodb/UserMongoController");


class MongoDbDaoUser extends UserMongoController {
    constructor() {
        super('usuarios', usuarioSchema)
    }
}

module.exports = MongoDbDaoUser;