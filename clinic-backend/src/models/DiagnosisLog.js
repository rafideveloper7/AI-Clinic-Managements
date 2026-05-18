const mongoose = require('mongoose');

const diagnosisLogSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  symptoms: { type: String, required: true },
  aiResponse: { type: String },
  riskLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DiagnosisLog', diagnosisLogSchema);
