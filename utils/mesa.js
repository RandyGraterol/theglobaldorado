const fs = require('fs');
const path = require('path');


const rutaDirectorio = '/ruta/directorio';
const archivos = ['archivo1.txt', 'archivo2.jpg', 'archivo3.png'];
const rutaArchivos = archivos.map((archivo) => path.join(rutaDirectorio, archivo));



const obtenerInformacionArchivos = (rutaArchivos) => {

  const promesas = rutaArchivos.map((rutaArchivo) => {
    return new Promise((resolve, reject) => {
      fs.stat(rutaArchivo, (error, stats) => {
        if (error) {
          reject(error);
        } else {
          resolve(stats);
        }
      });
    });
  });

  return Promise.all(promesas);
};




obtenerInformacionArchivos(rutaArchivos)
  .then((informacionArchivos) => {
    informacionArchivos.forEach((stats, index) => {
      console.log('Información del archivo:', archivos[index]);
      console.log('Tamaño del archivo:', stats.size);
      console.log('Fecha de creación:', stats.birthtime);
      console.log('Fecha de modificación:', stats.mtime);
      console.log('Es un directorio:', stats.isDirectory());
      console.log('Es un archivo:', stats.isFile());
      console.log('-------------------');
    });
  })
  .catch((error) => {
    console.error('Error al obtener información de los archivos:', error);
  });




  const id = req.params.id;
const file = `/uploads/${req.file.filename}`;
const rutaAbsoluta = `${req.protocol}://${req.get('host')}${file}`;
console.log(file,'---dato de la funcion aggIMG---');
const {destacado} = req.body;
const sql = `INSERT INTO imagenes(url,destacado,productoID) 
 VALUES (?,?,?)`;
    db.run(sql, [rutaAbsoluta,destacado,id], err =>{
    if (err) return console.error(err.message);
    console.log('URL de imagen Insertada Correctamente');
    res.redirect('/productos');
});