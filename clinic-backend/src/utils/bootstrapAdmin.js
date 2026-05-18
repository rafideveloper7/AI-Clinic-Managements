const bcrypt = require('bcryptjs');
const User = require('../models/User');

const bootstrapAdmin = async () => {
  const adminName = process.env.ADMIN_NAME || 'Clinic Admin';
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.log('Admin bootstrap skipped: ADMIN_EMAIL or ADMIN_PASSWORD missing');
    return;
  }

  try {
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      let changed = false;

      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        changed = true;
      }

      if (existingAdmin.name !== adminName) {
        existingAdmin.name = adminName;
        changed = true;
      }

      const passwordMatches = await bcrypt.compare(adminPassword, existingAdmin.password);
      if (!passwordMatches) {
        existingAdmin.password = await bcrypt.hash(adminPassword, 10);
        changed = true;
      }

      if (changed) {
        await existingAdmin.save();
        console.log(`Admin account updated for ${adminEmail}`);
      } else {
        console.log(`Admin account already ready for ${adminEmail}`);
      }

      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await User.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      plan: 'pro',
    });

    console.log(`Admin account created for ${adminEmail}`);
  } catch (error) {
    console.error('Admin bootstrap failed:', error.message);
  }
};

module.exports = bootstrapAdmin;
