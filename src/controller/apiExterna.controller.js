import fs from 'fs/promises';
import { DATOSAPI_URL } from '../config/config.js';

export const ApiExternaController = {
    getAllCapacitacionesExternas: async (req, res) => {
        try {
            const apiExterna = DATOSAPI_URL; // leo la url
            if (!apiExterna) {
                return res.status(400).json({
                    status: 400,
                    OK: false,
                    message: 'No se encontró la URL de la API externa',
                });
            }

            const response = await fetch(apiExterna); // espero que la primersa se resuelva y se transforma en un objeto response

            if (!response.ok) {
                return res.status(response.status).json({
                    status: response.status,
                    OK: false,
                    message: 'Error al obtener los datos de la API externa',
                });
            }

            const datos = await response.json();
            await fs.writeFile('./data/capacitaciones.csv', JSON.stringify(datos, null, 2)); // escribo el archivo datos.csv
            console.log('Archivo creado - Api Externa');
            res.status(200).json({
                status: 200,
                OK: true,
                message: datos,
            });
        } catch (error) {
            console.error('Error al obtener los datos de la API externa:', error);
            return res.status(500).json({
                status: 500,
                OK: false,
                message: 'Error interno al obtener los datos de la API externa',
                error: error.message,
            });
        }
    },

    getCapacitacionesExternasByCategoria: async (req, res) => {
        try {
            const { categoria } = req.params; // ejemplo: "Sistemas"

            const apiExterna = DATOSAPI_URL;
            if (!apiExterna) {
                return res.status(400).json({
                    status: 400,
                    OK: false,
                    message: 'No se encontró la URL de la API externa',
                });
            }

            const response = await fetch(apiExterna);

            if (!response.ok) {
                return res.status(response.status).json({
                    status: response.status,
                    OK: false,
                    message: 'Error al obtener los datos de la API externa',
                });
            }

            const datos = await response.json();

            // filtro por categoría 
            const filtradas = datos.filter(
                (c) => c.categoria && c.categoria.toLowerCase() === categoria.toLowerCase()
            );

            //si no existe la categoria
            if (filtradas.length === 0) {
                return res.status(404).json({
                    status: 404,
                    OK: false,
                    message: `No se encontraron capacitaciones para la categoría '${categoria}'`,
                    data: []
                });
            }

            return res.status(200).json({
                status: 200,
                OK: true,
                categoriaBuscada: categoria,
                cantidad: filtradas.length,
                data: filtradas,
            });
        } catch (error) {
            console.error('Error al filtrar las capacitaciones por categoría:', error);
            return res.status(500).json({
                status: 500,
                OK: false,
                message: 'Error interno al filtrar las capacitaciones por categoría',
                error: error.message,
            });
        }
    },





};
