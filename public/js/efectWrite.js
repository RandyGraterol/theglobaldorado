const title = document.querySelector('#title');
const titleMain = document.querySelector('#titleMain');

const text = '¡Bienvenido a GlobalDorado!';
const textSecond = 'Sección dedicado a ti , crecimiento y evolución personal en Global';
let index = 0;
async function typeWriter(){

	if(index < text.length){
		title.classList.add('tituloIP');
		title.innerHTML += text.charAt(index);
		index++;
		await setTimeout(typeWriter,100);	
	}

}
typeWriter();