const Router = require("express").Router;
const routerUser = Router();

const { userDao } = require("../daos");
const { isAuth } = require("../middlewares/permisos");



routerUser.get('/user', isAuth, async (req, res) =>{
    const {user} = req.session.passport;
    res.send(await userDao.getAll())
});

module.exports = routerUser;