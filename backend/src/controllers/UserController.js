import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";

const privateKey = fs.readFileSync("./keys/private.key", "utf8");

const createUser = async (req, res) => {
    try {
          console.log("hola");
        const { nombre, correo, telefono, pais, password } = req.body;

        if (!nombre || !correo || !telefono || !pais || !password) {
            return res.status(400).json({ message: "Los campos son obligatorios" });
        }

        const userExist = await User.findOne({ correo });
        if (userExist) {
            return res.status(400).json({ message: "El correo ya existe" });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            nombre,
            correo,
            telefono,
            pais,
            password: hashpassword
        });

        const token = jwt.sign(
            { userId: newUser._id },
            privateKey,
            { algorithm: "RS256", expiresIn: "2d" }
        );

        res.status(201).json({
            message: "Usuario creado",
            token,
            user: {
                id: newUser._id,
                nombre: newUser.nombre,
                correo: newUser.correo,
                telefono: newUser.telefono,
                pais: newUser.pais,
                createdAt: newUser.createdAt,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Algo ocurrió" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { correo, password } = req.body;

        const user = await User.findOne({ correo });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { userId: user._id },
            privateKey,
            { algorithm: "RS256", expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login exitoso",
            token,
            user: {
                id: user._id,
                nombre: user.nombre,
                correo: user.correo,
                telefono: user.telefono,
                pais: user.pais,
                createdAt: user.createdAt,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Algo ocurrió" });
    }
};

const forgotPasswod = async(req, res) => {
    try{
        const {correo} = req.body;

        const existingUser = User.findOne({correo})

        if(!existingUser){
            res.status(404).json({message: "Usuario no existe"})
            return;
        }
        
        

    }catch(error){
        console.log(error);
        res.status(500).json({message: "algo ocurrio"})
    }

}

export default { createUser, loginUser, forgotPasswod };
