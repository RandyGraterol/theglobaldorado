"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const express_recaptcha_1 = require("express-recaptcha");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken")); // Importar verifyToken
const recaptcha = new express_recaptcha_1.RecaptchaV2('6LdleIUpAAAAAGCrryEdTCYoGMbUCR9Yvr6zFlj7', '6LdleIUpAAAAAPy_z7tY5C3stg1izDZNCNU6y0ta');
const userControllers_js_1 = require("../controllers/userControllers.js");
exports.userRoutes = (0, express_1.Router)();
//rutas GET
exports.userRoutes.get('/', userControllers_js_1.index);
exports.userRoutes.get('/login', userControllers_js_1.loginGet);
exports.userRoutes.get('/register', userControllers_js_1.registerGet);
exports.userRoutes.get('/main', verifyToken_1.default, userControllers_js_1.main);
exports.userRoutes.get('/construccion', userControllers_js_1.construccion);
exports.userRoutes.get('/users', userControllers_js_1.getUsers);
exports.userRoutes.get('/logout', userControllers_js_1.logout);
exports.userRoutes.get('/restablecer', userControllers_js_1.restablecerGet);
//rutas POST
exports.userRoutes.post('/users', recaptcha.middleware.verify, userControllers_js_1.createUser);
exports.userRoutes.post('/login', userControllers_js_1.loginPost);
