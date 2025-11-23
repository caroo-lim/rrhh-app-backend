import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.json";

import EmpleadoRouter from "./router/empleado.router.js";
import apiExternaRouter from "./router/api.externa.router.js";
import jwtRouter from './router/admin.token.router.js';
import empleadoAdminRouter from "./router/empleado.admin.router.js";



//inicializamos express
const server = express();
const morgarnModule = morgan(':method :url :status :res[content-length] - :response-time ms');


server.use(express.json());
server.use(morgarnModule); //logging de las peticiones al server

// middleware para api externa
server.use("/api/capacitaciones-externas",apiExternaRouter);

//especifico una ruta y que implemente un router
server.use("/api/empleado", EmpleadoRouter);

// middleraware para login
server.use(jwtRouter)
// middleware de routing solo admin
server.use(empleadoAdminRouter);

//catch-all for error 404
server.use((req, res, next) => {
	res.status(404).send("No está disponible este endpoint: " + req.url);
});

export default server;

server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
