//importacion de modulos necesarios
require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const port = 5000;

const app = express();

//Instancia del server
const server = http.createServer(app);

//configuracion de archivos static
app.use(express.static(__dirname+'/static'));

//configuracion de motor de plantillas
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));

//configuracion de recuperacion de datos y envio
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//configuracion de cors
app.use(cors());

//routers
const userRouter = require('./router/userRouter.js')

//rutas
app.get('/',userRouter);


server.listen(port,()=>{
	console.log(`Servidor corriendo en el puerto ${port}`);
})