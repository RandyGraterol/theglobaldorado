let url = ['https://www.youtube.com/embed/eRFqrcoD3PE'];

window.addEventListener('load',()=>{
  let divIframe = document.querySelector('.divIframe');
   let iframe = document.createElement('iframe');
   iframe.classList.add('iframeResponsive');
   iframe.src =url[0];
   iframe.width = "400";
   iframe.height = "315";
   iframe.allow = 'autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture';
   iframe.loading = 'lazy';
   iframe.frameborder ='0';
   divIframe.append(iframe);
  
})
let anchodisponible = screen.availWidth;
let alturadisponible = screen.availHeight;

let anchototal = screen.width;
let alturatotal = screen.height;

console.log(`Ancho : ${anchototal} alto : ${alturatotal}`);