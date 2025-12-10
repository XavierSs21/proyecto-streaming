
import mongoose from "mongoose" 

const userSchema = new mongoose.Schema({
    nombre: { type: String},
    correo: { type: String, unique: true},
    telefono: {type: String},
    pais: {type: String},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},

})

const User = mongoose.model("User", userSchema);
export default User;
