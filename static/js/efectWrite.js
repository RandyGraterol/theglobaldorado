
const title = document.getElementById('title');

const text = '¡Estamos preparados para un gran impulso tecnologico y social en la industria del desarrollo web Reactivo y responsive!';

let index = 0;

function typeWriter(){
	if(index < text.length){
		title.innerHTML += text.charAt(index);
		index++;
		setTimeout(typeWriter,50)
		
	}

}
typeWriter();