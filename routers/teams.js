const express = require('express');
//Construimos un rooter Utilizando este constructor(Router()) y utilizando el objeto router 
const router = express.Router();
const passport = require('passport');
require('../auth')(passport);
const axios = require('axios');

const teamsController = require('../controllers/teams');
const { getUser } = require('../controllers/users');

router.route('/')
  .get(passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
      let user = getUser(req.user.userId);
      res.status(200).json({
        trainer: user.userName,
        team: teamsController.getTeamOfUser(req.user.userId)
      })
    })
  .put(passport.authenticate('jwt', { session: false }),
    (req, res) => {
      teamsController.setTeam(req.user.userId, req.body.team)
      res.status(200).send();
    })

router.route('/pokemons')
  .post(passport.authenticate('jwt', { session: false }),
    (req, res) => {
      let pokemonName = req.body.name;
      console.log('calling pokeapi')
      // Make a request for a user with a given ID
      axios.get(`https://pokeapi.co/api/v2/pokemon/Bulbasaur${pokemonName.toLowerCase()}`)
        .then(function (response) {
          // handle success
          // console.log(response.data.id);
          let pokemon = {
            name: pokemonName,
            pokedexNumber: response.data.id
          }
          teamsController.addPokemon(req.user.userId, pokemon);

          res.status(201).json(pokemon)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          res.status(400).json({ message: error })
        })
        .finally(function () {
          // always executed
        });
      res.status(200).send('Hello World!')
    })

router.route('/pokemons/:pokeid')
  .delete(() => {
    res.status(200).send('Hello World!')
  })

// app.post('/team/pokemons', () => {
//   res.status(200).send('Hello World!')
// })


// app.delete('/team/pokemons/:pokeid', () => {
//   res.status(200).send('Hello World!')
// })

exports.router = router