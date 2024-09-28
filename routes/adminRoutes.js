
const {peliculasGet,addPeliculaGet,addCursoGet,addCursosPost,addPeliculasPost,update,updateMoviesPost,deleteMovie,updatePost,cursosGet,updateCursosPost,deleteCurso,updateCursos,librosGet,addLibros,addLibrosPost,updateLibrosGet,updateLibrosPost,deleteLibro,usuariosGet,addUsuario,addUsuarioPost,loginAdmin,loginAdminPost,cerrarAdmin,error,updateUsuario,updateUsuarioPost,deleteUsuario,registerPost,loginPostt,puntuacionCheing} = require('../controllers/adminControllers.js');

const adminAuthMiddleware = require('../middleware/verifyAdmin.js');
const path = require('path');
const express = require('express');
const adminRoutes = express.Router();
//Utils
const upload = require('../utils/multer.js');
//Randis Graterol
//rutas GET
adminRoutes.get('/peliculas',adminAuthMiddleware,peliculasGet);
adminRoutes.get('/cursos',adminAuthMiddleware,cursosGet);
adminRoutes.get('/libros',adminAuthMiddleware,librosGet);
adminRoutes.get('/usuarios',adminAuthMiddleware,usuariosGet);

//Agregar datos al servidor 
adminRoutes.get('/addPeliculaGet',adminAuthMiddleware,addPeliculaGet);
adminRoutes.get('/addCursosGet',adminAuthMiddleware,addCursoGet);
adminRoutes.get('/addLibros',adminAuthMiddleware,addLibros);
adminRoutes.get('/addUsuario',adminAuthMiddleware,addUsuario);

adminRoutes.get('/update/:id',adminAuthMiddleware,update);
adminRoutes.get('/updateLibros/:id',adminAuthMiddleware,updateLibrosGet);
adminRoutes.get('/updateCursos/:id',adminAuthMiddleware,updateCursos);
adminRoutes.get('/updateUsuario/:id',adminAuthMiddleware,updateUsuario);

adminRoutes.get('/admin',loginAdmin);
adminRoutes.get('/cerrarAdmin',cerrarAdmin);
adminRoutes.get('/error',error);
//rutas Post

adminRoutes.post('/addPeliculas',adminAuthMiddleware,upload.single('img'),addPeliculasPost);
adminRoutes.post('/addCursos',adminAuthMiddleware,upload.single('img'),addCursosPost);
adminRoutes.post('/addLibros',adminAuthMiddleware,upload.single('img'),addLibrosPost);
adminRoutes.post('/addUsuario',addUsuarioPost);

adminRoutes.post('/updateLibros/:id',adminAuthMiddleware,upload.single('img'),updateLibrosPost);
adminRoutes.post('/update/:id',adminAuthMiddleware,upload.single('img'),updateMoviesPost);
adminRoutes.post('/updateCursos/:id',adminAuthMiddleware,upload.single('img'),updateCursosPost);
adminRoutes.post('/updateUsuario/:id',updateUsuarioPost);

adminRoutes.post('/delete',deleteMovie);
adminRoutes.post('/deleteCurso',deleteCurso);
adminRoutes.post('/deleteLibros',deleteLibro);
adminRoutes.post('/deleteUsuario',deleteUsuario);

adminRoutes.post('/loginAdminPost',loginAdminPost);

//blokcchain
adminRoutes.post('/registerPost',registerPost);
adminRoutes.post('/loginPostt',loginPostt);
adminRoutes.post('/puntuacionCheing',puntuacionCheing);

module.exports=adminRoutes;