//ESTE TEST ES DEL SINCRONO

//ES MUY IMPORTANTE QUE SUS ARCHIVOS DE TESTING
//PARA JASMINE TERMINEN CON LA PALABRA spec.js
///intro-testing-spec.js

//describe DEFINE NUESTRO SUITE
// UN SUITE EN TESTING ES UN COLECCION DE PRUEBAS AUTOMATIZADAS
describe("Calculadora", function() {
	
	//beforeEach SE EJECUTA ANTES DE CUALQUIER TEST (it)
	beforeEach(function(){		
		console.log("antes del test");		
	});	
	
	//afterEac SE EJECUTA  DESPUES DE CUALQUIER TEST (it)
	afterEach(function(){
		console.log("despues del test");		
	});	

	describe("operacion suma", function() {

		//AQUI VAN OTROS SUITES U OTROS TESTS

		//it == ME PERMITE DEFINIR MIS TESTS
		//PRIMER ARGUMENTO RECOMENDABLE QUE SEA UNA DESCRIPCION
		//DE LO QUE VA A PROBAR EL TEST
		it("deberia sumar 2 numeros enteros", function() {

			//AQUI VA EL CODIGO QUE VAMOS A PROBAR
			var suma = 1 + 3;

			//LA SIGUIENTE LINEA DECARA UN ASSERTION
			//en expect como argumento ponen el valor a probar
			//toBe es el valor que esperan (el valor correcto)
			//toBe es UN MATCHER
			expect(suma).toBe(4);

		});

		it("deberia sumar 2 numeros flotantes menores que 1", function() {
			//LOS NUMEROS DECIMALES EN TODOS LENGUAJES
			//FLOAT = IEEE754
			//SI NECESITAN PRECISION ABSOLUTA EN FLOTANTES
			//NECESITAN BUSCAR LA IMPLEMENTACION DE BIGDECIMAL

			var suma = 0.1 + 0.2;
			//TOMAMOS LA SUMA QUE HICIMOS PREVIAMENTE
			//LE RESTAMOS EL VALOR QUE ESPERAMOS
			//ESO ES UNA DIFERENCIA(epsilon)
			var epsilon = Math.abs(suma - 0.3);

			//toBeLessThan es OTRO MATCHER
			expect(epsilon).toBeLessThan(0.001);
		});

	});

});
