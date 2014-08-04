//IMPORTAMOS LA DEPENDENCIA EXPRESS QUE PREVIAMENTE INSTALAMOS
//USANDO NPM
var express = require("express");

//INVOCAMOS A LA FUNCION DE EXPRESS PARA CREAR UN SERVIDOR WEB
var app = express();
//LEVANTAMOS AL SERVIDOR EN EL PUERTO 8080
app.listen(8080);

//DEFINIR RUTAS PARA MI PROYECTO WEB
app.get("/inicio",function(req, res){
	// req = REQUEST DE LA PETICION WEB
	// res = RESPONSE DE LA PETCION WEB
	
	//EN ESTA FUNCION SE EJECUTA TODO EL CODIGO
	//PARA LA RUTA localhost:8080/inicio
	
	res.send("hola!");	
});

//ESCUCHA LA PETICION A LA RUTA
//localhost:8080/informes
app.get("/informes",function(req,res){
	res.send("informes aqui!");
});




