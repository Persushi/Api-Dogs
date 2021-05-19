const { Router } = require('express');
const { Dog } = require('../db')
const controller = require('../controller/index')
const dogController = new controller(Dog)
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const DogsRoute = require('./dogs')
const TemperamentsRoute = require('./temperament')
const router = Router();

router.use("/temperaments", TemperamentsRoute)
router.use("/dogs", DogsRoute);
router.post("/dog", dogController.add)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
