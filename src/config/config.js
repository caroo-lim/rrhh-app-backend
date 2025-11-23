import dotenv from "dotenv";

dotenv.config();

//hay que obtener los datos del archivo .env
//llamo 1 vez al proceos, y cada vez que lo llamo que busque todas las variables que hay aca adentro
//para entrar a un solo lugar, conviene que los datos esten en un solo lugar, en lugar dedistintas carpetas.
//conviene que este todo centralizado, y esto es lo que hace el archivo config.
//centraliza toda tu informacion relevante, sin necesidad, que el usuario sepa.

//Link Api externa
export const DATOSAPI_URL =
	"https://691e2d3bbb52a1db22bd39ef.mockapi.io/api/capacitacionesExternas/CapacitacionesExternas";

//configuracion para JWT ADMIN
export const CONFIG_ADMIN = {
    SECRECT_KEY: 'superClaveSecreta',

    DUMMY_USER_ADMIN: {
        username: 'Admin',
        password: 'Admin123',
    }}	

// Base de datos y servidor	
const {
	MYSQL_DB,
	MYSQL_USER,
	MYSQL_PWD,
	MYSQL_PORT,
	MYSQL_HOST,
	DIALECT,
	SERVER_PORT,
	SERVER_HOST,
} = process.env;

//exporta los mismos elementos que obtiene
export const config = {
	MYSQL_DB,
	MYSQL_USER,
	MYSQL_PWD,
	MYSQL_PORT,
	MYSQL_HOST,
	DIALECT,
	SERVER_PORT,
	SERVER_HOST,
};
