const fs = require("fs");
const { loggerError } = require("../logs/winston");

class ContenedorProductos {
    constructor(fileName) {
        this.fileName = fileName;
    }

    async getAll() {
        if (fs.existsSync(this.fileName)) {
            const contenido = await fs.promises.readFile(this.fileName,"utf-8");
            try {
                const _productos = JSON.parse(contenido);
                return _productos;
            } catch (error) {
                loggerError.log({
                    level: "error",
                    message: "Error getAll : " + error
                });
            }
        }
    }

    async save(producto) {
        if (fs.existsSync(this.fileName)) {
            const contenido = await fs.promises.readFile(this.fileName, "utf-8");
            try {
                const _productos = JSON.parse(contenido);
                let incrementId = _productos.length + 1;
                producto.id = incrementId;
                _productos.push(producto);
                fs.writeFileSync(this.fileName, JSON.stringify(_productos, null, 2));
            } catch (error) {
                loggerError.log({
                    level: "error",
                    message: "Error save : " + error
                });
            }
        } else {
            const _productos = [];
            _productos.push(producto);
            fs.writeFileSync(this.fileName, JSON.stringify(_productos, null, 2));
        }
    }

    async getById(id) {
        if (fs.existsSync(this.fileName)) {
            const contenido = await fs.promises.readFile(this.fileName, "utf-8");
            try {
                const _productos = JSON.parse(contenido);
                const index = _productos.findIndex(producto => producto.id === id);
                if (index !== -1) return _productos[index];
                else  return null;
            } catch (error) {
                loggerError.log({
                    level: "error",
                    message: "Error getById : " + error
                });
            }
        }
        else {
            loggerError.log({
                level: "error",
                message: "No existe el archivo"
            });
        }
    }

    async updateById(id, ud_producto) {
        if (fs.existsSync(this.fileName)) {
            const contenido = await fs.promises.readFile(this.fileName, "utf-8");
            try {
                const _productos = JSON.parse(contenido);
                const index = _productos.findIndex(producto => producto.id === id);
                if (index !== -1) {
                    _productos[index] = ud_producto;
                    fs.writeFileSync(this.fileName, JSON.stringify(_productos, null, 2));
                }
                else return null;
            } catch (error) {
                loggerError.log({
                    level: "error",
                    message: "Error updateById : " + error
                });
            }
        }
        else {
            loggerError.log({
                level: "error",
                message: "No existe el archivo"
            });
        }
    }

    async deleteById(id) {
        if (fs.existsSync(this.fileName)) {
            const contenido = await fs.promises.readFile(this.fileName, "utf-8");
            try {
                const _productos = JSON.parse(contenido);
                const index = _productos.findIndex(producto => producto.id === id);
                if (index !== -1) {
                    _productos.splice(index, 1);
                    fs.writeFileSync(this.fileName, JSON.stringify(_productos, null, 2));
                }
                else return null;
            } catch (error) {
                loggerError.log({
                    level: "error",
                    message: "Error deleteById : " + error
                });
            }
        }
        else {
            loggerError.log({
                level: "error",
                message: "No existe el archivo"
            });
        }
    }
}

module.exports = ContenedorProductos;