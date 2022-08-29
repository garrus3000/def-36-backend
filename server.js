require('dotenv').config();

const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const { engine } = require('express-handlebars');

const fakerRouterProds = require('./src/mocks/router-fakerRouterProds.js');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');


const yargArgs = require('./src/routes/yarg-cli.js');
const cluster = require('cluster');
const os = require('os');


const routerAll = require('./src/routes/router.js')
const routerRandomNums = require('./src/routes/randoms/fork-random-nums.js');
const routerInfo = require('./src/routes/info.js');
const compression = require('compression');
const { logger, loggerWarn, loggerError } = require('./src/logs/winston.js');

const routerMensajes = require('./src/routes/router.mensajes.js');
const routerProductos = require('./src/routes/router.productos.js');
const sockets = require('./src/chat/sockets.js');
const routerCarritos = require('./src/routes/router.carritos.js');


const app = express();
const httpServer = new HttpServer(app)
const ioServer = new IOServer(httpServer)

app.use(compression())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.engine(
	'hbs',
	engine({
	  extname: '.hbs',
	  defaultLayout: 'main.hbs',
	  partialsDir: './public/views/partial'
	})
);

app.set('views', './public/views');
app.set('view engine', 'hbs');


app.use(cookieParser());

app.use(
	session({
		store: MongoStore.create({
			mongoUrl:process.env.MONGO_ATLAS_URL,
			mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
		}),
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true,
		rolling: true,
		cookie: {
			maxAge: 1000 * 60 * 10,
		},
	})
);

//logger info, rutas y metodos
app.use((req, _, next) => {
	logger.log("info", `Ruta: ${req.originalUrl} y Metodo: ${req.method} solicitado`);
	return next();
});

app.use(routerMensajes);

app.use(routerProductos)

app.use('/api/carrito',routerCarritos)

app.use('/api', fakerRouterProds);

app.use(routerAll);

app.use('/info', routerInfo);

app.use('/api/randoms', routerRandomNums);

// Mostrar nuevos msjs y prods
sockets.scocketMsjAndProd(ioServer);


// Ataja errores, logger Errores
app.use((error, req, res, next) => {
	loggerError.log("error", error);
	res.status(500).send(error.message);
});

// Rutas inexistentes, logger Warnings
app.use((req, res) => {
	loggerWarn.log("warn", `Ruta ${req.originalUrl} y metodo ${req.method} no implementada - fyh: ${new Date().toLocaleString()} `)
	res.status(404).send({
		error: -2,
		descripcion: `ruta ${req.originalUrl} y metodo ${req.method} no implementada`,
	});
});


const PORT = yargArgs.puerto;
// const PORT = process.env.PORT || 8080;
const MODO = yargArgs.modo;
const nroCPUs = os.cpus().length;


if (MODO !== 'FORK' && MODO !== 'CLUSTER') {
	new Error(loggerError.log("error", `Modo ${MODO} no implementado, usando FORK`));
};

if(MODO === 'CLUSTER' && cluster.isPrimary) {
	for(let i = 0; i < nroCPUs; i++){
		cluster.fork();
	}
	cluster.on('online', (worker) => {
		logger.log('info', `Worker PID: ${worker.process.pid} is alive`);
	} );
	cluster.on('exit', (worker) => {
		logger.log("warn", `Worker PID: ${worker.process.pid} died`);
	} );
} else {
	httpServer.listen(PORT, () => {
		logger.log(
            "info",
            `Escuchando en el Puerto: ${httpServer.address().port} - MODO: ${MODO} - PID: ${process.pid} - fyh: ${new Date().toLocaleString()}`
        );
	} );
	httpServer.on("error", (error) => loggerError.log("error", error));
};