const fs = require("fs");
const { loggerError } = require("../../logs/winston");

class ContenedorMensajes {
    constructor(fileName) {
        this.fileName = fileName;
    }

    async getAll() {
        if (fs.existsSync(this.fileName)) {
            const contenido = await fs.promises.readFile(this.fileName,"utf-8");
            try {
                const _mensajes = JSON.parse(contenido);
                return _mensajes;
            } catch (error) {
                loggerError.log({
                    level: "error",
                    message: "Error getAll : " + error
                });
            }
        }
    }

    async save(msj) {
        if (fs.existsSync(this.fileName)) {
            const contenido = await fs.promises.readFile(this.fileName, "utf-8");
            try {
                const _mensajes = JSON.parse(contenido);
                let incrementId = _mensajes.length + 1;
                msj.id = incrementId;
                msj.id_text = incrementId;
                _mensajes.push(msj);
                fs.writeFileSync(this.fileName, JSON.stringify(_mensajes, null, 2));
            } catch (error) {
                loggerError.log({
                    level: "error",
                    message: "Error save : " + error
                });
            }
        } else {
            const _mensajes = [];
            _mensajes.push(msj);
            fs.writeFileSync(this.fileName, JSON.stringify(_mensajes, null, 2));
        }
    }

    async getById(id) {
        if (fs.existsSync(this.fileName)) {
            const contenido = await fs.promises.readFile(this.fileName, "utf-8");
            try {
                const _mensajes = JSON.parse(contenido);
                const index = _mensajes.findIndex(msj => msj.id === id);
                if (index !== -1) return _mensajes[index];
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

    async deleteById(id) {
        if (fs.existsSync(this.fileName)) {
            const contenido = await fs.promises.readFile(this.fileName, "utf-8");
            try {
                const _mensajes = JSON.parse(contenido);
                const index = _mensajes.findIndex(msj => msj.id === id);
                if (index !== -1) {
                    _mensajes.splice(index, 1);
                    fs.writeFileSync(this.fileName, JSON.stringify(_mensajes, null, 2));
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

    async updateById(id, msj) {
        if (fs.existsSync(this.fileName)) {
            const contenido = await fs.promises.readFile(this.fileName, "utf-8");
            try {
                const _mensajes = JSON.parse(contenido);
                const index = _mensajes.findIndex(msj => msj.id === id);
                if (index !== -1) {
                    _mensajes[index] = msj;
                    fs.writeFileSync(this.fileName, JSON.stringify(_mensajes, null, 2));
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
}

module.exports = ContenedorMensajes;