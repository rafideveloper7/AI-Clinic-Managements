const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Patient = require('../models/Patient');

const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }).select('-password');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getReceptionists = async (req, res) => {
  try {
    const receptionists = await User.find({ role: 'receptionist' }).select('-password');
    res.json(receptionists);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createReceptionist = async (req, res) => {
  try {
    const { name, email, password, plan = 'free' } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const receptionist = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'receptionist',
      plan,
    });

    res.status(201).json({
      _id: receptionist._id,
      name: receptionist.name,
      email: receptionist.email,
      role: receptionist.role,
      plan: receptionist.plan,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getPatientsForAdmin = async (req, res) => {
  try {
    const patients = await Patient.find()
      .populate('user', 'email role')
      .populate('createdBy', 'name email role')
      .sort({ createdAt: -1 });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createDoctor = async (req, res) => {
  try {
    const { name, email, password, plan = 'free' } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'doctor',
      plan,
    });

    res.status(201).json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      role: doctor.role,
      plan: doctor.plan,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const { name, email, plan, password } = req.body;
    const doctor = await User.findOne({ _id: req.params.id, role: 'doctor' });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if (email && email !== doctor.email) {
      const existingUser = await User.findOne({ email, _id: { $ne: doctor._id } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      doctor.email = email;
    }

    if (name) doctor.name = name;
    if (plan) doctor.plan = plan;
    if (password) {
      doctor.password = await bcrypt.hash(password, 10);
    }

    await doctor.save();
    const responseDoctor = await User.findById(doctor._id).select('-password');
    res.json(responseDoctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const doctor = await User.findOneAndDelete({ _id: req.params.id, role: 'doctor' });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({ message: 'Doctor deleted', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateReceptionist = async (req, res) => {
  try {
    const { name, email, plan, password } = req.body;
    const receptionist = await User.findOne({ _id: req.params.id, role: 'receptionist' });

    if (!receptionist) {
      return res.status(404).json({ message: 'Receptionist not found' });
    }

    if (email && email !== receptionist.email) {
      const existingUser = await User.findOne({ email, _id: { $ne: receptionist._id } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      receptionist.email = email;
    }

    if (name) receptionist.name = name;
    if (plan) receptionist.plan = plan;
    if (password) {
      receptionist.password = await bcrypt.hash(password, 10);
    }

    await receptionist.save();
    const responseReceptionist = await User.findById(receptionist._id).select('-password');
    res.json(responseReceptionist);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteReceptionist = async (req, res) => {
  try {
    const receptionist = await User.findOneAndDelete({ _id: req.params.id, role: 'receptionist' });

    if (!receptionist) {
      return res.status(404).json({ message: 'Receptionist not found' });
    }

    res.json({ message: 'Receptionist deleted', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createPatientAccount = async (req, res) => {
  try {
    const { name, email, password, age, gender, phone, address, createdBy } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'patient',
      plan: 'free',
    });

    const patient = await Patient.create({
      name,
      age,
      gender,
      phone,
      address,
      user: user._id,
      createdBy: createdBy || req.user.id,
    });

    const responsePatient = await Patient.findById(patient._id)
      .populate('user', 'email role')
      .populate('createdBy', 'name email role');

    res.status(201).json({
      _id: responsePatient._id,
      name: responsePatient.name,
      age: responsePatient.age,
      gender: responsePatient.gender,
      phone: responsePatient.phone,
      address: responsePatient.address,
      user: responsePatient.user,
      createdBy: responsePatient.createdBy,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUserPlan = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { plan: req.body.plan }, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getDoctors,
  getReceptionists,
  getPatientsForAdmin,
  createDoctor,
  createReceptionist,
  updateDoctor,
  updateReceptionist,
  deleteDoctor,
  deleteReceptionist,
  createPatientAccount,
  updateUserPlan,
};
