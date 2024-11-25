const express = require('express');
const { pool } = require('../config/database');
const router = express.Router();

// Get latest weather data
router.get('/current', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM weather_data
      ORDER BY timestamp DESC
      LIMIT 2
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching current weather:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get historical weather data
router.get('/historical', async (req, res) => {
  const { days = 7 } = req.query;
  try {
    const result = await pool.query(`
      SELECT * FROM weather_data
      WHERE timestamp >= NOW() - INTERVAL '${days} days'
      ORDER BY timestamp DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching historical weather:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
