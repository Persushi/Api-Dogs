const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { Temperament } = require('../db.js');

class FalseCrud {
    constructor(model) {
        this.model = model
    }
    get = (req, res) => {
        this.model.findAll()
            .then((list) => {
                if (!req.query.name) return res.send(list)
                const result = list.filter(obj => obj.name.toLowerCase()
                    .includes(req.query.name.toLowerCase()));
                return res.send(result)
            })
            .catch((error) => res.send(error))

    }

    update = (req, res, next) => { //metodo sin usar 
        this.model.update(req.body, {
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                res.sendStatus(200)
            })
            .catch((error) => {
                next(error)
            })
    }
    getApi = (req, res) => {
        const myResults = this.model.findAll({
            include: {
                model: Temperament,
                as: 'temperament',
            }
        });
        const apiResults = axios("https://api.thedogapi.com/v1/breeds");
        Promise.all([myResults, apiResults])
            .then((results) => {
                const [myR, apiR] = results;
                let response = myR.concat(apiR.data)
                return response
            })
            .then((results) => res.send(results))
            .catch((error) => res.send(error))

    }
    getById = (req, res, next) => {
        const myResults = this.model.findAll({
            include: {
                model: Temperament,
                as: 'temperament',
            }
        });
        const apiResults = axios("https://api.thedogapi.com/v1/breeds");
        Promise.all([myResults, apiResults])
            .then((results) => {
                const [myR, apiR] = results;
                const response = myR.concat(apiR.data)
                const result = response.find(obj => obj.id == req.params.id)
                if (result != null) return res.send(result)
                return res.sendStatus(404)
            })
            .catch((error) => res.send(error))
    }
    add = (req, res, next) => {
        let { name, weight, height, life_span, urlImage, temperaments } = req.body;
        life_span = life_span.concat(" years");
        return this.model.create({
            name,
            height,
            weight,
            life_span,
            urlImage,
            id: uuidv4(),
        })
            .then((result) => {
                temperaments.forEach(e => {
                    result.addTemperament(e)
                });
                res.send(result)
            })
            .catch((error) => {
                next(error)
            })
    }
}

module.exports = FalseCrud;