import { DataTypes } from "sequelize";
import { sequelize } from "../databases/mysql.cnx.js";

export const EmpleadoModel = sequelize.define(
	"Empleado",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			field: "id",
		},
		dni: {
			type: DataTypes.STRING(20),
			allowNull: false,
		},
		nombre: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		apellido: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(150),
			allowNull: false,
		},
		telefono: {
			type: DataTypes.STRING(30),
			allowNull: true,
		},
		fechaIngreso: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		fechaNacimiento: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		salarioBase: {
			type: DataTypes.DECIMAL(12, 2),
			allowNull: false,
		},
		areaId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		puestoId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		tableName: "empleados",
		timestamps: false,
	},
);
