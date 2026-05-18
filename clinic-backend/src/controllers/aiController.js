const axios = require('axios');
const DiagnosisLog = require('../models/DiagnosisLog');
const Patient = require('../models/Patient');

const getSymptomChecks = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === 'doctor') {
      query = { doctor: req.user.id };
    } else if (req.user.role === 'patient') {
      const patientProfile = await Patient.findOne({ user: req.user.id }).select('_id');
      query = { patient: patientProfile?._id || null };
    } else if (req.user.role === 'receptionist') {
      const receptionistPatients = await Patient.find({ createdBy: req.user.id }).select('_id');
      query = { patient: { $in: receptionistPatients.map((patient) => patient._id) } };
    } else if (req.user.role === 'admin') {
      query = {};
    }

    const logs = await DiagnosisLog.find(query)
      .populate('patient', 'name age gender')
      .populate('doctor', 'name email')
      .sort({ createdAt: -1 });

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const checkSymptoms = async (req, res) => {
  try {
    const { symptoms, age, gender, patientId } = req.body;
    
    const prompt = `
Symptoms: ${symptoms}
Age: ${age}
Gender: ${gender}

Return:
1. Possible condition
2. Risk level (low/medium/high)
3. Suggested tests
4. Lifestyle advice

Format as JSON.
`;

    let aiResponse;
    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent',
        {
          contents: [{ parts: [{ text: prompt }] }]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': process.env.GEMINI_API_KEY
          }
        }
      );
      
      aiResponse = response.data.candidates[0].content.parts[0].text;
    } catch (apiError) {
      aiResponse = JSON.stringify({
        condition: "Unable to determine",
        riskLevel: "low",
        tests: "Consult doctor for proper diagnosis",
        advice: "Monitor symptoms and seek medical attention if needed"
      });
    }

    const log = new DiagnosisLog({
      patient: patientId,
      doctor: req.user.id,
      symptoms,
      aiResponse,
      riskLevel: "low"
    });
    await log.save();

    const savedLog = await DiagnosisLog.findById(log._id)
      .populate('patient', 'name age gender')
      .populate('doctor', 'name email');

    res.json({ result: aiResponse, log: savedLog });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getSymptomChecks, checkSymptoms };
