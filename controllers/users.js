const uuid = require('uuid');
const crypto = require('../crypto.js');
const teams = require('./teams');

// Definimos base e datos usuarios,wardamos en un diccionario
const userDatabase = {}

//userid:passport

// Una funcion quenos permita añadir ususarios nuevos en bd
const registerUser = (userName, password) => {

  let hashedPwd = crypto.hashPasswordSync(password);
  // Guardamos en la base de datos nuestro ususario
  let userId = uuid.v4();
  userDatabase[userId] = {
    userName: userName,
    password: hashedPwd
  }
  // Un ususario que e acaba de registrar tenga un equipo vacio
  teams.bootstrapTeam(userId);
}

const getUser = (userId) => {
  return userDatabase[userId];
}

const getUserIdFromUserName = (userName) => {
  for (let user in userDatabase) {
    if (userDatabase[user].userName == userName) {
      let userData = userDatabase[user];
      userData.userId = user;
      return userData;
    }
  }

}

// Recibe  un userid y un password y quenos devuelva verdadero o falso
const checkUserCredentials = (userName, password, done) => {
  console.log('checking user credentials')
  // Comprobas que las credenciales son correctas
  let user = getUserIdFromUserName(userName);
  if (user) {
    console.log(user)
    crypto.comparePassword(password, user.password, done);
  } else {
    done('Missing user')
  }
}

exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;
exports.getUserIdFromUserName = getUserIdFromUserName;
exports.getUser = getUser;