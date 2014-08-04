var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();

function crearBasePruebas() {

	//creamos el archivo base de sqlite para las pruebas
	var db = new sqlite3.Database(__dirname + '/database.db', function(error) {

		if (error) {
			console.error("ERROR:", error);
		} else {
			ejecutarInstruccionesSQL(db);
		}
	});
}

function ejecutarInstruccionesSQL(db) {

	//leemos el archivo original con el sql de sqlite
	fs.readFile(__dirname + '/base-sqlite.sql', 'utf8', function(error, instruccionesSQL) {

		if (error) {
			console.error("ERROR:", error);
		} else {

			// ejecutamos las instrucciones sql contenidas en base.sql
			db.exec(instruccionesSQL, function(error) {
				if (error) {
					console.error("ERROR:", error);
				} else {
					console.info("base de sqlite regenerada");
				}
			});
		}

	});
}

//si existe el archivo database.db borramos dicho archivo (para posteriormente regenerarlo)
fs.unlink(__dirname + "/database.db", function(error) {

	//si hay un error no podemos continuar
	if (error) {
		console.log("ocurrion un error al borrar archivo:" + error);
	} else {
		crearBasePruebas();
	}
});

console.log("regenerando base de sqlite");
