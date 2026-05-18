const Patient = require('../models/Patient');
const User = require('../models/User');

const getDoctorPatientLimit = () => Number(process.env.FREE_DOCTOR_PATIENT_LIMIT || 5);

const getPatients = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === 'admin') {
      query = {};
    } else if (req.user.role === 'patient') {
      query = { user: req.user.id };
    } else {
      query = { createdBy: req.user.id };
    }

    const patients = await Patient.find(query).sort({ createdAt: -1 });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createPatient = async (req, res) => {
  try {
    if (req.user.role === 'doctor') {
      const doctor = await User.findById(req.user.id);
      const patientCount = await Patient.countDocuments({ createdBy: req.user.id });

      if (doctor?.plan !== 'pro' && patientCount >= getDoctorPatientLimit()) {
        return res.status(403).json({
          message: `Free doctor plan limit reached. Upgrade to Pro for unlimited patients.`,
          feature: 'patient_limit',
          limit: getDoctorPatientLimit(),
        });
      }
    }

    const patient = new Patient({
      ...req.body,
      createdBy: req.body.createdBy || req.user.id
    });
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json({ message: 'Patient deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getPatients, getPatient, createPatient, updatePatient, deletePatient };
