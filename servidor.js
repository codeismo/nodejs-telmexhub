//IMPORTAMOS LA DEPENDENCIA EXPRESS QUE PREVIAMENTE INSTALAMOS
//USANDO NPM
var express = require("express");
var nunjucks = require("nunjucks");

//---- REQUERIMOS NUESTROS MODULOS
var modelos = require("./modelos/principal.js");
console.log("PRUEBA:" + modelos.PRUEBA);

//INVOCAMOS A LA FUNCION DE EXPRESS PARA CREAR UN SERVIDOR WEB
var app = express();

//----------- CONFIGURAMOS NUNJUCKS -----------------
// (sistema de templates)

//__dirname = CONTIENE LA RUTA ACUTAL EN LA QUE SE ENCUENTRA ESTE
//ARCHIVO
nunjucks.configure(__dirname + "/vistas", {
	//le asignamos el servidor de express
	express : app
});

//LEVANTAMOS AL SERVIDOR EN EL PUERTO 8080
app.listen(8080);

//DEFINIR RUTAS PARA MI PROYECTO WEB
// localhost:8080/articulo/NUMERO
// [0-9]+   = ES UN EXPR REGULAR QUE HACE MATCH DE NUMEROS ENTEROS

// CACHA RUTAS DE LA FORMA localhost:8080/articulo/1
app.get("/articulo/:articuloId([0-9]+)", function(req, res) {
	// req = REQUEST DE LA PETICION WEB
	// res = RESPONSE DE LA PETCION WEB
	//req.params = ME DA ACCESO A LAS EXPRESIONES QUE VENGAN EN UNA RUTA
	//DINAMICA (expresiones regulares)
	var articuloId = req.params.articuloId;

	//EN ESTA FUNCION SE EJECUTA TODO EL CODIGO
	//PARA LA RUTA localhost:8080/inicio
	//res.send("hola!");

	//HACEMOS LA CONSULTA PARA BUSCAR EL PRIMER RENGLON
	//buscamos el renglon cuyo id sea 1
	modelos.Articulo.find(articuloId).success(function(articulo) {
		//SI NO ENCUENTRA NADA articulo == null
		//este metodo se ejecuta cuando encuentra algo

		//console.log("se encontro articulo:" + articulo.titulo);

		res.render("articulo.html", {
			//asigno el objeto articulo a la propiedad:
			articuloPrincipal : articulo
		});
	});

});

//-------- SOLUCIOON EJERCCIO MAPEOS
app.get("/usuario", function(req, res) {

	modelos.Usuario.find({
		where:{id:2},
		//
		include:[{
			model:modelos.Articulo,
			//el parametro as debe de ser igual al del parametro
			//as que usaron en principal.js
			as:"articulos"
		}]
	}).success(function(usuario) {
		
		//la variable usuario ya tiene los articulos de ese USUARIO
		//por medio de usuario.articulos
		res.render("usuario.html", {
			usuario : usuario
		});
	});
});

//ESCUCHA LA PETICION A LA RUTA
//localhost:8080/informes
app.get("/informes", function(req, res) {
	res.send("informes aqui!");
});

//--- SOLUCION EJERCCIIO FIND Y FINDALL ----
// localhost:8080/blog?offset=3
app.get("/blog", function(req, res) {
	
	//req.query == LES DA ACCESO A TODOS LOS PARAMETROS
	//QUE VIENEN EN EL QUERY STRING
	//si no se pone el query string de offset
	//toma el valor de 0
	
	var offset = req.query.offset;
	
	//COMO IMPLEMENTAR UN PAGINADOR jquery 
	modelos.Articulo.findAll({
		limit:3,
		offset:offset
	}).success(function(articulos) {
		//articulos == son los renglones que encontro el metodo
		//findAll

		modelos.Categoria.findAll().success(function(categorias) {
			//aqui ya tengo todas las categorias
			//tambien ya tengo todos articulos

			//HACER CONSULTA A TODAS LAS CATEGORIAS, Y EN CALLBACK
			//HACER EL RENDER
			res.render("blog.html", {
				//articulos encontrados se los pasamos a la vista
				articulos : articulos,
				categorias : categorias
			});

		});

	});

});