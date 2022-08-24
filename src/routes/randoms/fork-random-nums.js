const { getRandomNumbers } = require('./random-nums');

const Router = require('express').Router;
// const {fork} = require('child_process');

const routerRandomNums = Router();

routerRandomNums.get('/',  (req, res) => {
    const cantidad = req.query.cantidad || 1e8;
    res.json(getRandomNumbers(cantidad));
});

// routerRandomNums.get("/", (req, res) => {
//     const cant = req.query.cant || 1e8;
//     const forked = fork('./src/routes/forked/random-nums.js');
//     forked.send(cant);
//     forked.on('message', (resultados) => {
//         res.send(resultados);
//     });
// });

module.exports = routerRandomNums;