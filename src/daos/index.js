const dotenv = require('dotenv').config();


// let productsDao
// let cartDao


switch (process.env.MOTOR) {
	case 'mongodb':
		const MongoDbDaoCarts = require('./carts/MongoDbDaoCarts')
		const  MongoDbDaoProducts = require('./products/MongoDbDaoProducts')
		const MongoDbDaoUser = require('./user/MongoDbDaoUser');

		module.exports.cartDao = new MongoDbDaoCarts();
		module.exports.productsDao = new MongoDbDaoProducts();
		module.exports.userDao = new MongoDbDaoUser();
		break;

	default:
		throw new Error("No se ha definido una conexión a la base de datos");
		break;
}

// module.exports = { productsDao, cartDao };