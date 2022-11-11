const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const app = require('../app').app

// Ejemplo 2º

describe('Suite de pruebas teams', () => {
  it('should return the team of given user', (done) => {
    // Llamamos a la funcion para llamar a este endpoint
    chai.request(app)
      // REspuesta del login que esperamos
      .post("/auth/login")
      .set('content-type', 'application/json')
      // Enviamos dato: Enchufamos la rrespuesta al usuario
      .send({ user: "bettatech", password: "1234" })
      .end((err, res) => {
        let token = res.body.token;
        chai.assert.equal(res.statusCode, 200);
        chai.request(app)
          .put("/teams")
          .send({
            team: [{ name: 'Charizard' }, { name: 'Blastoise' }]
          })
          .set("Authorization", `JWT ${token}`)
          .end((err, res) => {
            chai.request(app)
              .get('/teams')
              .set("Authorization", `JWT ${token}`)
              .end((err, res) => {

                // Tiene equipo con Charizard y Blastoise
                // {trainer: 'bettatech', tean: [Pokemon]}
                chai.assert.equal(res.statusCode, 200);
                chai.assert.equal(res.body.trainer, 'bettatech')
                chai.assert.equal(res.body.team.length, 2)
                chai.assert.equal(res.body.team[0].name, 'Charizard')
                chai.assert.equal(res.body.team[1].name, 'Blastoise')
                done();
              })
          });
        // CUando recibimos respuesta realizamos el get
      });
  })

  it('should return the pokedex number', (done) => {
    let pokemonName = 'Bulbasaur';
    // Llamamos a la funcion para llamar a este endpoint
    chai.request(app)
      // REspuesta del login que esperamos
      .post("/auth/login")
      .set('content-type', 'application/json')
      // Enviamos dato: Enchufamos la rrespuesta al usuario
      .send({ user: "mastermind", password: "4321" })
      .end((err, res) => {
        let token = res.body.token;
        chai.assert.equal(res.statusCode, 200);
        chai.request(app)
          .post("/teams/pokemons")
          .send({ name: pokemonName })
          .set("Authorization", `JWT ${token}`)
          .end((err, res) => {
            chai.request(app)
              .get('/teams')
              .set("Authorization", `JWT ${token}`)
              .end((err, res) => {

                // Tiene equipo con Charizard y Blastoise
                // {trainer: 'bettatech', tean: [Pokemon]}
                chai.assert.equal(res.statusCode, 200);
                chai.assert.equal(res.body.trainer, 'mastermind')
                chai.assert.equal(res.body.team.length, 1)
                chai.assert.equal(res.body.team[0].name, pokemonName)
                chai.assert.equal(res.body.team[0].pokedexNumber, 1)
                done();
              })
          });
        // CUando recibimos respuesta realizamos el get

      });
  })
})



// Ejemplo1º
// describe('Suite de pruebas teams', () => {
//   it('should return 401 when no jwt token available', (done) => {
//     // Cuando la llamada no tiene correctamente la llave
//     chai.request(app)
//       .get('/teams')
//       .end((err, res) => {
//         chai.assert.equal(res.statusCode, 401)
//       })
//   })
// })