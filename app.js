//el dato del puerto viene del config de la DB

import { config } from "./src/config/config.js";
import { sequelize } from "./src/databases/mysql.cnx.js";
import express from "express";
import server from "./src/server.js";

//const server = express();

const runServer = async () => {
	try {
		await sequelize.authenticate();
		console.log(`Conexión establecida con: ${config.MYSQL_HOST}`);
		server.listen(config.SERVER_PORT, config.SERVER_HOST, () =>
			console.log(
				`server is running at: http://${config.SERVER_HOST}:${config.SERVER_PORT}`,
			),
		);
	} catch (error) {
		console.log(`Error en: ${config.MYSQL_HOST}`, error.message);
	}
};

runServer();
