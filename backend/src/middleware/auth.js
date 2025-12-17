import fs from "fs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import logger from "../../config/logger.js";

const publicKey = fs.readFileSync("./keys/public.key", "utf8");

export const auth = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    // LOG DE SEGURIDAD: Intento de acceso sin token
    logger.warn('Intento de acceso sin token de autenticación', {
      requestId: req.requestId,
      ip: req.ip,
      url: req.originalUrl,
      method: req.method,
    });
    return res.status(401).json({ message: "No autorizado" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
    });

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      // LOG DE SEGURIDAD: Token válido pero usuario no existe
      logger.warn('Token válido pero usuario no encontrado', {
        requestId: req.requestId,
        userId: decoded.userId,
        ip: req.ip,
        url: req.originalUrl,
      });
      return res.status(401).json({ message: "Usuario no válido" });
    }

    req.user = user; 
    next();
  } catch (error) {
    // LOG DE SEGURIDAD: Token inválido o expirado
    logger.warn('Intento de acceso con token inválido', {
      requestId: req.requestId,
      ip: req.ip,
      url: req.originalUrl,
      method: req.method,
      error: error.message,
    });
    return res.status(401).json({ message: "Token inválido" });
  }
};