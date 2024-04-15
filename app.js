//importacion de modulos necesarios
require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const port = 3000;
//carga diferidanfvhc 

const app = express();
// Configurar la caché para recursos estáticos
const staticOptions = {
  maxAge: 30 * 24 * 60 * 60, // Tiempo de caché en segundos (30 días en este ejemplo)
};
//configuracion de archivos static
app.use(express.static(__dirname+'/public'));

//Instancia del server
const server = http.createServer(app);


//configuracion de motor de plantillas
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));

//configuracion de recuperacion de datos y envio
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//configuracion de cors
app.use(cors());

//routers
const userRouter = require('./router/userRouter.js');
					
app.use('/',userRouter);

server.listen(port,()=> {

console.log(`Servidor corriendo en el puerto ${port}`);

})