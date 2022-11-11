const express = require('express');
const bodyParser = require('body-parser');

// const jwt = require('jsonwebtoken');

// Routes
const authRoutes = require('./routers/auth').router;
const teamsRoutes = require('./routers/teams').router;

// require(',/auth')(passport);



const app = express();
// Añadimos un middledvwers
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
  //req: es la request, la peticion
  // res: es la respuesata
  // console.log(req);
  res.status(200).send('Hello World!')
});
// Nos permite facilmente crear modulosde nuestra aplicacion
app.use('/auth', authRoutes);
app.use('/teams', teamsRoutes);

// app.post('/team/pokemons', () => {
//   res.status(200).send('Hello World!')
// });

// app.get('/team', passport.authenticate('jwt', { session: false }), (req, res, next) => {
//   res.status(200).send('Hello World!')
// })

// app.delete('/team/pokemons/:pokeid', (req, res) => {
//   res.status(200).send('Hello World!')
// });

// app.put('/team', (req, res) => {
//   res.status(200).send('Hello World!')
// });



app.listen(port, () => {
  console.log('Server at port 3000');
})

exports.app = app;