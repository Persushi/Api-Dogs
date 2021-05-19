const { Router } = require('express');
const router = Router();
const { Temperament } = require('../db')
const Controller = require('../controller/index')

const temperamentController = new Controller(Temperament)

router.get("/", temperamentController.get)

module.exports = router;