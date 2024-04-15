const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const rutaImagenes = path.join(__dirname, '/static');

const obtenerListaImagenes = async (ruta) => {
  try {
    const archivos = await fs.readdir(ruta);
    const promesasStats = archivos.map((archivo) => fs.stat(path.join(ruta, archivo)));
    const stats = await Promise.all(promesasStats);
    const listaImagenes = archivos.filter((archivo, index) => {
      return stats[index].isFile() && ['.jpg', '.jpeg', '.png'].includes(path.extname(archivo).toLowerCase());
    });
    return listaImagenes;
  } catch (error) {
    console.error('Error al obtener la lista de imágenes:', error);
    return [];
  }
};

const comprimirImagen = async (imagen) => {
  try {
    const imagenOriginal = path.join(rutaImagenes, 'img', imagen);
    const imagenComprimida = path.join(rutaImagenes, 'comprimidas', imagen);
    await sharp(imagenOriginal).jpeg({ quality: 80 }).toFile(imagenComprimida);
    console.log('Imagen comprimida:', imagenComprimida);
  } catch (error) {
    console.error('Error al comprimir la imagen:', error);
  }
};

const comprimirImagenes = async () => {
  try {
    const listaImagenes = await obtenerListaImagenes(path.join(rutaImagenes, 'img'));
    const promesasComprimir = listaImagenes.map(comprimirImagen);
    await Promise.all(promesasComprimir);
  } catch (error) {
    console.error('Error al comprimir las imágenes:', error);
  }
};

// Inicializar compresión de imágenes
comprimirImagenes();

// Monitorear cambios en la carpeta de imágenes
fs.watch(path.join(rutaImagenes, 'img'), async () => {
  console.log('Se detectó un cambio en la carpeta de imágenes. Comprimiendo imágenes...');
  await comprimirImagenes();
});