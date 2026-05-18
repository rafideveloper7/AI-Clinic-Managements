const Appointment = require('../models/Appointment');

const getAppointments = async (req, res) => {
  try {
    const query = req.user.role === 'doctor'
      ? { doctor: req.user.id }
      : {};
    const appointments = await Appointment.find(query)
      .populate('patient doctor', 'name email')
      .sort({ date: 1, createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAppointmentsByDoctor = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.user.id })
      .populate('patient', 'name age gender phone')
      .populate('doctor', 'name email')
      .sort({ date: 1, createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createAppointment = async (req, res) => {
  try {
    const payload = req.user.role === 'doctor'
      ? { ...req.body, doctor: req.user.id }
      : req.body;
    const appointment = new Appointment(payload);
    await appointment.save();
    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('patient doctor', 'name email phone');
    res.status(201).json(populatedAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('patient doctor', 'name email phone');
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAppointments, getAppointmentsByDoctor, createAppointment, updateAppointment };
