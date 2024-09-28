
function externa (){
  this.nombre= 'randy';
  this.apellido ='graterol';
	return ()=> {
			console.log(`el nombre es ${this.nombre } ${this.apellido}`);
		
	}
}
let metodos = externa();
metodos.mostrar();