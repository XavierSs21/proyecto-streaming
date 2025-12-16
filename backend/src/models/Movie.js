import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  director: { type: String, trim: true },
  year: { type: Number, min: 1800, max: new Date().getFullYear() + 5 },
  duration: { type: Number, min: 1 },
  genre: {type: String, enum: ['Accion', 'Drama', 'Comedia', 'Terror' , 'Ciencia Ficcion' , 'Romance']}, 
  videoUrl: {type: String, required: [true, 'La URL del video es requerida']},
  thumbnailUrl: {type: String},
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdAt : {type: Date, default: Date.now}
});

movieSchema.index({ title: 'text', director: 'text', description: 'text' });

export default mongoose.model('Movie', movieSchema);
