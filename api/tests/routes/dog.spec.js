/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  id: 1,
  height: "22",
  weight: "24",
  life_span: "22",
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    ).timeout(5000);
    it('deberia devolver todos los perros incluidos los agregados', () =>
      agent.get('/dogs')
        .then((res) => expect(res.body).to.have.length(173)),
      agent.post('/dog').send({
        name: 'Perro Ejemplo',
        height: "22",
        weight: "24",
        life_span: "22",
      }),
      agent.get('/dogs')
        .then((res) => expect(res.body).to.have.length(174))
    ).timeout(16000)
  });
  describe('GET /temperaments', () => {
    it('debe devolver estado 200', () => {
      agent.get('/temperaments').expect(200)
    }).timeout(3000)
    it('deberia devolver todos los temperamentos', () =>
      agent.get('/temperaments')
        .then((res) => expect(res.body).to.have.length(124))
    ).timeout(15000)
  })
});
