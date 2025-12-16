import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import nodemailer from "nodemailer"
import crypto from "crypto";


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
                rol: newUser.rol,
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
                rol: user.rol,
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

const forgotPassword = async(req, res) => {
    try{
        const {correo} = req.body;

        const user = await User.findOne({correo})

        if(!user){
            res.status(404).json({message: "Usuario no existe"})
            return;
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");


        user.resetPasswordExpires = Date.now() + 1000 * 60 * 15;
        await user.save();

        const resetUrl = process.env.FRONTEND_URL + `/reset-password/${resetToken}`;

        const transporter = nodemailer.createTransport({service: "gmail", auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }})

        await transporter.sendMail({
            from: '"IndieStream" <no-reply@indiestream.com>',
            to: user.correo,
            subject: "Recuperar contrasena",
            html: `
                <h2>Recuperar contraseña</h2>
                <p>Haz clic en el enlace para cambiar tu contraseña:</p>
                <a href="${resetUrl}">${resetUrl}</a>
                <p>Este enlace expira en 15 minutos.</p>
            `,
                    
            })
                
            res.json({ message: "Correo de recuperación enviado" });
        

    }catch(error){
        console.log(error);
        res.status(500).json({message: "no se pudo enviar el correo"})
    }

}

const resetPassword = async(req, res) => {
    try{
        const {token} = req.params;
        const {password} = req.body;

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
        return res.status(400).json({ message: "Token inválido o expirado" });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.json({ message: "Contraseña actualizada correctamente" });


    }catch(error){
        console.log(error);
        res.status(500).json({message: "algo ocurrio"})
    }
}

const getCurrentUser = async(req, res) => {
    try{
         const currentuser = await User.findById({ _id: req.user._id});
        if(!currentuser){
            res.status(404).json({message: "User not found"});
            return
        }
        res.json(currentuser);

    }catch(error){
        console.log(error);
        res.status(500).json({message: "Error fetching user"});
    }
}

export default { 
    createUser, 
    loginUser, 
    forgotPassword,
    resetPassword,
    getCurrentUser,
 };
