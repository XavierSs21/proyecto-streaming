import fs from "fs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import logger from "../../config/logger.js";

const publicKey = fs.readFileSync("./keys/public.key", "utf8");

export const adminAuth = async (req, res, next) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        // LOG DE SEGURIDAD: Intento de acceso admin sin token
        logger.warn('Intento de acceso a ruta admin sin token', {
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

        req.userId = decoded.userId;

        const user = await User.findById(decoded.userId);
        
        if (!user) {
            // LOG DE SEGURIDAD: Token válido pero usuario no existe (admin)
            logger.warn('Intento de acceso admin con usuario inexistente', {
                requestId: req.requestId,
                userId: decoded.userId,
                ip: req.ip,
                url: req.originalUrl,
            });
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

        if (user.rol !== "admin") {
            // LOG DE SEGURIDAD: Usuario sin permisos de admin
            logger.warn('Intento de acceso admin sin permisos', {
                requestId: req.requestId,
                userId: user._id,
                correo: user.correo,
                rol: user.rol,
                ip: req.ip,
                url: req.originalUrl,
                method: req.method,
            });
            return res.status(403).json({ message: "Acceso denegado. Solo administradores" });
        }

        req.user = user;
        next();

    } catch (error) {
        // LOG DE SEGURIDAD: Token inválido en ruta admin
        logger.warn('Intento de acceso admin con token inválido', {
            requestId: req.requestId,
            ip: req.ip,
            url: req.originalUrl,
            error: error.message,
        });
        return res.status(401).json({ message: "Token inválido" });
    }
};