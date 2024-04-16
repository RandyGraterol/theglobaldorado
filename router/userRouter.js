const express = require('express');
const router = express.Router();
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const recaptcha = new Recaptcha('6LczhrwpAAAAANAG886OKBEScaVpZih-IMggUr3F','6LczhrwpAAAAACwzgZcg1ci2aqnPR9EX6R7YAhUf');

//controlador
const controllers = require('../controllers/userControllers.js');

router.get('/',controllers.index);
router.get('/login',controllers.loginGet);
router.get('/register',controllers.registerGet);
router.get('/main',controllers.main);

module.exports = router;
