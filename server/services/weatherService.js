const axios = require('axios');
const { pool } = require('../config/database');

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const WEATHERAPI_KEY = process.env.WEATHERAPI_KEY;

// Bali, Nigeria coordinates
const LATITUDE = 7.7519;
const LONGITUDE = 11.0703;

const fetchOpenWeatherData = async () => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    return {
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind_speed: response.data.wind.speed,
      precipitation: response.data.rain ? response.data.rain['1h'] : 0,
      source: 'OpenWeather'
    };
  } catch (error) {
    console.error('Error fetching OpenWeather data:', error);
    return null;
  }
};

const fetchWeatherAPIData = async () => {
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${WEATHERAPI_KEY}&q=${LATITUDE},${LONGITUDE}`
    );
    return {
      temperature: response.data.current.temp_c,
      humidity: response.data.current.humidity,
      wind_speed: response.data.current.wind_kph,
      precipitation: response.data.current.precip_mm,
      source: 'WeatherAPI'
    };
  } catch (error) {
    console.error('Error fetching WeatherAPI data:', error);
    return null;
  }
};

const processWeatherData = async (data) => {
  try {
    const query = `
      INSERT INTO weather_data 
      (temperature, humidity, wind_speed, precipitation, source)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    
    const values = [
      data.temperature,
      data.humidity,
      data.wind_speed,
      data.precipitation,
      data.source
    ];

    await pool.query(query, values);
  } catch (error) {
    console.error('Error storing weather data:', error);
  }
};

const initializeWeatherFetch = async () => {
  console.log('Fetching weather data...');
  
  const openWeatherData = await fetchOpenWeatherData();
  const weatherAPIData = await fetchWeatherAPIData();

  if (openWeatherData) {
    await processWeatherData(openWeatherData);
  }
  
  if (weatherAPIData) {
    await processWeatherData(weatherAPIData);
  }
};

module.exports = {
  initializeWeatherFetch,
  fetchOpenWeatherData,
  fetchWeatherAPIData,
};
