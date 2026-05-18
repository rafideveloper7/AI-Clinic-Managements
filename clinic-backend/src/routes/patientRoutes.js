const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { getPatients, getPatient, createPatient, updatePatient, deletePatient } = require('../controllers/patientController');
const { checkAIAccess } = require('../middleware/checkAIAccess');

router.use(auth);

router.get('/', getPatients);
router.get('/:id', getPatient);
router.post('/', roleCheck(['doctor', 'receptionist', 'admin']), createPatient);
router.put('/:id', roleCheck(['doctor', 'receptionist', 'admin']), updatePatient);
router.delete('/:id', roleCheck(['admin']), deletePatient);

router.post('/upload', roleCheck(['doctor', 'receptionist', 'admin']), async (req, res) => {
  const cloudinary = require('../config/cloudinary');
  const multer = require('multer');
  const upload = multer({ storage: multer.memoryStorage() });
  
  upload.single('image')(req, res, async (err) => {
    if (err) return res.status(500).json({ message: 'Upload error' });
    
    try {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'patients' },
          (error, result) => error ? reject(error) : resolve(result)
        ).end(req.file.buffer);
      });
      res.json({ url: result.secure_url });
    } catch (error) {
      res.status(500).json({ message: 'Cloudinary error' });
    }
  });
});

module.exports = router;