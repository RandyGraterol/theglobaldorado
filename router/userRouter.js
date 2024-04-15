const express = require('express');
const router = express.Router();
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const recaptcha = new Recaptcha('6LdleIUpAAAAAGCrryEdTCYoGMbUCR9Yvr6zFlj7','6LdleIUpAAAAAPy_z7tY5C3stg1izDZNCNU6y0ta');

//controlador
const controllers = require('../controllers/userControllers.js');

router.get('/',controllers.index);
router.get('/login',controllers.loginGet);
router.get('/register',controllers.registerGet);
router.get('/main',controllers.main);

module.exports = router;