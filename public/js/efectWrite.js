
const title = document.querySelector('#title');

const text = '¡Bienvenido a GlobalDorado!';

let index = 0;

console.log(title);

async function typeWriter(){

	if(index < text.length){
		title.style='color:rgb(255, 183, 67);width:700px;text-aling:center;margin:1rem auto;display:flex;justify-content:center;aling-item:center'
		title.innerHTML += text.charAt(index);
		index++;
		await setTimeout(typeWriter,100);	
	}

}
typeWriter();