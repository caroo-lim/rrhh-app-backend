import express from "express";
//import { BookController } from "../controller/book.controller.js";
import { EmpleadoController } from "../controller/empleado.controller.js";

const EmpleadoRouter = express.Router();

//crud

EmpleadoRouter.get("/all", EmpleadoController.getAllEmpleados)
	.get("/select/:id", EmpleadoController.getById)
	.delete("/delete/:id", EmpleadoController.deleteById)
	.post("/create", EmpleadoController.createByJson)
	.patch("/update", EmpleadoController.updateByJson);

export default EmpleadoRouter;
