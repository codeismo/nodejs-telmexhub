//IMPORTAMOS LA DEPENDENCIA EXPRESS QUE PREVIAMENTE INSTALAMOS
//USANDO NPM
var express = require("express");
var nunjucks = require("nunjucks");
var expressSession = require("express-session");

var sesion = expressSession({
	//secret lo usa el servidor para genera un valor aleatoriao que asigna
	//a la cookie de sesion
	secret : "lkjsfffs",
	// este parametro es el nombre de la cookie de session
	key : "sesionServidor",
	//son para que cree siempre una sesion nueva para el usuario
	resave : true,
	saveUninitialized : true,
	//configuramos el tiempo de la cookie de sesion
	cookie : {
		//max Age es el tiempo que dura la sesion de un usuario (milisegundos)
		//la cookie de sesion dura 30 dias!!!
		maxAge : 1000 * 60 * 60 * 24 * 20
	}
});

//en la version 3 EXPRESS el body-parser TIENE UN PROBLEMA DE SEGURIDAD
//NUNCA USEN EN LA VERSION 3 DE EXPRESS BODY PARSER
//TRABAJAMOS EN LA VERSION 4 DE EXPRESS
var bodyParser = require("body-parser");

//---- REQUERIMOS NUESTROS MODULOS
var modelos = require("./modelos/principal.js");
console.log("PRUEBA:" + modelos.PRUEBA);

//INVOCAMOS A LA FUNCION DE EXPRESS PARA CREAR UN SERVIDOR WEB
var app = express();

//asignamos la sesion al servidor de express
app.use(sesion);

//HABILITAMOS LOS PARAMETROS DEL TIPO POST para express
app.use(bodyParser.urlencoded({
	//extended es para habilitar el parser para objetos JSON
	extended : false
}));

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

//----------- AGREGREGAR LA LOGICA PARA LOS MIDDLEWARES DE EXPRESS --------

//este middleware valida que un usuario sea dueno de un articulo en particular
function validarPertenenciaArticulo(req, res, siguienteFuncion) {
	//accedemos al id del articulo que quieren editar
	//yo espero que el id venga como un parametro de la ruta dinamica
	var articuloId = req.params.articuloId;

	//si dentro de la ruta NO VIENE EL PARAMETRO ID DEL ARTICULO
	//SIGNIFICA QUE ESTE MIDDLEWARE LO ESTA USANDO UN METODO POST
	if ( typeof articuloId === "undefined") {
		//el metodo post que usamos para guardar un articulo,
		//envia el id del articulo en una peticion post
		//(viene req.body)
		articuloId = req.body.id;
		console.log("tomamos el id del post:" + articuloId);
	}

	//buscamos el articulo que quieren editar
	modelos.Articulo.find({
		where : {
			id : articuloId
		},
		//del articulo obtenemos tambien el usuario dueno
		include : [{
			model : modelos.Usuario,
			as : "usuario"
		}]
	}).success(function(articulo) {

		//checamos si este articulo su usuario es el mismo que el usuario
		//que esta logeado
		if (articulo.usuario.id === req.session.usuarioLogeado.id) {

			//si el usuario tiene permisos lo dejamos pasar
			siguienteFuncion();
		} else {

			//SI EL USUARIO NO TIENE PERMISOS, NO LO DEJAMOS PASAR
			res.send("NO TIENES PERMISOS PARA EDITAR EL ARTICULO:" + articulo.id);
		}

	});

}

