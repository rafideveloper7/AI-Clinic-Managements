const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { getAdminStats, getDoctorStats } = require('../controllers/analyticsController');

router.use(auth);

router.get('/admin', roleCheck(['admin']), getAdminStats);
router.get('/doctor', roleCheck(['doctor']), getDoctorStats);

module.exports = router;