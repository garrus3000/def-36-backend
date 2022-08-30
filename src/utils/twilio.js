require('dotenv').config({path: '../../.env'});
const twilio = require('twilio');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;

const client = twilio(accountSid, authToken)

try {
    const message = client.messages.create({
        to: process.env.YOUR_PHONE,
        from: process.env.TWILIO_PHONE,
        body: "Hola soy un mensaje de TWILIO",
    }).then((data) =>{
        console.log('Mensajes enviado correctamente')
    }).catch((error) =>{
        console.log("error", error)
    })
} catch (error) {
    console.log(error)
}

