require('dotenv').config();
const { Pool } = require('pg');

// Connection pool for the default 'postgres' database
const defaultPool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'postgres', // Connect to default database
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function initializeDatabase() {
  try {
    // Connect to the default database
    const client = await defaultPool.connect();

    try {
      // Check if database exists
      const dbExists = await client.query(`
        SELECT 1 FROM pg_database WHERE datname = $1
      `, [process.env.DB_NAME]);

      // Create database if it doesn't exist
      if (dbExists.rows.length === 0) {
        console.log(`Creating database: ${process.env.DB_NAME}`);
        await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      }

      // Release client back to pool
      client.release();

      // Create a new pool for the weather_app database
      const appPool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
      });

      // Create tables
      const appClient = await appPool.connect();
      try {
        await appClient.query(`
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
      } finally {
        appClient.release();
        await appPool.end();
      }

    } catch (error) {
      console.error('Error during database initialization:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  } finally {
    await defaultPool.end();
  }
}

// Run the initialization
initializeDatabase()
  .then(() => {
    console.log('Database initialization completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Database initialization failed:', error);
    process.exit(1);
  });
