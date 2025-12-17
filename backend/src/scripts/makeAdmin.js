import mongoose from 'mongoose';
import User from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

const makeAdmin = async (email) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');
    
    const user = await User.findOne({ correo: email });
    
    if (!user) {
      console.log('Usuario no encontrado con email:', email);
      process.exit(1);
    }
    
    user.rol = 'admin';
    await user.save();
    
    console.log('Usuario actualizado exitosamente:');
    console.log(`   Email: ${user.correo}`);
    console.log(`   Nombre: ${user.nombre}`);
    console.log(`   Rol: ${user.rol}`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

const email = process.argv[2];

if (!email) {
  console.log('Uso: node src/scripts/makeAdmin.js tu@email.com');
  process.exit(1);
}

makeAdmin(email);