const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/patients', require('./routes/patientRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/prescriptions', require('./routes/prescriptionRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

app.get('/', (req, res) => {
  res.json({ message: 'Clinic API is running', status: 'ok' });
});

module.exports = app;
