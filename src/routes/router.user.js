const Router = require("express").Router;
const routerUser = Router();

const { userDao } = require("../daos");
const { isAuth } = require("../middlewares/permisos");



routerUser.get('/user', isAuth, async (req, res) =>{
    const {user} = req.session.passport;
    const data = await userDao.getByEmail(user);
    const userData = await userDao.getById(data[0]._id)
    /// avatar y anon
    const userAvatar = userData.thumbnail.split('public')[1];
    res.render('user', {title: "Perfil", userData: userData, userAvatar: userAvatar})
});

module.exports = routerUser;