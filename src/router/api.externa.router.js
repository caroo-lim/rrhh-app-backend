import express from 'express';
import { ApiExternaController } from '../controller/apiExterna.controller.js';


//desestructuro los metodos del controlador
const { getAllCapacitacionesExternas, getCapacitacionesExternasByCategoria } = ApiExternaController;
//instancia del router
const apiExternaRouter = express.Router();

//registro las rutas
apiExternaRouter.get('/', getAllCapacitacionesExternas);
apiExternaRouter.get('/:categoria', getCapacitacionesExternasByCategoria);

//exporto el router
export default apiExternaRouter;