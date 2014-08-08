//modelos-spec.js

//requerimos los modelos del proyecto para las pruebas
//asincronas
var modelos = require("../modelos/principal.js");
//testing-asincrono-spec.js

//define una suite para nuestros tests
describe("Modelos Articulo",function(){	
	
	//done === es un parametro que se usa solo cuando
	//tienen que probar metodos asincronos
	
	it("deberia crear un articulo nuevo",function(done){
		
		//noten que la propiedad classMethods de sequelize
		//me permite acceder a las funciones que declare en el modelo
		modelos.Articulo.crearOActualizar({
			titulo:"NUEVO ARTICULO TESTING",
			contenido:"NUEVO CONTENIDO TESTING",
			usuario_id:1//le asignamos el usuario 1 como dueno
		},{
			//le asignamos la funcion de callback si todo sale bien
			exito:function(articuloNuevo){
				//hacemos un assertion que espera que articuloNuevo
				//tenga un objeto (el articulo creado)
				expect(articuloNuevo).not.toBe(null);
				//le indicamos al jasmine que ya termino test (ASINCRONO)
				done();
			}
		});
		
	});
	
	console.log("llegamos a la parte del archivo");	
});
