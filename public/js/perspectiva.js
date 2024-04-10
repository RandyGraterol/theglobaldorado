const perspectiva = document.querySelector('.perspectiva');
const perspectivaContainer = document.querySelector('.perspectiva-container');

window.addEventListener('scroll', () => {
  const distanciaAlTop = perspectivaContainer.getBoundingClientRect().top;
  const alturaVentana = window.innerHeight;
  
  console.log(alturaVentana,'altura de la ventana');
  console.log(distanciaAlTop,'diststancia al top');

  if (distanciaAlTop < alturaVentana) {
    perspectiva.classList.remove('oculto');
  } else {
    perspectiva.classList.add('oculto');
  }
},{ passive: true });






let url = ['https://www.youtube.com/embed/eRFqrcoD3PE','https://www.youtube.com/embed/kN1XP-Bef7w'];
window.addEventListener('load',()=>{
  let divPerspectiva = document.querySelectorAll('.divPerspectiva');
  for(let i = 0 ; i < 2;i++){
   let iframe = document.createElement('iframe');
   iframe.src = url[i];
   iframe.width = "400";
   iframe.height = "315";
   iframe.allow = 'autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture';
   iframe.loading = 'lazy';
   iframe.frameborder ='0';
   let div = i === 0 ? divPerspectiva[i] : divPerspectiva[i];
   div.append(iframe);
  }
})

