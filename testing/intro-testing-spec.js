//ES MUY IMPORTANTE QUE SUS ARCHIVOS DE TESTING
//PARA JASMINE TERMINEN CON LA PALABRA spec.js
///intro-testing-spec.js

//describe DEFINE NUESTRO SUITE 
// UN SUITE EN TESTING ES UN COLECCION DE PRUEBAS AUTOMATIZADAS
describe("Calculdora",function(){
	//AQUI VAN OTROS SUITES U OTROS TESTS
	
	//it == ME PERMITE DEFINIR MIS TESTS
	//PRIMER ARGUMENTO RECOMENDABLE QUE SEA UNA DESCRIPCION
	//DE LO QUE VA A PROBAR EL TEST
	it("deberia sumar 2 numeros enteros",function(){
		
		//AQUI VA EL CODIGO QUE VAMOS A PROBAR		
		var suma = 1 + 3;
		
		//LA SIGUIENTE LINEA DECARA UN ASSERTION
		//en expect como argumento ponen el valor a probar
		//toBe es el valor que esperan (el valor correcto)
		expect(suma).toBe(4);
		
	});	
});
