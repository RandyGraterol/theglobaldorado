"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restablecerGet = exports.logout = exports.construccion = exports.main = exports.registerGet = exports.loginPost = exports.loginGet = exports.index = exports.createUser = exports.getUsers = void 0;
const User_1 = require("../models/User");
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//Mnesaje de Bienvenida
const transporter = nodemailer_1.default.createTransport({
    service: 'Gmail',
    auth: {
        user: 'elrandygraterol@gmail.com',
        pass: 'akmxldojnvbayzmz'
    }
});
//////////////////////////////////////////////////////
const getUsers = async (req, res) => {
    try {
        const users = await User_1.User.findAll();
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
};
exports.getUsers = getUsers;
//////////////////////////////////////////////////////
const createUser = async (req, res) => {
    try {
        if (!req.recaptcha.error) {
            // El reCAPTCHA se ha verificado correctamente
            const { nombre, telefono, correo, contrasena } = req.body;
            const newUser = await User_1.User.create({ nombre, telefono, correo, contrasena });
            const mensaje = {
                from: 'elrandygraterol@gmail.com',
                to: correo,
                subject: '!Bienvenido a nuestra página web¡',
                text: `Hola ${nombre} , !Te damos la Bienvenida a GlobalDorado , la plataforma que te facilita el acceso a los recursos de tus preferencias , entre muchas variedades que ofrecerte podras encontrar peliculas ,series , cursos , libros , cuentas streaming etc ..¡`
            };
            transporter.sendMail(mensaje, (error, info) => {
                if (error) {
                    console.log(error.message);
                }
                else {
                    console.log(`Mensaje de Bienvenida enviado Exitosamente ${info.response}`);
                }
            });
            res.redirect('/login');
        }
        else {
            // El reCAPTCHA no se ha verificado correctamente
            res.send('Error en el reCAPTCHA');
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
};
exports.createUser = createUser;
/////////////////////////////////////////////////////
const index = async (req, res) => {
    try {
        res.render('index');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
};
exports.index = index;
//////////////////////////////////////////////////
const loginGet = async (req, res) => {
    try {
        res.render('login');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
};
exports.loginGet = loginGet;
/////////////////////////////////////////////////
const loginPost = async (req, res) => {
    const useR = {
        id: 0,
        nombre: "",
        telefono: "",
        correo: "",
        contrasena: ""
    };
    try {
        const secretKey = 'randy';
        const { correo, contrasena } = req.body;
        const usuario = await User_1.User.findOne({ where: { correo, contrasena } });
        if (usuario) {
            if (usuario.correo === correo && usuario.contrasena === contrasena) {
                useR.id = usuario.id;
                useR.nombre = usuario.nombre;
                useR.telefono = usuario.telefono;
                useR.correo = usuario.correo;
                useR.contrasena = usuario.contrasena;
                const token = jsonwebtoken_1.default.sign(useR, secretKey, { expiresIn: '1h' });
                res.cookie('token', token, { httpOnly: true, secure: true });
                res.redirect('/main');
            }
        }
        else {
            res.json({ Error: 'Contraseña O Usuario Incorrecto , vuelve a intentarlo' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
};
exports.loginPost = loginPost;
/////////////////////////////////////////////////
const registerGet = async (req, res) => {
    try {
        res.render('register');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
};
exports.registerGet = registerGet;
////////////////////////////////////////////////
const main = async (req, res) => {
    try {
        const nombreUser = req.user.nombre;
        res.render('main', { name: nombreUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
};
exports.main = main;
////////////////////////////////////////////////
const construccion = async (req, res) => {
    try {
        res.render('run');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
};
exports.construccion = construccion;
////////////////////////////////////////////////
const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.redirect('/');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
};
exports.logout = logout;
///////////////////////////////////////////////
const restablecerGet = async (req, res) => {
    try {
        res.render('restablecer');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
};
exports.restablecerGet = restablecerGet;
