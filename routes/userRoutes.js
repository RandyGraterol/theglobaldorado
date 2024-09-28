const clientAuthMiddleware = require('../middleware/verifyClient.js'); // Importar verifyToken
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const recaptcha = new Recaptcha('6Ldlt8kpAAAAAHlpQ9tKPkzoSAJfWhI-9blLs3Pd','6Ldlt8kpAAAAAMQY4fNwRhE50l9AAxECPoqTGC4E');
const upload = require('../utils/multer.js');

const { getUsers, createUser,index,loginGet,registerGet,main,construccion,loginPost,logout,restablecerGet,alertRegistro,eliminarMensajeRegistro,RestablecerRun,restablecerPost,RestablecerRunPost,peliculasClient,puntuaciones,contactanos,cursosClient,capacitacion,librosClient,streaming,hojaCalculo,afiliacion,publicarF,atenderClientes,getPictureIndex} = require('../controllers/userControllers.js');


const express = require('express');
const userRoutes = express.Router();

//rutas GET
userRoutes.get('/',index);
userRoutes.get('/getPictureIndex',getPictureIndex);
userRoutes.get('/login',loginGet);
userRoutes.get('/register',registerGet);
userRoutes.get('/main',clientAuthMiddleware,main);
userRoutes.get('/construccion',construccion);
userRoutes.get('/users',clientAuthMiddleware,getUsers);
userRoutes.get('/logout',logout);
userRoutes.get('/restablecer',clientAuthMiddleware,restablecerGet);
userRoutes.get('/alertRegistro',alertRegistro);
userRoutes.get('/eliminarMensajeRegistro',eliminarMensajeRegistro);
userRoutes.get('/RestablecerRun',RestablecerRun);
userRoutes.get('/peliculasClient',clientAuthMiddleware,peliculasClient);
userRoutes.get('/cursosClient',clientAuthMiddleware,cursosClient);
userRoutes.get('/capacitacion',clientAuthMiddleware,capacitacion);
userRoutes.get('/librosClient',clientAuthMiddleware,librosClient);
userRoutes.get('/streaming',clientAuthMiddleware,streaming);
userRoutes.get('/hojaCalculo',clientAuthMiddleware,hojaCalculo);
userRoutes.get('/afiliacion',clientAuthMiddleware,afiliacion);
userRoutes.get('/publicarF',clientAuthMiddleware,publicarF);
userRoutes.get('/atenderClientes',clientAuthMiddleware,atenderClientes);
//rutas POST
userRoutes.post('/users',createUser);
userRoutes.post('/login',loginPost);
userRoutes.post('/restablecerPost',restablecerPost);
userRoutes.post("/RestablecerRun",RestablecerRunPost);
userRoutes.post('/puntuaciones',puntuaciones);
userRoutes.post('/contactanos',contactanos);

module.exports = userRoutes;