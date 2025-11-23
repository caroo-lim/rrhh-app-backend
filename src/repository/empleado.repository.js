import { EmpleadoModel } from "../model/empleado.model.js";

export const EmpleadoRepository = {
	getAll: async () => {
		return await EmpleadoModel.findAll();
	},

	getOne: async (id) => {
		const user = await EmpleadoModel.findOne({ where: { id } });
		return user.dataValues;
	},

	deleteOne: async (id) => {
		return await EmpleadoModel.destroy({ where: { id } });
	},

	updateOne: async ({ nombre, apellido, id, email }) => {
		return await EmpleadoModel.update(
			{
				nombre,
				apellido,
				email,
			},
			{ where: { id } },
		);
	},

	validarDniExistente: async (dni) => {
		const empleado = await EmpleadoModel.findOne({ where: { dni } });
		return empleado !== null;
	},

	createOne: async ({
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
	}) => {
		return await EmpleadoModel.create({
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
	},
};
