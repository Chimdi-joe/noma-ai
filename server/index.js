require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const cron = require('node-cron');
const { setupDatabase } = require('./config/database');
const weatherRoutes = require('./routes/weather');
const forecastRoutes = require('./routes/forecast');
const { initializeWeatherFetch } = require('./services/weatherService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/forecast', forecastRoutes);

// Initialize database
setupDatabase();

// Schedule weather data fetching (every 3 hours)
cron.schedule('0 */3 * * *', () => {
  initializeWeatherFetch();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
