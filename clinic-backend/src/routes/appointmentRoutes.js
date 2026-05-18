const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { getAppointments, getAppointmentsByDoctor, createAppointment, updateAppointment } = require('../controllers/appointmentController');

router.use(auth);

router.get('/', roleCheck(['doctor', 'receptionist', 'admin']), getAppointments);
router.get('/doctor', roleCheck(['doctor']), getAppointmentsByDoctor);
router.post('/', roleCheck(['doctor', 'receptionist', 'admin']), createAppointment);
router.put('/:id', roleCheck(['doctor', 'admin']), updateAppointment);

module.exports = router;
