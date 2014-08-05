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
nunjucks.configure(__dirname + "/vistas",{
	//le asignamos el servidor de express 
	express:app
});


//LEVANTAMOS AL SERVIDOR EN EL PUERTO 8080
app.listen(8080);

//DEFINIR RUTAS PARA MI PROYECTO WEB
app.get("/articulo",function(req, res){
	// req = REQUEST DE LA PETICION WEB
	// res = RESPONSE DE LA PETCION WEB
	
	//EN ESTA FUNCION SE EJECUTA TODO EL CODIGO
	//PARA LA RUTA localhost:8080/inicio	
	//res.send("hola!");
	
	//HACEMOS LA CONSULTA PARA BUSCAR EL PRIMER RENGLON
	//buscamos el renglon cuyo id sea 1
	modelos.Articulo.find(1).success(function(articulo){
		//este metodo se ejecuta cuando encuentra algo
		
		console.log("se encontro articulo:" + articulo.titulo);		
		res.render("articulo.html",{
			//asigno el objeto articulo a la propiedad:
			articuloPrincipal:articulo
		});				
	});
			
});

//ESCUCHA LA PETICION A LA RUTA
//localhost:8080/informes
app.get("/informes",function(req,res){
	res.send("informes aqui!");
});

//--- SOLUCION EJERCCIIO----
app.get("/blog",function(req,res){
	res.render("blog.html");
});

app.get("/usuario",function(req,res){
	res.render("usuario.html");
});






