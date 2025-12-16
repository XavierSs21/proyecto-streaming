import fs from "fs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const publicKey = fs.readFileSync("./keys/public.key", "utf8");

export const adminAuth = async (req, res, next) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
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
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Acceso denegado. Solo administradores" });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};