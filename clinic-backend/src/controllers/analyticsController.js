const User = require('../models/User');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const DiagnosisLog = require('../models/DiagnosisLog');

const getAdminStats = async (req, res) => {
  try {
    const stats = {
      totalPatients: await Patient.countDocuments(),
      totalDoctors: await User.countDocuments({ role: 'doctor' }),
      totalAppointments: await Appointment.countDocuments(),
      aiUsageCount: await DiagnosisLog.countDocuments()
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getDoctorStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const doctor = await User.findById(req.user.id).select('plan');
    const patientCount = await Patient.countDocuments({ createdBy: req.user.id });
    const patientLimit = doctor?.plan === 'pro'
      ? null
      : Number(process.env.FREE_DOCTOR_PATIENT_LIMIT || 5);
    
    const stats = {
      plan: doctor?.plan || 'free',
      patientLimit,
      aiEnabled: doctor?.plan === 'pro',
      advancedAnalyticsEnabled: doctor?.plan === 'pro',
      todayAppointments: await Appointment.countDocuments({
        doctor: req.user.id,
        date: { $gte: today }
      }),
      prescriptionCount: await (require('../models/Prescription')).countDocuments({ doctor: req.user.id }),
      patientCount
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAdminStats, getDoctorStats };
