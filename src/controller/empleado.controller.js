import {
	validateCategory,
	validateName,
} from "../validators/validators.models.js";
import { updateModel } from "../utls/updateModel.util.js";
import { EmpleadoRepository } from "../repository/empleado.repository.js";

export const EmpleadoController = {
	getAllEmpleados: async (request, response) => {
		try {
			const empleados = await EmpleadoRepository.getAll();

			response.json({ empleados });
		} catch (error) {
			console.log("Error, al obtener todos los empleados", error.message);
			response.status(500).json({ error: "error interno del server" });
		}
	},

	getById: async (request, response) => {
		const { id } = request?.params;
		try {
			// aca esta el error
			const empleado = await EmpleadoRepository.getOne(id);

			response.json({
				code: 200,
				ok: true,
				payload: empleado,
			});
		} catch (error) {
			response.status(400).json({
				error: error.message,
			});
		}
	},

	deleteById: async (request, response) => {
		const { id } = request?.params;

		try {
			const empleado = await EmpleadoRepository.getOne(id);

			//console.log(empleado);

			if (!empleado) {
				response.status(422).json({ error: "El empleado no existe" });
				return;
			}

			await EmpleadoRepository.deleteOne(id);

			response.json({
				code: 200,
				ok: true,
				payload: {
					message: `El empleado: ${empleado.nombre} ${empleado.apellido} con DNI: ${empleado.dni} ha sido borrado con éxito`,
				},
			});
		} catch (error) {
			response.status(400).json({ error: error.message });
		}
	},

	createByJson: async (request, response) => {
		try {
			const {
				nombre,
				apellido,
				dni,
				telefono,
				email,
				fechaNacimiento,
				fechaIngreso,
				salarioBase,
				areaId,
				puestoId,
			} = request.body;

			// 1. primera Validacion, que los datos no sean nulos
			if (!nombre || !apellido || !dni) {
				return response.status(422).json({
					message: "Faltan datos obligatorios: nombre, apellido o dni",
				});
			}

			// 2. Valida si el DNI ya existe en la DB
			const dniExiste = await EmpleadoRepository.validarDniExistente(dni);

			if (dniExiste) {
				return response.status(409).json({
					message: `Error!, el DNI ${dni} ya existe en la base de datos.`,
				});
			}

			const empleado = await EmpleadoRepository.createOne({
				nombre,
				apellido,
				dni,
				telefono,
				email,
				fechaNacimiento,
				fechaIngreso,
				salarioBase,
				areaId,
				puestoId,
			});

			console.log("Prueba Franco 1: ", empleado);
			return response.json({
				code: 200,
				ok: true,
				payload: {
					message: `Empleado ${empleado.nombre} ${empleado.apellido} dado de alta con éxito`,
					id: empleado.id,
				},
			});
		} catch (error) {
			console.log("ERROR COMPLETO EN CREATE:", error);
			//console.log("Error al crear empleado:", error.message);
			response.status(500).json({
				error: "Error interno del servidor",
			});
		}
	},

	// // hacer un endpoint que haga una busqueda por el nombre y actualice

	updateByJson: async (request, response) => {
		const empleadoInput = request.body;
		//console.log("Prueba Anna: ",empleadoInput);

		try {
			const empleadoFromDataBase = await EmpleadoRepository.getOne(
				empleadoInput.id,
			);
			console.log("El empleado a actualizar es: ", empleadoFromDataBase);
			if (!empleadoFromDataBase) {
				response
					.status(422)
					.json({ error: `El empleado con ID ${empleado.id} no existe` });
				return;
			}

			const { valid: validName } = validateName(empleadoInput.nombre);
			//const { valid: validCategory } = validateCategory(bookInput.category);

			const validacionGeneral = validName;

			if (!validacionGeneral) {
				response
					.json({
						message: "No esta validado el valor de Nombre",
					})
					.status(422);
				return;
			}

			const updatedData = updateModel(
				{
					nombre: empleadoInput.nombre,
					apellido: empleadoInput.apellido,
					email: empleadoInput.email,
					id: empleadoInput.id,
				},
				empleadoInput,
			);

			console.log({ updatedData });

			await EmpleadoRepository.updateOne(updatedData);

			response.json({
				code: 200,
				ok: true,
				payload: {
					message: `El empleado:  ${updatedData.nombre} ${updatedData.apellido}  fue actualizado exitosamente`,
				},
			});
		} catch (error) {
			response.status(400).json({ error: error.message });
		}
	},
};
