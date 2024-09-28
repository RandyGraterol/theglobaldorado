const contactForm = document.querySelector('#contactForm');

contactForm.addEventListener('submit',(e)=>{
e.preventDefault();
const name = document.getElementById('name').value;
const telefono = document.getElementById('telefono').value;
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

const data = {name,telefono,email,password};

fetch('/users',{
	method:'post',
	headers:{
		'Content-Type':'application/json'
	},
	body:JSON.stringify(data)
})
.then(res=>res.json())
.then(res=>{
	if(res.interruptor == 'A'){
		
		 const ocultar =document.querySelectorAll('.ocultar');
                for(let x = 0;x < ocultar.length;x++){
                 ocultar[x].style.display='none';   
                }
                Swal.fire('¡Ya estas registrado , intenta con otros datos!')
                .then(()=>{
                for(let x = 0;x < ocultar.length;x++){
                ocultar[x].style.display='flex';   
                }           
                });
	}else if(res.interruptor == 'B'){
		 const ocultar =document.querySelectorAll('.ocultar');
                for(let x = 0;x < ocultar.length;x++){
                 ocultar[x].style.display='none';   
                }
                Swal.fire(`¡Te haz registrado exitosamente ${email} , se te enviara un correo electronico cuando tu solicitud sea aprobada!`)
                .then(()=>{
                for(let x = 0;x < ocultar.length;x++){
                ocultar[x].style.display='flex';   
                }          
                window.location.href='/login'; 
                });
	}else{
	    const ocultar =document.querySelectorAll('.ocultar');
                for(let x = 0;x < ocultar.length;x++){
                 ocultar[x].style.display='none';   
                }
                Swal.fire('¡Uff , algo salio mal , intenta mas tarde!')
                .then(()=>{
                for(let x = 0;x < ocultar.length;x++){
                ocultar[x].style.display='flex';   
                }   
                location.reload();        
                });
	}
})

});