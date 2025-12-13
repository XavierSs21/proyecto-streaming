import fs from "fs";
import jwt from "jsonwebtoken";

const publicKey = fs.readFileSync("./keys/public.key", "utf8");

export const auth = (req, res, next) => {
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
        next();

    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};
