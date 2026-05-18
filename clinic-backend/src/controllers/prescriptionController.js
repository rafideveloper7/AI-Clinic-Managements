const Prescription = require('../models/Prescription');
const PDFDocument = require('pdfkit');
const cloudinary = require('../config/cloudinary');
const Patient = require('../models/Patient');

const getPrescriptions = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'doctor') query.doctor = req.user.id;
    if (req.user.role === 'patient') {
      const patientProfile = await Patient.findOne({ user: req.user.id }).select('_id');
      query.patient = patientProfile?._id || null;
    }
    
    const prescriptions = await Prescription.find(query)
      .populate('patient', 'name')
      .populate('doctor', 'name');
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createPrescription = async (req, res) => {
  try {
    const prescription = new Prescription({
      ...req.body,
      doctor: req.user.id
    });
    await prescription.save();
    
    const hydratedPrescription = await Prescription.findById(prescription._id)
      .populate('patient', 'name')
      .populate('doctor', 'name');

    const pdfUrl = await generatePDF(hydratedPrescription);
    prescription.pdfUrl = pdfUrl;
    await prescription.save();
    
    const responsePrescription = await Prescription.findById(prescription._id)
      .populate('patient', 'name')
      .populate('doctor', 'name');

    res.status(201).json(responsePrescription);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const generatePDF = async (prescription) => {
  const doc = new PDFDocument();
  const buffers = [];
  
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});
  
  doc.fontSize(20).text('Prescription', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Patient: ${prescription.patient?.name || 'Patient'}`);
  doc.text(`Doctor: ${prescription.doctor?.name || 'Doctor'}`);
  doc.moveDown();
  doc.text('Medicines:');
  prescription.medicines.forEach((med, i) => {
    doc.text(`${i + 1}. ${med.name} - ${med.dosage}`);
  });
  doc.moveDown();
  doc.text(`Instructions: ${prescription.instructions}`);
  doc.end();
  
  const pdfBuffer = Buffer.concat(buffers);
  
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: 'raw', folder: 'prescriptions' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    ).end(pdfBuffer);
  });
};

module.exports = { getPrescriptions, createPrescription };
