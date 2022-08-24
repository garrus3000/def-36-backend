// import { parse } from "dotenv";
// import mongoose from "mongoose";
// import config from "../../configs/config.js";
// const { parse } = require("dotenv");
const mongoose = require("mongoose");
const config = require('../../config/config.js');
const { logger, loggerError } = require("../../logs/winston.js");

try {
    mongoose.connect(config.mongoDb.url, config.mongoDb.options);
    console.log("Connected to MongoDB Cart");
    logger.log("info","Connected to MongoDB Cart")
} catch (error) {
    console.log(error);
    loggerError.log("error",error)
};

// const prodSchema = new mongoose.Schema({
//     timestamp: { type: String, required: true, max: 50 },
//     nombre: { type: String, required: true, max: 100 },
//     descripcion: { type: String, required: true, max: 400 },
//     codigo: { type: String, required: true },
//     precio: { type: Number, required: true },
//     stock: { type: Number, required: true },
//     id : { type: Number }
// });

const schema = new mongoose.Schema({
    id: { type: Number, required: true },
    timestamp: { type: Number },
    productos: { type: Array },
});


class CartMongoController {
    constructor() {
        this.collection = mongoose.model("carts", schema);
    }

    getAllCart = async () => {
        try {
            return await this.collection.find();
        } catch (error) {
            throw new Error("Error", error);
        }
    };

    createCarrito = async () => {
        try {
            const carritos = await this.getAllCart();
            if (carritos.length === 0) {
                const carrito = { id: 1, timestamp: Date.now(), productos: [] };
                const newElement = new this.collection(carrito);
                const result = await newElement.save();
                return result.id;
            } else {
                const carrito = {
                    id: carritos.length + 1,
                    timestamp: Date.now(),
                    productos: [],
                };
                const newElement = new this.collection(carrito);
                const result = await newElement.save();
                return result.id;
            }
        } catch (error){
            throw new Error("Error", error);
        }
    };

    deleteCartbyId = async (id) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) return null;
            else return await this.collection.findByIdAndDelete({ _id: id });
        } catch (error) {
            throw new Error("Error", error);
        }
    };

    addProduct = async (id, newElement) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) return null;
            else {
                const carrito = await this.collection.findById(id);
                if (carrito !== null) {
                    carrito.productos.push(newElement);
                    const result = await this.collection.findByIdAndUpdate(
                        id,
                        carrito
                    );
                    return result;
                } else return null;
            }
        } catch (error) {
            console.log(error);
            loggerError.log(error)
            throw new Error("Error adding product", error);
        }
    };

    getById = async (id) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) return null;
            else {
                const carrito = await this.collection.findById(id);
                if (carrito !== null) return carrito.productos;
                else return null;
            }            
        } catch (error){
            throw new Error("Error pidiendo los datos", error);
        }
    };

    deleteProduct = async (id, prodId) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) return null;
            else {
                const cart = await this.collection.findOne({ _id: id });
                if (cart !== null) {
                    const productos = cart.productos;
                    const mapOfIndex = productos.map((producto) => JSON.stringify(producto._id));
                    const index = mapOfIndex.indexOf(JSON.stringify(prodId));

                    if (index !== -1) {
                        productos.splice(index, 1);
                        const result = await this.collection.findByIdAndUpdate( id, { productos } );
                        return result;
                    } else return null;
                    
                } else return null;
            }
        } catch (error){
            throw new Error("Error borrando el producto", error);
        }
    };
}

// export default CartMongoController;
module.exports = CartMongoController;