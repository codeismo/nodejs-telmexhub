console.log("hola mundo node.js!");

var curso = "node.js";
var duracion = 15.5;

// OBJETOS DE JAVASCRIPT
// objeto de javascript => JSON
var persona = {
	nombre:"bart simpson",
	edad:7
};

persona.trabajo = "estudiante";

//forma 2 de declarar objetos de javascript
var persona2 = new Object();
persona2.nombre = "homero simpson";
persona2.edad = 40;

console.log("edad homer:" + persona2.edad);


//----------- DECLARACION DE FUNCIONES DE JAVASCRIPT ------

//DECLARACION TRADICIONAL
function sumar(a,b){
	
	return a+b;
}

//SEGUNDA FORMA: FUNCIONES ANONIMAS
var multiplar = function(a,b){
	//multiplicamos los valores que nos pasan
	return a*b;
};

function operacion(miFuncion,a,b){
	//operacion espera que miFuncion sea una funcion de javascript
	
	return miFuncion(a,b);
}

//SOLUCION EJERCICIO BREVE
//LAS FUNCIONES ANONIMAS = LAMBDAS
var dividir = function(a,b){
	return a/b;
};

//PARADIGMA FUNCIONAL: TRATAR A LAS FUNCIONES COMO CIUDADANOS DE PRIMERA CLASE
//                     (significa que una funcion se puede guardar en una variable
//	                     que pueden pasar como argumento una funcion a otra funcion
//	                   )


console.log("1+2:" + sumar(1,2));
console.log("2*3:" + multiplar(2,3));

var resultado = operacion(dividir,1,2);
console.log("resultado:" + resultado);












