const express = require('express');
//Construimos un rooter Utilizando este constructor(Router()) y utilizando el objeto router 
const router = express.Router();
const jwt = require('jsonwebtoken');
// Controllers
const usersController = require('../controllers/users');
usersController.registerUser('bettatech', '1234');
// usersController.registerUser('mastermind', '4321');

// Definimos una ruta raiz que nos define un .get
// Tenemos el endpoin comun que define todas las operaciones
router.route('/')
  // La funcion quese ha de ejecutar dependiendo de cada operacion
  .get((req, res) => {
    res.send('GET Auth router');
  })
  .post((req, res) => {
    res.send('POST Auth router');
  })

// Creamos ruta de login
router.route('/login')
  .post((req, res) => {
    if (!req.body) {
      return res.status(400).json({ message: 'Missing data' });
    } else if (!req.body.user || !req.body.password) {
      return res.status(400).json({ message: 'Missing data' });
    }
    // Comprobamos credenciales
    usersController.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
      // Si no son validas, error
      if (err || !result) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Si son validas, generamos un JWT y lo devolvemos
      let user = usersController.getUserIdFromUserName(req.body.user);
      const token = jwt.sign({ userId: user.userId }, 'secretPassword');
      res.status(200).json(
        { token: token }
      )
    })
  });

exports.router = router;