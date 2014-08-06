
var Sequelize = require("sequelize");

//----- CONFIGURAR LA BASE DE DATOS con sequelize
var sequelize = new Sequelize("NOMBRE_BASE","USUARIO","PASSWORD_USUARIO",{
	dialect:"sqlite", //OTROS VALORES: postgres, mysql, mariadb
	//la propiedad storage SOLO ES PARA sqlite
	storage:__dirname + "/database.db",
	define:{
		timestamps:false,
		//deshabilita la convencion por default para el nombre de las tablas
		freezeTableName:true
	}
});

//SINCRONA
   // leer archivo
   // EJECUTAMOS LA SIGUIENTE LINEA

//---- LAS OPERACIONES EN DISCO DURO EN NODE SE HACEN DE MANER ASINCRONA
// CALLBACKS
// success ES EL CALLBACK DE LA OPERACION ASINCRONA
sequelize.authenticate().success(function(){
	//EL CODIGO EN ESTA FUNCION SE EJECTUA
	//SOLO HASTA QUE LA OPERCION ASINCRONA (AUTHENTICATE) TERMINA
	
	console.log("base lista!");
});

//module.exports ES UN OBJETO QUE NOS PERMITE HACER VISIBLES
//DATOS DE ESTE ARCHIVO
module.exports.PRUEBA = "hola";



// ------------ MAPEOS DE LAS TABLAS CON SEQUELIZE ------

var Articulo = sequelize.define("Articulo",{
	id:{
		//LE INDICAMOS A SEQUELIZE CON primaryKey que esta es una col
		//de la la llave primaria
		primaryKey:true,
		type:Sequelize.INTEGER
	},
	//le dice a sequelize que tenemos una columan titulo
	//que es una cadena
	titulo:Sequelize.TEXT,
	contenido:Sequelize.TEXT,
	//Sequelize.DATE ES PARA FECHAS
	fecha_creacion:Sequelize.DATE
},{
	//tableName le dicen cual es la tabla de la base
	//que esta asociada a este objeto
	tableName:"articulos"
});

//-------- SOLUCION EJERCICIO MAPEOS ------------
var Usuario = sequelize.define("Usuario",{
	id:{
		primaryKey:true,
		type:Sequelize.INTEGER
	},
	nombre:Sequelize.TEXT,
	email:Sequelize.TEXT,
	password:Sequelize.TEXT
},{
	tableName:"usuarios"
});

//-------- SOLUCION EJERCICIO FIND ALL-----
var Categoria = sequelize.define("Categoria",{
	id:{
		primaryKey:true,
		type:Sequelize.INTEGER
	},
	nombre:Sequelize.TEXT
},{
	tableName:"categorias"
}); 

//--------- SOLUCION EJERCICIO MAPEOS

var Comentario = sequelize.define("Comentario",{
	id:{
		primaryKey:true,
		type:Sequelize.INTEGER
	},
	comentario:Sequelize.TEXT
},{
	tableName:"comentarios"
});

//SOLUCION MAPEO 1-N
Articulo.hasMany(Comentario,{
	foreignKey:"articulo_id",
	//as me permite obtener los comentarios del articulo
	//haciendo articulo.comentarios
	as:"comentarios"
});

// -------- EJEMPLO MAPEO 1-N ------------------
// un usuario tiene muchos articulos
Usuario.hasMany(Articulo,{
	//foreignKey es la col que sirve de pegamento en la relacion 1-N
	foreignKey:"usuario_id",
	//cuando obtengan un objeto usuario
	// pueden acceder a los articulos con usuario.articulos
	as:"articulos"
});

//-------------------- EJEMPLO MAPEO N-N -------------------
Articulo.hasMany(Categoria,{
	foreignKey:"articulo_id",
	as:"categorias",
	//este parametro es solo para la relacion N-N
	through:"categorias_articulos"
});

Categoria.hasMany(Articulo,{
	foreignKey:"categoria_id",
	as:"articulos",
	through:"categorias_articulos"
});


//EXPORTANDO EL MODELO DE LA TABLA ARTICULO
module.exports.Articulo = Articulo;
module.exports.Usuario = Usuario;
module.exports.Categoria = Categoria;
module.exports.Comentario = Comentario;



