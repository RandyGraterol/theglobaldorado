 const worker = new Worker('/js/workers/imagenes.js');

  worker.onmessage = function(event){
   let contenedor = document.querySelector('.peliculas');
   for(let x = 0; x < event.data.length;x++){
   let div = document.createElement('DIV');
   let div2 = document.createElement('DIV');
   let a = document.createElement('A');
   div.classList.add('carrusel'); 
   let picture = document.createElement('PICTURE');
   let img = document.createElement('IMG');
   img.src=event.data[x].portada;
   picture.append(img);
   a.append(picture);
   div2.append(a);
   div.append(div2);
   contenedor.append(div);
   }
  }

  worker.postMessage(true);