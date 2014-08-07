//CAMBIO! ahora
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
		type:Sequelize.INTEGER,
		//este parametro sirve para que la base genere de 
		//manera automatica el siguiente valor para el id
		autoIncrement:true
	},
	//le dice a sequelize que tenemos una columan titulo
	//que es una cadena
	titulo:{
		type:Sequelize.TEXT,
		validate:{
			//len == length valida si una cadena esta dentro cierto rango (longitud)
			//len:[5]
			//len:[5,100] == valida que la cadena este en un rango de 5 a 100
			len:{
				//args son los argumentos que originalmente le pasaban al validador
				args:[5],
				msg:"La longitud minima del titulo debe ser de 5 letras"
			},
			filtrarGroserias:function(titulo){
				//la funcion recibe el valor a validar
				var groserias = ["palabrota1","palabrota2","palabrota3"];
				var groseriasEncontradas = [];
				
				//validamos que el campo titulo tenga texto
				if(titulo !== null && titulo.length > 0){
					
					groserias.forEach(function(groseria){						
						//SI ENCONTRAMOS UNA GROSERIA
						if(titulo.search(groseria) !== -1){
							//push agrega elementos a un arreglo de javascript
							groseriasEncontradas.push(groseria);
						}					
					});					
				}
				
				//si encontramos palabras prohibidas:
				if(groseriasEncontradas.length > 0){
					//entonces lanzamos un error
					
					//throw es keyword que nos permite lanzar errores
					//EL MENSAJE QUE APARECE EN EL ERROR ES EL TEXTO QUE VIENE
					//EN EL OBJETO ERROR
					throw new Error("el titulo no puede contener las palabras:" + groseriasEncontradas);			
				}				
			}
		}
	},
	
	//=========== SOL EJERCICIO BREVE validaciones	
	contenido:{
		type:Sequelize.TEXT,
		validate:{
			len:{
				args:[15,100],
				msg:"el contenido debe tener una longitud de 15 a 1000 letras"
			}
		}
	},
	//Sequelize.DATE ES PARA FECHAS
	//las fechas en javascript se representan con un 
	//Date()
	fecha_creacion:Sequelize.DATE
},{
	//tableName le dicen cual es la tabla de la base
	//que esta asociada a este objeto
	tableName:"articulos",
	getterMethods:{
		fecha:function(){
			//getDataValue me permite acceder a las columnas
			//de este modelo
			var fecha = this.getDataValue("fecha_creacion");
			
			//DIA-MES-YEAR
			var fechaConFormato = fecha.getDate() + "-" + (fecha.getMonth()+1) + "-" + fecha.getFullYear();
			
			return fechaConFormato; 
		}
	}
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
	//forei	gnKey es la col que sirve de pegamento en la relacion 1-N
	foreignKey:"usuario_id",
	//cuando obtengan un objeto usuario
	// pueden acceder a los articulos con usuario.articulos
	as:"articulos"
});

// articulo le pertenece a un Usuario
// TOMAMOS EL SENTIDO INVERSO DE LA RELACION 1-N
Articulo.belongsTo(Usuario,{
	foreignKey:"usuario_id",
	//el parametro as me permite que al articulo puede acceder
	//al usuario que tiene este articulo con articulo.usuario
	as:"usuario"	
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

var DatosUsuario = sequelize.define("DatosUsuario",{
	id:{
		primaryKey:true,
		type:Sequelize.INTEGER
	},
	biografia:Sequelize.TEXT,
	fecha_registro:Sequelize.DATE
},{
	tableName:"datos_usuarios"
});

//--------- EJEMPLO MAPEO 1-1
Usuario.hasOne(DatosUsuario,{
	foreignKey:"usuario_id",
	as:"datosUsuario"
});


//EXPORTANDO EL MODELO DE LA TABLA ARTICULO
module.exports.Articulo = Articulo;
module.exports.Usuario = Usuario;
module.exports.Categoria = Categoria;
module.exports.Comentario = Comentario;
module.exports.DatosUsuario = DatosUsuario;


