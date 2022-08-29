require('dotenv').config();


const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
const User = require('../config/models/usuarios.js');

mongoose.connect(process.env.MONGO_ATLAS_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// const User = mongoose.model('usuarios', {
// 	email: { type: String, required: true,},
// 	password: { type: String, required: true,},
// 	nombre: { type: String, required: true,},
// });

passport.use('signup', new LocalStrategy( {	usernameField: "email",	passwordField: "password", passReqToCallback: true, }, async (req, email, password, done) => {
		const usuario = await User.findOne({ email: email });
		if (usuario) {
		  return done(null, false);
		}
		const newUser = new User();
		const { nombre, age, phone, adress } = req.body; //campos por formulario
		newUser.nombre = nombre;
		newUser.age = age;
		newUser.phone = phone;
		newUser.adress = adress;

		newUser.email = email;
		newUser.password = bcrypt.hashSync(password, 10);

		if(req.file === undefined) {
			newUser.thumbnail = '../../public/assets/img/anonimus.jpg'
		} else {
			newUser.thumbnail = req.file.path;
		}

		await newUser.save();
		return done(null, newUser);
	  }
	)
  );

// passport.use('signup', new LocalStrategy((username, password, callback) => {
//   const user = User.findOne({ username: username });
//   user.then(usr => {
//     if (usr) return callback(null, false);
//     if (!usr) {
//       const newUser = new User();
//       newUser.username = username,
//       newUser.password = bcrypt.hashSync(password, 10),
// 	  newUser.fullName = fullName,
//       newUser.save(() => {
// 		return callback(null, newUser);
// 	  })
//     }
//   });  
// }));

passport.use('login', new LocalStrategy((email, password, callback) => {
	const user = User.findOne({ email: email });
	user.then(usr => {
		if (!usr || !bcrypt.compareSync(password, usr.password)) return callback(null, false);
		return callback(null, usr);
	});
}));


passport.serializeUser((user, callback) => {
    return callback(null, user.email);
});

passport.deserializeUser((id, callback) => {
    User.findById(id, (err, user) => {
        return callback(null, user);
    });
});
	

module.exports = passport;