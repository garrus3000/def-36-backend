require('dotenv').config({path: '../../.env'});
const twilio = require('twilio');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;

//const client = twilio(accountSid, authToken)

// normal SMS
const twilioSMS = () => {
    const client = twilio(accountSid, authToken)
    try {
        const message = client.messages
            .create({
                from: process.env.TWILIO_PHONE,
                to: process.env.YOUR_PHONE,
                body: "Hola soy un mensaje de TWILIO",
            })
            .then((data) => {
                console.log("Mensaje enviado correctamente");
            })
            .catch((error) => {
                console.log("error", error);
            });
    } catch (error) {
        console.log(error);
    }
};

// Whatsapp
const twilioWhatsapp = () => {
    const client = twilio(accountSid, authToken)
    try {
        const message = client.messages
            .create({
                from: `whatsapp:${process.env.TWILIO_WHATSAPP}`,
                to: `whatsapp:${process.env.YOUR_WHATSAPP}`,
                body: "Hola soy un WHATSAPP de TWILIO",
            })
            .then((data) => {
                console.log("Whatsapp enviado correctamente");
            })
            .catch((error) => {
                console.log("error", error);
            });
    } catch (error) {
        console.log(error);
    }
};