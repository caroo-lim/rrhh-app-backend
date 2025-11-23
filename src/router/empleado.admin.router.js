import express from 'express';
import { EmpleadoController } from '../controller/empleado.controller.js';
import { validateTokenMiddleware } from '../middleware/auth.middleware.js';


const { getAllEmpleados } = EmpleadoController;
const empleadoAdminRouter = express.Router();

empleadoAdminRouter
  .get('/api/jwtoken/empleados', validateTokenMiddleware, getAllEmpleados);
export default empleadoAdminRouter;