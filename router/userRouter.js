const express = require('express');
const router = express.Router();

//controlador
const controllers = require('../controllers/userControllers.js');

router.get('/',controllers.index)

module.exports = router;