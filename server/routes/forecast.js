const express = require('express');
const { pool } = require('../config/database');
const router = express.Router();

// Get latest forecast
router.get('/latest', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM processed_forecasts
      ORDER BY timestamp DESC
      LIMIT 1
    `);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching latest forecast:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get farming recommendations
router.get('/recommendations', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT farming_recommendations
      FROM processed_forecasts
      ORDER BY timestamp DESC
      LIMIT 1
    `);
    res.json(result.rows[0]?.farming_recommendations || []);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
