import fs from "fs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const publicKey = fs.readFileSync("./keys/public.key", "utf8");

export const auth = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No autorizado" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
    });

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Usuario no válido" });
    }

    req.user = user; 
    next();
  } catch (error) {
    console.log("AUTH ERROR:", error);
    return res.status(401).json({ message: "Token inválido" });
  }
};
