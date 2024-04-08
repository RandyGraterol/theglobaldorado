const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const rutaImagenes = path.join(__dirname, '/static/img');

// Obtener la lista de todas las imágenes en la carpeta 'static'
/*------------------------------------------------------------------*/
const obtenerListaImagenes = async (ruta) => {
  try {
    const archivos = await fs.readdir(ruta);//se devuelve un vector


    const listaImagenes = archivos.filter(async (archivo) => {
      const stats = await fs.stat(path.join(ruta, archivo));//se devuelve un arreglo de objetos
      return stats.isFile() && ['.jpg', '.jpeg', '.png'].includes(path.extname(archivo).toLowerCase());
    });


    return listaImagenes;
  } catch (error) {
    console.error('Error al obtener la lista de imágenes:', error);
    return [];
  }
};
/*------------------------------------------------------------------*/

const comprimirImagenes = async () => {
  try {
    const listaImagenes = await obtenerListaImagenes(rutaImagenes);
    const imagenesComprimidas = [];

    for (const imagen of listaImagenes) {
      const imagenOriginal = path.join(rutaImagenes, imagen);
      const imagenComprimida = path.join(rutaImagenes, 'comprimidas', imagen);

      await sharp(imagenOriginal).jpeg({ quality: 80 }).toFile(imagenComprimida);
      imagenesComprimidas.push(imagenComprimida);
    }

    console.log('Imágenes comprimidas:', imagenesComprimidas);
  } catch (error) {
    console.error('Error al comprimir las imágenes:', error);
  }
};

comprimirImagenes();

//En construccion//

app.get('/imagenes-comprimidas/:nombreImagen', (req, res) => {
  const { nombreImagen } = req.params;
  const imagenComprimida = path.join(rutaImagenes, 'comprimidas', nombreImagen);

  if (fs.existsSync(imagenComprimida)) {
    res.sendFile(imagenComprimida);
  } else {
    res.status(404).send('Imagen no encontrada');
  }
});