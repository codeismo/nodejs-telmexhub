/************** TABLAS PARA EJERCICIOS ONE-TO-ONE ***************/


CREATE TABLE usuarios(
   id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,   
   nombre VARCHAR(600),
   email VARCHAR(500),
   password VARCHAR(500)
);


CREATE TABLE datos_usuarios(
   id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,   
   usuario_id INTEGER,
   biografia VARCHAR(100),
   fecha_registro DATE,   
   FOREIGN KEY(usuario_id) REFERENCES datos_usuarios
);


/************** TABLAS PARA EJERCICIO ONE-TO-MANY ***************/

CREATE TABLE articulos(
   id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
   usuario_id INT, 
   titulo VARCHAR(500), 
   contenido TEXT, 
   fecha_creacion DATE,    
   FOREIGN KEY(usuario_id) REFERENCES usuarios
);

CREATE TABLE comentarios(
   id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
   articulo_id INT,
   comentario TEXT,
   autor VARCHAR(500),
   fecha_creacion DATE,   
   FOREIGN KEY(articulo_id) REFERENCES articulos
);

/************** TABLAS PARA EJERCICIO MANY-TO-MANY ***************/

CREATE TABLE categorias(
   id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
   nombre VARCHAR(200)
);

CREATE TABLE categorias_articulos(
   articulo_id INT ,
   categoria_id INT,
   PRIMARY KEY(articulo_id, categoria_id),
   FOREIGN KEY(categoria_id) REFERENCES categorias,
   FOREIGN KEY(articulo_id) REFERENCES articulos
);




/************** DATOS PARA EJERCICIOS ONE-TO-ONE ***************/

INSERT INTO usuarios( nombre, email, password) VALUES('Juan', 'juan@email.com','1234');
INSERT INTO usuarios( nombre, email, password) VALUES('Luis', 'luis@email.com','1234');

INSERT INTO datos_usuarios(usuario_id, biografia, fecha_registro) VALUES(1,'biografia usuario 1','2013-10-24');
INSERT INTO datos_usuarios(usuario_id, biografia, fecha_registro) VALUES(2,'biografia usuario 2','2013-10-24');


/************** DATOS PARA EJERCICIO ONE-TO-MANY ***************/

INSERT INTO articulos(usuario_id, titulo, contenido,fecha_creacion) VALUES(1,'titulo 1','contenido 1','2013-10-24');
INSERT INTO articulos(usuario_id, titulo, contenido,fecha_creacion) VALUES(1,'titulo 2','contenido 2','2013-10-24');
INSERT INTO articulos(usuario_id, titulo, contenido,fecha_creacion) VALUES(1,'titulo 3','contenido 3','2013-10-24');
INSERT INTO articulos(usuario_id, titulo, contenido,fecha_creacion) VALUES(2,'titulo 4','contenido 4','2013-10-24');
INSERT INTO articulos(usuario_id, titulo, contenido,fecha_creacion) VALUES(2,'titulo 5','contenido 5','2013-10-24');

INSERT INTO comentarios(articulo_id,comentario, autor, fecha_creacion) VALUES(1,'mi comentario 1','anonimo A','2013-9-24');
INSERT INTO comentarios(articulo_id,comentario, autor, fecha_creacion) VALUES(1,'mi comentario 2','anonimo B','2013-11-24');
INSERT INTO comentarios(articulo_id,comentario, autor, fecha_creacion) VALUES(1,'mi comentario 3','anonimo C','2013-9-24');
INSERT INTO comentarios(articulo_id,comentario, autor, fecha_creacion) VALUES(2,'mi comentario 4','anonimo A','2013-11-24');
INSERT INTO comentarios(articulo_id,comentario, autor, fecha_creacion) VALUES(2,'mi comentario 5','anonimo B','2013-9-24');
INSERT INTO comentarios(articulo_id,comentario, autor, fecha_creacion) VALUES(3,'mi comentario 6','anonimo A','2013-11-24');

/************** DATOS PARA EJERCICIO MANY-TO-MANY ***************/

INSERT INTO categorias(nombre) VALUES('java');
INSERT INTO categorias(nombre) VALUES('linux');
INSERT INTO categorias(nombre) VALUES('spring');

INSERT INTO categorias_articulos(categoria_id ,articulo_id) VALUES(1,1);
INSERT INTO categorias_articulos(categoria_id ,articulo_id) VALUES(2,1);
INSERT INTO categorias_articulos(categoria_id ,articulo_id) VALUES(3,1);

INSERT INTO categorias_articulos(categoria_id ,articulo_id) VALUES(1,2);
INSERT INTO categorias_articulos(categoria_id ,articulo_id) VALUES(2,2);

INSERT INTO categorias_articulos(categoria_id ,articulo_id) VALUES(2,3);
INSERT INTO categorias_articulos(categoria_id ,articulo_id) VALUES(2,4);
INSERT INTO categorias_articulos(categoria_id ,articulo_id) VALUES(2,5);