//req = request
//res == response
//el tercer argumento es la siguiente funcio en el stack de middlewares
function validarSesion(req, res, siguienteFuncion) {

	console.log("validando sesion del usuario");
	//protegemos rutas checando si existe en la sesion el objeto
	//usuarioLogeado
	//tenemos que usar un keyword de javscript que se llama typeof
	if ( typeof req.session.usuarioLogeado === "undefined") {
		//SI EL USUARIO NO SE A LOGEADO NO LO DEJAMOS PASAR
		//Y LO REENVIAMOS A /login
		res.redirect("/login");
	} else {
		//SI YA ESTA LOGEADO
		siguienteFuncion();
	}
}

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
	modelos.Articulo.find({
		where : {
			id : articuloId
		},
		include : [{
			model : modelos.Comentario,
			as : "comentarios"
		}, {
			model : modelos.Categoria,
			as : "categorias"
		}, {
			model : modelos.Usuario,
			as : "usuario"
		}]
	}).success(function(articulo) {
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
		where : {
			id : 2
		},
		//
		include : [{
			model : modelos.Articulo,
			//el parametro as debe de ser igual al del parametro
			//as que usaron en principal.js
			as : "articulos"
		}, {
			model : modelos.DatosUsuario,
			as : "datosUsuario"
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
		limit : 3,
		offset : offset
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

//ARMANDO NUESTRO EDITOR DE ARTICULOS
app.get("/articulo/:articuloId([0-9]+)/editar", validarSesion, validarPertenenciaArticulo, function(req, res) {

	console.log("entrando a ruta editar articulo");

	//recibimos el parametro para editar el articulo
	var articuloId = req.params.articuloId;
	//note que la bandera actualizado del query string
	//solo viene si guardaron previamente un dato
	var actualizado = req.query.actualizado;

	modelos.Articulo.find(articuloId).success(function(articulo) {
		res.render("articulo_editar.html", {
			articulo : articulo,
			actualizado : actualizado
		});
	});

});

//en el formulario enviamos los datos como una peticion http-post
//VALIDAMOS QUE LA SESION EXISTA TAMBIEN PARA ESTA PETICION POST
//QUE ES PARA GUARDAR UN ARTICULO
app.post("/guardar-articulo", validarSesion, validarPertenenciaArticulo, function(req, res) {

	//req.params = parametros en las rutas
	//req.query = parametros en forma de query string
	var id = req.body.id;
	var titulo = req.body.titulo;
	var contenido = req.body.contenido;
	var usuario_id = req.body.usuario_id;

	var manejadorErrores = function() {
		//este codigo se ejecuta cuando hay un error al guardar este articulo
		//puede ocurrir un error al romper un constraint de la base o cuando
		//hay un error de validacion
		//JSON.stringify nos muestra una represetnacion en forma de cadena
		//de un objeto de javascripts
		console.log(JSON.stringify(errores));

		res.render("articulo_editar.html", {
			//le pasamos los parametro que queriamos guardar
			//originalmente
			articulo : {
				id : id,
				titulo : titulo,
				contenido : contenido,
			},
			//le pasamos la lista de errores
			errores : errores
		});
	};

	console.log("id articulo a guardar:" + id);

	if (id === "") {
		console.log("se va crear un nuevo articulo");
		//aqui va la logica para crear un nuevo articulo

		//create es para crear un nuevo renglon en la base
		//save lo usan para actualizar un renglo que YA EXISTE
		modelos.Articulo.create({
			//id:20,
			titulo : titulo,
			contenido : contenido,
			fecha_creacion : new Date(),
			usuario_id : 1
		}).success(function(articuloNuevo) {
			//articuloNuevo tiene el nuevo renglon que crearon

			//VOLVEMOS A UTILIZAR EL PATRON POST-REDIRECT-RESPONSE
			var url = "/articulo/" + articuloNuevo.id + "/editar?actualizado=true";
			res.redirect(url);

		}).error(manejadorErrores);

	} else {
		//id no viene vacio (es decir trae un numero)
		//aqui va la logica para actualizar

		modelos.Articulo.find(id).success(function(articulo) {
			//encontramos el articulo que vamos actualizar

			//sobreescribimos el titulo del articulo en la base
			//por el nuevo titulo que me paso el usuario
			articulo.titulo = titulo;
			articulo.contenido = contenido;

			//save actualiza los cambios para este renglon de la tabla
			//que encontramos
			articulo.save().success(function() {

				//aqui ya se guardaron los cambios en la base
				//res.send("cambios guardadoss");

				//PATRON POST/REDIRECT/GET
				//le decimos al nav del usuaario que haga un http-redirect
				//a la ruta http://localhost:8080/articulo/ID_ESTE_ARTICULO/editar
				var url = "/articulo/" + articulo.id + "/editar?actualizado=true";
				//HTTP-REDIRECT EN EXPRESS SE HACE con:
				res.redirect(url);

			}).error(manejadorErrores);

		});
	}
});

//ESTA RUTA ES PARA CREAR NUEVOS ARTICULOS
app.get("/articulo/crear", validarSesion, function(req, res) {

	res.render("articulo_editar.html");
});

//localhost:8080/articulo/NUMERO/destruir destruye ese articulo
app.get("/articulo/:articuloId([0-9]+)/destruir", function(req, res) {

	var articuloId = req.params.articuloId;

	//buscamos el articulo a destruir
	modelos.Articulo.find(articuloId).success(function(articulo) {

		//obtener todos los comentarios del articulo
		//y aplicar el metodo destroy en esos comentarios
		// ahora si destruimos el articulo

		//ubicado el articulo lo destruimos
		articulo.destroy().success(function() {
			//una vea que destruyo el renglon se ejecuta
			//esta funcion

			res.send("articulo " + articuloId + " fue destruido");
		});
	});
});

//=-------------- INICIA LOGICA PARA EL LOGIN ---------------

app.get("/login", function(req, res) {
	res.render("login.html");
});

app.post("/autentificar", function(req, res) {

	//recuerden que los parametros del post los toman del body
	var email = req.body.email;
	var password = req.body.password;

	modelos.Usuario.find({
		where : {
			//LO SIGUIENTE ES EQUIVALENTE HACER UNA OPERACION SQL CON UN WHERE Y UN AND
			email : email,
			password : password
		}
	}).success(function(usuarioEncontrado) {

		//el usuario con ese password y ese email NO EXISTEN!!
		if (usuarioEncontrado === null) {
			//si no existe el usuario le mostramos otra la vista de login.html
			res.render("login.html", {
				error : true
			});

		} else {
			//ese usuario si existe
			//CREAMOS UNA SESION EN EL SERVIDOR

			req.session.usuarioLogeado = {
				id : usuarioEncontrado.id,
				email : usuarioEncontrado.email
			};

			res.send("usuario logeado correctamente!!");
		}

	});

});
