import express from 'express';
import { loginAdmin } from '../controller/admin.login.controller.js';

const jwtRouter = express.Router();

jwtRouter.post('/user/login', loginAdmin);

export default jwtRouter;