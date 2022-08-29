
// module.exports.middlewareUserLogueado = (req, res, next) => {
//     req.user = {
//         isAdmin: true,
//     };
//     next();
// };

// module.exports.middlewareIsAdmin = (req, res, next) => {
//  req.user.isAdmin
//         ? next()
//         : res.status(403).send({
//               error: -1,
//               descripcion: `ruta ${req.originalUrl} y metodo ${req.method} no autorizada`,
//           });
// };

module.exports.isAuth = (req, res, next) => {
    if (req.session.passport !== undefined) {
        next();
  } else {
    return res.redirect("/login");
  }
}