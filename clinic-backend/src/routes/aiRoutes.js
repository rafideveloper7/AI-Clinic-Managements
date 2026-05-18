const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checkAIAccess = require('../middleware/checkAIAccess');
const { getSymptomChecks, checkSymptoms } = require('../controllers/aiController');

router.use(auth);

router.get('/history', getSymptomChecks);
router.post('/check', checkAIAccess, checkSymptoms);

module.exports = router;
