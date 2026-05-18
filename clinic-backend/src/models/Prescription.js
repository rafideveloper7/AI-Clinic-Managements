const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicines: [{
    name: String,
    dosage: String,
    duration: String,
    instructions: String
  }],
  instructions: { type: String },
  pdfUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prescription', prescriptionSchema);