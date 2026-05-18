require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');
const bootstrapAdmin = require('./src/utils/bootstrapAdmin');
const bootstrapDemoData = require('./src/utils/bootstrapDemoData');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const dbConnected = await connectDB();

  if (dbConnected) {
    await bootstrapAdmin();
    await bootstrapDemoData();
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
