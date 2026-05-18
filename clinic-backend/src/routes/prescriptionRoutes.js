const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { getPrescriptions, createPrescription } = require('../controllers/prescriptionController');

router.use(auth);

router.get('/', getPrescriptions);
router.post('/', roleCheck(['doctor']), createPrescription);

module.exports = router;