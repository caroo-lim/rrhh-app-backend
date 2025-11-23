import jwt from "jsonwebtoken";
import { CONFIG_ADMIN} from '../config/config.js';

export const validateTokenMiddleware = (req, res, next) => {
  // Leer el token del header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.json({
      status: 401,
      OK: false,
      message: 'No se proporciono un token de autorizacion',
    });
    return;
  }  


  const token = authHeader.split(' ')[1]; // Bearer <token>

  console.log(CONFIG_ADMIN.SECRECT_KEY);
  
  try{
    const decoded = jwt.verify(token, CONFIG_ADMIN.SECRECT_KEY);

    req.user = decoded; // Agregar la informacion del usuario al request
   
   
    next();
  } catch (error) {
    res.json({
      status: 401,
      OK: false,
      message: 'Token invalido o expirado',
    });
    return;
  }

}
