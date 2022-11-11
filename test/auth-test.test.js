const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const app = require("../app").app;



describe("Suite de pruebas auth", () => {
  // Cuando la llamada no tiene correctamente la llave
  it("should return 401 when no jwt token available", (done) => {
    // Cuando la llamada no tiene correctamente la llave
    // Llamamos a la funcion para llamar a este endpoint
    chai.request(app)
      .get("/teams")
      .end((err, res) => {
        chai.assert.equal(res.statusCode, 401);
        done();
      });

    // Obtenemos el resultado esperado
  });

  // Cuando la llamada no tiene correctamente la llave
  it("should return 400 when no data is provided", (done) => {
    // Cuando la llamada no tiene correctamente la llave
    // Llamamos a la funcion para llamar a este endpoint
    chai.request(app)
      .post("/auth/login")
      .end((err, res) => {
        chai.assert.equal(res.statusCode, 400);
        done();
      });

    // Obtenemos el resultado esperado
  });
  // Cuando la llamada no tiene correctamente la llave
  it("should return 200 and token for succseful login", (done) => {
    // Cuando la llamada no tiene correctamente la llave
    // Llamamos a la funcion para llamar a este endpoint
    chai.request(app)
      .post("/auth/login")
      .set('content-type', 'application/json')
      .send({ user: 'bettatech', password: '1234' })
      .end((err, res) => {
        chai.assert.equal(res.statusCode, 200);
        done();
      });

    // Obtenemos el resultado esperado
  });




  // Cuando la llamada no tiene correctamente la llave
  it("should return 200 when jwt is valid", (done) => {
    // Cuando la llamada  tiene correctamente la llave
    // Llamamos a la funcion para llamar a este endpoint
    chai.request(app)
      // REspuesta del login que esperamos
      .post("/auth/login")
      .set('content-type', 'application/json')
      .send({ user: "bettatech", password: "1234" })
      .end((err, res) => {
        chai.assert.equal(res.statusCode, 200);
        // CUando recibimos respuesta realizamos el get
        chai.request(app)
          .get("/teams")
          .set("Authorization", `JWT ${res.body.token}`)
          .end((err, res) => {
            chai.assert.equal(res.statusCode, 200);
            done();
          });
      });


  });
});


