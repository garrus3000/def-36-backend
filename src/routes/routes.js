const Router = require('express').Router;

const routesHBS = Router();


const getRoot = (req, res) => {
    if (req.session.passport !== undefined)  res.redirect("/home");
    else res.redirect("/signup");
};

const getHome = (req, res) => {
    const user = req.session.passport;
    if (user !== undefined) return res.render("index", { title: "Productos y Mensajes", user: req.session.passport.user });
    else return res.redirect("/login");
};

const getSignup = (req, res) => {
    if (req.session.passport !== undefined) return res.redirect("/home");
    else return res.render("signup", { title: "Signup" });
};

const getFailSignup = (req, res) => {
    res.render("failsignup");
};

const getLogin = (req, res) => {
    if (req.session.passport !== undefined) return res.redirect("/home");
    return res.render("login", { title: "Login" });
};

const postLogin = (req, res) => {
    return res.redirect("/home");
};

const getFailLogin = (req, res) => {
    return res.render("faillogin");
};

const getUser = (req, res) => {
    if (req.session.passport !== undefined) return res.send(req.session.passport.user);
    else res.redirect("/logout");
}

const isItLogged = (req, res, next) => {
    if (req.session.passport !== undefined) return next();
    else res.redirect("/login");
};

const getLogout = (req, res) => {
    const user = req.session.passport.user;
    req.session.destroy((err) => {
        if(err) console.log(err);
        return res.render('logout', {user: user});
    });
};


module.exports = {
    routesHBS,
    getRoot,
    getSignup,
    getLogin,
    postLogin,
    getHome,
    getUser,
    getFailLogin,
    getFailSignup,
    getLogout,
    isItLogged,
};