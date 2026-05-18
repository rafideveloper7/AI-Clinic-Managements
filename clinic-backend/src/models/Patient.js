const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  phone: { type: String },
  address: { type: String },
  image: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  medicalHistory: [{
    condition: String,
    date: Date,
    notes: String
  }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Patient', patientSchema);
