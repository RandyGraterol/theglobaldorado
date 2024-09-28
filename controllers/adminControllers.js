const categorias = require('../models/categorias');
const peliculass = require('../models/peliculas');
const user = require('../models/User.js');
const cursoss = require('../models/cursos.js');
const libros = require('../models/libros.js');
const userBlockchein = require('../models/userBlockchein.js');
const puntuacionesCheing = require('../models/puntuacionesCheing.js');
//categorias.hasOne(peliculass);
//peliculass.belongsTo(categorias);
//const Peliculas= require('../models/peliculas');
const nodemailer= require('nodemailer');
const jwt = require('jsonwebtoken');
/////////////////////////////////////////////////////////
const transporter = nodemailer.createTransport({
  service:'Gmail',
  auth:{
    user:'globaldorado78@gmail.com',
    pass:'fauthesukyadpjmv'
  }
});
/////////////////////////////////////////////////////////
const loginAdminPost = async(req,res)=>{
try{
const admin = "jcespinoza2011@gmail.com";
const security = '1066515';
const {usuario,password} = req.body;
if(usuario === admin && password === security){
req.session.isAdmin = true; // Establecer propiedad en la sesión
res.json({interruptor:true});
}else{
res.json({interruptor:false});
}
}catch(error){
console.error(error.message);
res.status(500).send('Error en el Servidor');
}
}
/////////////////////////////////////////////////////////
const peliculasGet = async (req,res)=>{
  try{
   const peliculas = await peliculass.findAll();
   const registroInvertido = peliculas.reverse();
   res.render('./admin/tabla',{peliculas:registroInvertido,endPoinst:'/addPeliculaGet',tabla:'Peliculas',eliminar:'/delete',mensaje:'Pelicula',update:'/update/'}); 
 }catch(error){
  console.error(error);
  res.status(500).send('Error en el Servidor');
}
}
//////////////////////////////////////////////
const cursosGet = async (req,res)=>{
  try{
     const peliculas = await cursoss.findAll();
     const registroInvertido = peliculas.reverse();
    res.render('./admin/tabla',{peliculas:registroInvertido,endPoinst:'/addCursosGet',tabla:'Cursos',eliminar:'/deleteCurso',mensaje:'Curso',update:'/updateCursos/'});
  }catch(error){
   console.error(error);
   res.status(500).send('Error en el Servidor'); 
 }
}
//////////////////////////////////////////////
const librosGet = async (req,res)=>{
  try{
  const peliculas = await libros.findAll();
  const registroInvertido = peliculas.reverse();
    res.render('./admin/tabla',{peliculas:registroInvertido,endPoinst:'/addLibros',tabla:'Libros',eliminar:'/deleteLibros',mensaje:'Libro',update:'/updateLibros/'});
  }catch(error){
   console.error(error);
   res.status(500).send('Error en el Servidor'); 
 }
}
//////////////////////////////////////////////
const usuariosGet = async (req,res)=>{
  try{
    const peliculas = await user.findAll();
     const registroInvertido = peliculas.reverse();
    res.render('./admin/tabla',{peliculas:registroInvertido,endPoinst:'/addUsuario',tabla:'Usuarios',eliminar:'/deleteUsuario',mensaje:'Usuario',update:'/updateUsuario/'});
  }catch(error){
   console.error(error);
   res.status(500).send('Error en el Servidor'); 
 }
}
//////////////////////////////////////////////
const addLibros = async (req,res)=>{
  try{
    res.render('./admin/add',{endPoinst:'/addLibros',titulo:'Agregar Libro',volver:'libros'});
  }catch(error){
   console.error(error);
   res.status(500).send('Error en el servidor');
 }
}
//////////////////////////////////////////////
const addUsuario = async (req,res)=>{
try{
    res.render('./admin/add',{endPoinst:'/addUsuario',titulo:'Agregar Usuario',volver:'usuarios'});
}catch(error){
  console.error(error);
  res.status(500).send('Error en el servidor'); 
}
}
//////////////////////////////////////////////
const updateUsuario = async(req,res)=>{
try{
  const id = req.params.id;
  const peli = await user.findOne({where:{id}});
 res.render('./admin/update',{peli,titulo:'Actualizar Usuario',endPoinst:'/updateUsuario/',volver:'/usuarios'});
}catch(error){
console.error(error);
res.status(500).send('Error en el servidor');
}
}
//////////////////////////////////////////////
const updateUsuarioPost = async(req,res)=>{
try{
const id = req.params.id;
const {nombre,telefono,correo,password,aprobado} = req.body;
const token = "token-security";
await user.update({nombre,telefono,correo,contrasena:password,aprobado,token},{where:{id}});
const mensaje = {
  from:'globaldorado78@gmail.com',
  to:correo,
  subject:'¡Notificación Importante!',
  text:'¡Te damos la Bienvenida!'
  }
  transporter.sendMail(mensaje,(error,info)=>{
   if(error){
   console.log(error.message);
   }else{
    console.log(`Mensaje de aprobacion enviado ${info.response}`);
   }
  })
res.redirect('/usuarios');
}catch(error){
console.error(error);
res.status(500).send('Error en el servidor');
}
}
//////////////////////////////////////////////
const addLibrosPost = async (req,res)=>{
  try{
     if(req.file){
  const file = `/uploads/${req.file.filename}`;
  const portada = `//${req.get('host')}${file}`;
  const {nombre,descripcion,UrlFile,categoria}=req.body;
  const newPelicula = await libros.create({portada,nombre,descripcion,UrlFile,categoria});
  res.cookie('addLibro',true, { httpOnly: true, secure: true });
  res.redirect('/libros');
}
}catch(error){
  console.error(error);
  res.status(500).send('Error en el servidor');
}
}
//////////////////////////////////////////////
const updateLibrosGet = async(req,res)=>{
  const categorias = ['Romance','Terror','Comedia','Suspenso','Drama','Aventura','Acción','Otro'];
  try{
    const {id} = req.params;
    const peli = await libros.findOne({where:{id}});
    for(let x = 0 ; x < categorias.length; x++){
      if(categorias[x] == peli.categoria){
        categorias.splice(x,1);
        break
      }
    }
    res.render('./admin/update',{peli,categorias,titulo:'Actualizar Libro',endPoinst:'/updateLibros/',volver:'/libros'});
  }catch(error){
    console.error(error.message);
    res.status(500).send('Error en el servidor')
  }

}
//////////////////////////////////////////////
const addCursoGet = async (req,res)=>{
  try{
    res.render('./admin/add',{endPoinst:'/addCursos',titulo:'Agregar Curso',volver:'cursos'});
  }catch(error){
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
}
//////////////////////////////////////////////
const addPeliculaGet = async(req,res)=>{
  try{
res.render('./admin/add',{endPoinst:'/addPeliculas',titulo:'Agregar Pelicula',volver:'peliculas'});
  }catch(error){
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
}
/////////////////////////////////////////////
const addPeliculasPost = async (req,res)=>{
  try{
   if(req.file){
  const file = `/uploads/${req.file.filename}`;
  const portada = `//${req.get('host')}${file}`;
  const {nombre,descripcion,UrlFile,categoria}=req.body;
  const newPelicula = await peliculass.create({portada,nombre,descripcion,UrlFile,categoria});
  res.cookie('addPeli',true, { httpOnly: true, secure: true });
  res.redirect('/peliculas');
} else {
 res.redirect('/addPeliculas');
}
}catch(error){
  console.error(error);
  res.status(500).send('Error en el servidor');
}

}
/////////////////////////////////////////////////////////
const addUsuarioPost = async (req,res)=>{
  try{
  const {nombre,telefono,correo,password}=req.body;
  const token = "token-security";
  const aprobado = 'true';
  await user.create({nombre,telefono,correo,contrasena:password,aprobado,token});
  res.cookie('addUser',true, {httpOnly:true,secure:true});
  res.redirect('/usuarios');
}catch(error){
  console.error(error);
  res.status(500).send('Error en el servidor');
}
}
/////////////////////////////////////////////////////////
const addCursosPost = async (req,res)=>{
  try{
    if(req.file){
  const file = `/uploads/${req.file.filename}`;
  const portada = `//${req.get('host')}${file}`;
  const {nombre,descripcion,UrlFile,categoria}=req.body;
  const newPelicula = await cursoss.create({portada,nombre,descripcion,UrlFile,categoria});
  res.cookie('addCurso',true, { httpOnly: true, secure: true });
  res.redirect('/cursos');
}else{
 res.redirect('/addPeliculas');
} 
}catch(error){
console.error(error);
res.status(500).send('Error en el servidor');
}
}
/////////////////////////////////////////////////////////
const update = async(req,res)=>{
  const categorias = ['Romance','Terror','Comedia','Suspenso','Drama','Aventura','Acción','Otro'];
  try{
   const {id} = req.params;
    const peli = await peliculass.findOne({where:{id}});
    for(let x = 0 ; x < categorias.length; x++){
      if(categorias[x] == peli.categoria){
        categorias.splice(x,1);
        break
      }
    }
    res.render('./admin/update',{peli,categorias,titulo:'Actualizar Pelicula',endPoinst:'/update/',volver:'/peliculas'});
  }catch(error){
    console.error(error.message);
    res.status(500).send('Error en el servidor')
  }

}
////////////////////////////////////////////////////////
const updateCursos = async(req,res)=>{
  const categorias = ['Desarrollo Personal','Romance','Terror','Comedia','Suspenso','Drama','Aventura','Acción','Otro'];
  try{
    const {id} = req.params;
    const peli = await cursoss.findOne({where:{id}});
    for(let x = 0 ; x < categorias.length; x++){
      if(categorias[x] == peli.categoria){
        categorias.splice(x,1);
        break
      }
    }
    res.render('./admin/update',{peli,categorias,titulo:'Actualizar Curso',endPoinst:'/updateCursos/',volver:'/cursos'});
  }catch(error){
    console.error(error.message);
    res.status(500).send('Error en el servidor')
  }

}
////////////////////////////////////////////////////////
const updateMoviesPost = async (req,res)=>{
  try{
    const id = req.params.id;
    const {nombre,descripcion,UrlFile,categoria} = req.body;
      const datos = {nombre,descripcion,UrlFile,categoria};
    if(req.file){
      const file = `/uploads/${req.file.filename}`;
      const portada = `//${req.get('host')}${file}`;
      datos.portada=portada;
    }
    await peliculass.update(datos,{where:{id}});
    return res.redirect('/peliculas');
  }catch(error){
   console.log(error.message);
   res.status(500).send('Error en el servidor');
 }
}
////////////////////////////////////////////////////////
const updateCursosPost = async (req,res)=>{
  try{
   if(req.file){
    const file = `/uploads/${req.file.filename}`;
    const portada = `//${req.get('host')}${file}`;
    const id = req.params.id;
    const {nombre,descripcion,UrlFile,categoria} = req.body;
    const datos = {
      portada,nombre,descripcion,UrlFile,categoria
    };
    await cursoss.update(datos,{where:{id}});
    res.redirect('/cursos');
  }
}catch(error){
 console.log(error.message);
 res.status(500).send('Error en el servidor');
}
}
////////////////////////////////////////////////////////

const updateLibrosPost = async (req,res)=>{
  try{
   if(req.file){
    const file = `/uploads/${req.file.filename}`;
    const portada = `//${req.get('host')}${file}`;
    const id = req.params.id;
    const {nombre,descripcion,UrlFile,categoria} = req.body;
    const datos = {
      portada,nombre,descripcion,UrlFile,categoria
    };
    await libros.update(datos,{where:{id}});
    res.redirect('/libros');
  }
}catch(error){
 console.log(error.message);
 res.status(500).send('Error en el servidor');
}
}
////////////////////////////////////////////////////////
const deleteMovie = async (req,res)=>{
 const id = req.body.id;
 await peliculass.destroy({where:{id}});
 console.log('¡Pelicula Eliminada!');
 res.json({message:true});
}
////////////////////////////////////////////////////////
const deleteCurso = async (req,res)=>{
 const id = req.body.id;
 await cursoss.destroy({where:{id}});
 console.log('¡Curso Eliminado!');
 res.json({message:true});
}
////////////////////////////////////////////////////////
const deleteLibro = async (req,res)=>{
 const id = req.body.id;
 await libros.destroy({where:{id}});
 console.log('¡Libro Eliminado!');
 res.json({message:true});
}
///////////////////////////////////////////////////////
const deleteUsuario = async(req,res)=>{
const id = req.body.id;
await user.destroy({where:{id}});
console.log('¡Usuario Eliminado!');
res.json({message:true});
}
///////////////////////////////////////////////////////
const loginAdmin = async(req,res)=>{
try{
 res.render('./admin/login');
}catch(error){
console.error(error.message);
res.status(500).send('Error en el Servidor');
}
}
///////////////////////////////////////////////////////
const cerrarAdmin=(req,res)=>{
 req.session.destroy((err) => {
    if (err) {
      console.log('Error al cerrar sesión:', err);
    } else {
      res.redirect('/admin');
    }
  });
}
//////////////////////////////////////////////////////
const error = (req,res)=>{
res.render('./admin/error');
}
///////////////////////////////////////////////////////
const registerPost = async(req,res)=>{
  try{
   const { nombre,apellido,fecha,edad,cedula,correo,password} = req.body; 
   const u = await userBlockchein.findOne({where:{correo}});
   if(u){
    res.json({interruptor:'O'})
   }else{
   await userBlockchein.create({nombre,apellido,fecha,edad,cedula,correo,password});
   res.json({interruptor:true});
   }
  }catch(error){
  console.error(error.message);
   res.json({interruptor:false});
  }

}
///////////////////////////////////////////////////////
const loginPostt = async(req,res)=>{
try{
const {email,password} = req.body;
const u = await userBlockchein.findOne({where:{correo:email,password}});
if(u){
 res.json({interruptor:true,usuario:u.correo}); 
}else{
 res.json({interruptor:false}); 
}
}catch(error){
console.error(error.message);
res.status(500).send('Error en el Servidor');
}
}
///////////////////////////////////////////////////////
const puntuacionCheing = async(req,res)=>{
try{
const {puntuacion,usuario} = req.body;
const p = await puntuacionesCheing.findOne({where:{email:usuario}}); 
if(p){
res.json({interruptor:'B'});
}else{
 await puntuacionesCheing.create({email:usuario,puntuacion});
 res.json({interruptor:'A',r:puntuacion});
}
}catch(error){
console.error(error.message);
res.json({interruptor:false})
}
}
///////////////////////////////////////////////////////
module.exports={
 peliculasGet,addPeliculaGet,addPeliculasPost,update,updateMoviesPost,
 deleteMovie,cursosGet,addCursoGet,addCursosPost,updateCursos,updateCursosPost,
 deleteCurso,librosGet,addLibros,addLibrosPost,updateLibrosGet,updateLibrosPost,
 deleteLibro,usuariosGet,addUsuario,addUsuarioPost,loginAdmin,loginAdminPost,
 cerrarAdmin,error,updateUsuario,updateUsuarioPost,deleteUsuario,registerPost,loginPostt,puntuacionCheing
}