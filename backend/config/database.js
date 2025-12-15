import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log(`Mongo conectado! ${conn.connection.host}`);
        console.log(`Base de datos: ${conn.connection.name}`);
    } catch (e) {
        console.log(`error: ${e.message}`);
        process.exit(1);
    }
}

export default connectDB;