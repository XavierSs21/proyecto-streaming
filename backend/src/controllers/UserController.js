import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import nodemailer from "nodemailer"
import crypto from "crypto";

// Importar logger
import logger from "../../config/logger.js";

const privateKey = fs.readFileSync("./keys/private.key", "utf8");

const createUser = async (req, res) => {
    try {
        const { nombre, correo, telefono, pais, password } = req.body;

        if (!nombre || !correo || !telefono || !pais || !password) {
            logger.warn('Intento de registro con campos faltantes', {
                requestId: req.requestId,
                ip: req.ip,
                correo: correo || 'no proporcionado'
            });
            return res.status(400).json({ message: "Los campos son obligatorios" });
        }

        const userExist = await User.findOne({ correo });
        if (userExist) {
            // LOG DE SEGURIDAD: Intento de registro con correo duplicado
            logger.warn('Intento de registro con correo ya existente', {
                requestId: req.requestId,
                correo,
                ip: req.ip,
                userAgent: req.get('user-agent'),
            });
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

        // LOG DE SEGURIDAD: Usuario registrado exitosamente
        logger.info('Usuario registrado exitosamente', {
            requestId: req.requestId,
            userId: newUser._id,
            correo: newUser.correo,
            nombre: newUser.nombre,
            ip: req.ip,
        });

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
        logger.error('Error al crear usuario', {
            requestId: req.requestId,
            error: error.message,
            stack: error.stack,
            ip: req.ip,
        });
        res.status(500).json({ message: "Algo ocurrió" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { correo, password } = req.body;

        const user = await User.findOne({ correo });
        if (!user) {
            // LOG DE SEGURIDAD: Intento de login con correo inexistente
            logger.warn('Intento de login con correo inexistente', {
                requestId: req.requestId,
                correo,
                ip: req.ip,
                userAgent: req.get('user-agent'),
            });
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            // LOG DE SEGURIDAD: Intento de login con contraseña incorrecta
            logger.warn('Intento de login con contraseña incorrecta', {
                requestId: req.requestId,
                userId: user._id,
                correo,
                ip: req.ip,
                userAgent: req.get('user-agent'),
            });
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { userId: user._id },
            privateKey,
            { algorithm: "RS256", expiresIn: "7d" }
        );

        // LOG DE SEGURIDAD: Login exitoso
        logger.info('Login exitoso', {
            requestId: req.requestId,
            userId: user._id,
            correo: user.correo,
            nombre: user.nombre,
            rol: user.rol,
            ip: req.ip,
        });

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
        logger.error('Error en login', {
            requestId: req.requestId,
            error: error.message,
            stack: error.stack,
            ip: req.ip,
        });
        res.status(500).json({ message: "Algo ocurrió" });
    }
};

const forgotPassword = async(req, res) => {
    try{
        const {correo} = req.body;

        const user = await User.findOne({correo})

        if(!user){
            // LOG DE SEGURIDAD: Intento de recuperación con correo inexistente
            logger.warn('Intento de recuperación de contraseña con correo inexistente', {
                requestId: req.requestId,
                correo,
                ip: req.ip,
            });
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

        // LOG DE SEGURIDAD: Solicitud de recuperación de contraseña
        logger.info('Solicitud de recuperación de contraseña', {
            requestId: req.requestId,
            userId: user._id,
            correo: user.correo,
            ip: req.ip,
        });
                
        res.json({ message: "Correo de recuperación enviado" });

    }catch(error){
        logger.error('Error al enviar correo de recuperación', {
            requestId: req.requestId,
            error: error.message,
            ip: req.ip,
        });
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
            // LOG DE SEGURIDAD: Intento de reset con token inválido/expirado
            logger.warn('Intento de reset de contraseña con token inválido', {
                requestId: req.requestId,
                ip: req.ip,
            });
            return res.status(400).json({ message: "Token inválido o expirado" });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        // LOG DE SEGURIDAD: Contraseña reseteada exitosamente
        logger.info('Contraseña reseteada exitosamente', {
            requestId: req.requestId,
            userId: user._id,
            correo: user.correo,
            ip: req.ip,
        });

        res.json({ message: "Contraseña actualizada correctamente" });

    }catch(error){
        logger.error('Error al resetear contraseña', {
            requestId: req.requestId,
            error: error.message,
            ip: req.ip,
        });
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
        logger.error('Error al obtener usuario actual', {
            requestId: req.requestId,
            error: error.message,
            userId: req.user?._id,
        });
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