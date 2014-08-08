//modelos-spec.js

//EN PRUEBAS MAS AVANZADAS CREAMOS MOCK OBJECTS
//TESTING: BDD O TDD
//JASMINE ES UN FRAMEWORK QUE SE BASA EN BDD

//requerimos los modelos del proyecto para las pruebas
//asincronas
var modelos = require("../modelos/principal.js");
//testing-asincrono-spec.js

//define una suite para nuestros tests
describe("Modelos Articulo", function() {

	//done === es un parametro que se usa solo cuando
	//tienen que probar metodos asincronos

	it("deberia crear un articulo nuevo", function(done) {

		//crea una nueva transaccion en la base
		modelos.sequelize.transaction(function(t) {
			//t = transaccion que creo en la base

			//noten que la propiedad classMethods de sequelize
			//me permite acceder a las funciones que declare en el modelo
			modelos.Articulo.crearOActualizar({
				titulo : "NUEVO ARTICULO TESTING (TRANSACCION)",
				contenido : "NUEVO CONTENIDO TESTING (TRANSACCION)",
				usuario_id : 1//le asignamos el usuario 1 como dueno
			}, {
				//como parte de las opciones de configuracion
				//le paso la transaccion al metodo crearOActualizar
				transaction : t,
				//le asignamos la funcion de callback si todo sale bien
				exito : function(articuloNuevo) {

					//USAMOS LA TRANSACCION PARA DESHACER EL CAMBIO
					//DE ESTA PRUEB
					//como rollbac es asincrono, necesitamos el callback
					t.rollback().success(function() {

						//hacemos un assertion que espera que articuloNuevo
						//tenga un objeto (el articulo creado)
						expect(articuloNuevo).not.toBe(null);
						//le indicamos al jasmine que ya termino test (ASINCRONO)
						done();

					});
				}
			});

		});

	});

	console.log("llegamos a la parte del archivo");
});
