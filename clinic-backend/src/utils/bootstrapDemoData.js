const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Patient = require('../models/Patient');

const ensureUser = async ({ name, email, password, role, plan = 'free' }) => {
  const existing = await User.findOne({ email });
  const hashedPassword = await bcrypt.hash(password, 10);

  if (existing) {
    existing.name = name;
    existing.role = role;
    existing.plan = plan;
    existing.password = hashedPassword;
    await existing.save();
    return existing;
  }

  return User.create({
    name,
    email,
    password: hashedPassword,
    role,
    plan,
  });
};

const ensurePatientProfile = async ({ name, age, gender, phone, address, userId, createdBy }) => {
  const existing = await Patient.findOne({ user: userId });

  if (existing) {
    existing.name = name;
    existing.age = age;
    existing.gender = gender;
    existing.phone = phone;
    existing.address = address;
    existing.createdBy = createdBy;
    await existing.save();
    return existing;
  }

  return Patient.create({
    name,
    age,
    gender,
    phone,
    address,
    user: userId,
    createdBy,
  });
};

const bootstrapDemoData = async () => {
  const enabled = process.env.SEED_DEMO_DATA !== 'false';
  if (!enabled) {
    return;
  }

  try {
    const admin = await User.findOne({ email: process.env.ADMIN_EMAIL });
    const defaultCreator = admin?._id || null;

    const demoDoctorPro = await ensureUser({
      name: 'Dr. Sarah Pro',
      email: process.env.DEMO_DOCTOR_PRO_EMAIL || 'doctor.pro@clinic.com',
      password: process.env.DEMO_DOCTOR_PASSWORD || 'Doctor1234@',
      role: 'doctor',
      plan: 'pro',
    });

    await ensureUser({
      name: 'Dr. Ali Free',
      email: process.env.DEMO_DOCTOR_FREE_EMAIL || 'doctor.free@clinic.com',
      password: process.env.DEMO_DOCTOR_PASSWORD || 'Doctor1234@',
      role: 'doctor',
      plan: 'free',
    });

    await ensureUser({
      name: 'Ayesha Reception',
      email: process.env.DEMO_RECEPTIONIST_EMAIL || 'reception@clinic.com',
      password: process.env.DEMO_RECEPTIONIST_PASSWORD || 'Reception1234@',
      role: 'receptionist',
      plan: 'free',
    });

    await ensureUser({
      name: 'Emma Patient',
      email: process.env.DEMO_PATIENT_EMAIL || 'patient.demo@clinic.com',
      password: process.env.DEMO_PATIENT_PASSWORD || 'Patient1234@',
      role: 'patient',
      plan: 'free',
    }).then(async (patientUser) => {
      await ensurePatientProfile({
        name: 'Emma Patient',
        age: 29,
        gender: 'female',
        phone: '+92 300 1112233',
        address: 'Demo City Center',
        userId: patientUser._id,
        createdBy: demoDoctorPro._id || defaultCreator,
      });
    });

    await ensureUser({
      name: 'Noah Patient',
      email: process.env.DEMO_PATIENT_2_EMAIL || 'patient.second@clinic.com',
      password: process.env.DEMO_PATIENT_PASSWORD || 'Patient1234@',
      role: 'patient',
      plan: 'free',
    }).then(async (patientUser) => {
      await ensurePatientProfile({
        name: 'Noah Patient',
        age: 42,
        gender: 'male',
        phone: '+92 300 4445566',
        address: 'North Clinic Street',
        userId: patientUser._id,
        createdBy: demoDoctorPro._id || defaultCreator,
      });
    });

    console.log('Demo users, receptionist, and patients are ready');
  } catch (error) {
    console.error('Demo data bootstrap failed:', error.message);
  }
};

module.exports = bootstrapDemoData;
