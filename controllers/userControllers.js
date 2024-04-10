 const index = (req,res)=>{
 res.render('index2');
 }
//////////////////////////////////////////////////
 const servirImagenes = async (req, res) => {
 const rutaImagenes ='C:\\Users\\zheta\\Desktop\\155$\\server\\utils\\static\\img';
  try {
    const { nombreImagen } = req.params;
    const imagenComprimida = path.join(rutaImagenes, '/comprimidas/', nombreImagen);

    if (fs.existsSync(imagenComprimida)) {
      res.sendFile(imagenComprimida);
    } else {
      res.status(404).send('Imagen no encontrada');
    }
  } catch (error) {
    res.status(500).send('Error al servir la imagen');
  }
};
////////////////////////////////////////////////
 module.exports={
 	index,
    servirImagenes
 }