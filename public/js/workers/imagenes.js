
self.onmessage=function(event){
if(event.data == true){
	fetch('/getPictureIndex')
	.then(res=>res.json())
	.then(res=> {
	console.log('datos del server recibidos exitosamente');
     self.postMessage(res.movies);
	})
	.catch(error=>{
	 console.error(error)
	})
}
}