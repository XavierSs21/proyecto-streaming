import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Requiere un titulo'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  director: {
    type: String,
    trim: true
  },
  year: {
    type: Number,
    min: 1800,
    max: new Date().getFullYear() + 5
  },
  duration: {
    type: Number, // Minutos
    min: 1
  },
  genre: [{
    type: String,
    trim: true
  }],
  videoUrl: {
    type: String,
    required: [true, 'La URL del video es requerida']
  },
  thumbnailUrl: {
    type: String
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Índice para búsquedas
movieSchema.index({ title: 'text', director: 'text', description: 'text' });

export default mongoose.model('Movie', movieSchema);