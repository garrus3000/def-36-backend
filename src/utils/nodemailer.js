require('dotenv').config({path: '../../.env'});
const nodemailer = require('nodemailer');
const { loggerError, logger } = require('../logs/winston');


const sendMailNewUserData = (nombre, email, age, adress, phone) => {
    try {
        const transporterGmail = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: process.env.GMAIL_ADRESS,
                pass: process.env.GMAIL_PWD,
            },
        });

        transporterGmail
            .sendMail({
                from: `CH Clase 36 <${process.env.GMAIL_ADRESS}>`,
                to: process.env.GMAIL_ADRESS,
                subject: "Nuevo usuario",
                html: `
                <h1 style="color:green>Nuevo Usuario Registrado</h1>
                <h2 style="color:blue>Datos:</h2>
                <p>Nombre: ${nombre}</p>
                <p>Email: ${email}</p>
                <p>Edad: ${age}</p>
                <p>Dirección: ${adress}</p>
                <p>Teléfono: ${phone}</p>
                `,
            })
            .then((result) => {
                logger.log("Nuevo usuario registrado. Email con datos enviado exitosamente");
            })
            .catch((error) => loggerError.log("error", error));
    } catch (error) {
        loggerError.log("Error en nodemailer al registrar un usuario", error);
    }
};

module.exports = sendMailNewUserData;