const { Router } = require('express');
const { Dog } = require('../db')
const Controller = require('../controller/index')
const router = Router();


const dogController = new Controller(Dog)

router.get("/:id", dogController.getById)
router.get("/", dogController.getApi)



module.exports = router;