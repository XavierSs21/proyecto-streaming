
import mongoose from "mongoose" 

const userSchema = new mongoose.Schema({
    nombre: { type: String},
    correo: { type: String, unique: true},
    telefono: {type: String},
    rol: {type: String, enum:['cliente', 'administrador'], default: "cliente"},
    pais: {type: String},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    resetPasswordToken: {type: String},
    resetPasswordExpires: {type: Date},


})

const User = mongoose.model("User", userSchema);
export default User;
