self.onmessage = function(event){

if(event.data === true){
console.log(`¡Permiso concedido para enviar los datos!`);
let data = {nombre:'randy',edad:23,sexo:'M'}
self.postMessage(data);
}else{
    console.log(`No tienes permisos sufiecientes ${event.data}`);
}
}