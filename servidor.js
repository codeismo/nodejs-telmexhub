//IMPORTAMOS LA DEPENDENCIA EXPRESS QUE PREVIAMENTE INSTALAMOS
//USANDO NPM
var express = require("express");
var nunjucks = require("nunjucks");

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
	
	res.render("articulo.html");	
});

//ESCUCHA LA PETICION A LA RUTA
//localhost:8080/informes
app.get("/informes",function(req,res){
	res.send("informes aqui!");
});




