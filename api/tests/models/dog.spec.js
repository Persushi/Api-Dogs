const { Dog, Temperament, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
    });
  });
  describe('Validación temperamentos', () => {
    beforeEach(() => Temperament.sync({ force: true }));
    describe('temperamento', () => {
      beforeEach(() => Temperament.create({ name: 'Activo' }))
      it('deberia tirar un error si el temperamento ya existe', (done) => {
        Temperament.create({ name: 'Activo' })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      })
      it('deberia funcionar si es un temperamento nuevo', () => {
        Temperament.create({ name: 'Experto' })
      })
    })
  })
});
