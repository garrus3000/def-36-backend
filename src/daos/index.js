const dotenv = require('dotenv').config();


let productsDao
let cartDao

switch (process.env.MOTOR) {
	// case 'json':
	// 	const fileDaoCarts  =  require('../daos/carts/fileDaoCarts.js');
	// 	const fileDaoProducts =  require('../daos/products/fileDaoProducts.js');

	// 	cartDao = new fileDaoCarts();
	// 	productsDao = new fileDaoProducts();
	// 	break;

	case 'mongodb':
		const  mongoDbDaoCarts  =  require('./carts/mongoDbDaoCarts.js');
		const  mongoDbDaoProducts  =  require('./products/mongoDbDaoProducts.js');

		cartDao = new mongoDbDaoCarts();
		productsDao = new mongoDbDaoProducts();
		break;

	default:
		throw new Error("No se ha definido una conexión a la base de datos");
		break;
}

module.exports =  { productsDao, cartDao };