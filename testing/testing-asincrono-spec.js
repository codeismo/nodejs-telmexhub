//requerimos los modelos del proyecto para las pruebas
//asincronas
var modelos = require("../modelos/principal.js");
//testing-asincrono-spec.js

//define una suite para nuestros tests
describe("Modelos Articulo",function(){	
	
	//done === es un parametro que se usa solo cuando
	//tienen que probar metodos asincronos
	
	it("deberia encontrar un articulo",function(done){
		
		//vamos a probar que el metodo find de sequelize 
		//realmente funciona
		//hacemos una llamada asincrona
		modelos.Articulo.find(1).success(function(articulo){
			
			//USAMOS UN ASSERTION
			//QUE USA 2 MATCHERS
			//ESPERAMOS QUE EL ARTICULO NO SEA NULL
			//(que venga con datos) 
			expect(articulo).not.toBe(null);
			console.log("test termino :)");
			//LA INVOCACION DE DONE, ME PERMITE INDICARLE
			//A JASMINE QUE ESTE TEST ASINCRONO YA TERMINO
			done();
					
		}).error(function(errores){//error se ejecuta cuando hay un error
			
			//formamos otro assertion que espera que no haya 
			//errores ( es decir que errores = null)
			expect(errores).toBe(null);
			
		});
		
	});
	
	console.log("llegamos a la parte del archivo");	
});
