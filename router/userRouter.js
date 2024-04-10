const express = require('express');
const router = express.Router();

//controlador
const controllers = require('../controllers/userControllers.js');

router.get('/',controllers.index);
router.get('/imagenes-comprimidas/:nombreImagen',controllers.servirImagenes);

module.exports = router;