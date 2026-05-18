const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const {
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
} = require('../controllers/userController');

router.use(auth);

router.get('/doctors', roleCheck(['admin', 'receptionist']), getDoctors);
router.get('/receptionists', roleCheck(['admin']), getReceptionists);
router.get('/patients', roleCheck(['admin']), getPatientsForAdmin);
router.post('/doctors', roleCheck(['admin']), createDoctor);
router.post('/receptionists', roleCheck(['admin']), createReceptionist);
router.put('/doctors/:id', roleCheck(['admin']), updateDoctor);
router.put('/receptionists/:id', roleCheck(['admin']), updateReceptionist);
router.delete('/doctors/:id', roleCheck(['admin']), deleteDoctor);
router.delete('/receptionists/:id', roleCheck(['admin']), deleteReceptionist);
router.post('/patients', roleCheck(['admin']), createPatientAccount);
router.put('/:id/plan', roleCheck(['admin']), updateUserPlan);

module.exports = router;
