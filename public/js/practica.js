const closure = ()=>{
const object = {};

	return{
	agregar:function(clave,valor){
     object[clave] = valor;
    },
    mostrar:() => object	
	}
}
const instancia = closure();

instancia.agregar('nombre','randy');
console.log(instancia.mostrar());

