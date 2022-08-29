const mongoose = require("mongoose");
const config = require('../../config/config.js');

const { logger, loggerError } = require("../../logs/winston.js");


try {
    mongoose.connect(config.mongoDb.url, config.mongoDb.options)
    logger.log("info", "Connected to MongoDB Users")
} catch (error) {
    loggerError.log('error',error)
};

class UserMongoController {
    constructor(collection, schema) {
        this.collection = mongoose.model(collection, schema);
    }

    getAll = async () => {
        try {
            return await this.collection.find({});
        } catch (error) {
            throw new Error(error);
        }
    }

    async getById(id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) return null;
            else return await this.collection.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = UserMongoController;