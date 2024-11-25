const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const setupDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS weather_data (
        id SERIAL PRIMARY KEY,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        temperature DECIMAL,
        humidity DECIMAL,
        wind_speed DECIMAL,
        precipitation DECIMAL,
        forecast JSON,
        source VARCHAR(50)
      );

      CREATE TABLE IF NOT EXISTS processed_forecasts (
        id SERIAL PRIMARY KEY,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        forecast_data JSON,
        farming_recommendations TEXT[]
      );
    `);
    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
};

module.exports = {
  pool,
  setupDatabase,
};
