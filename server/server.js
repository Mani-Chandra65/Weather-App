const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));

// CORS configuration for Netlify + Render setup
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001', 
    'http://localhost:5173',
    'https://*.netlify.app',
    'https://*.netlify.com',
    /netlify\.app$/,
    /netlify\.com$/
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// API Routes
const WEATHER_API_KEY = process.env.WEATHER_API_KEY || 'your_openweather_api_key_here';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'http://api.openweathermap.org/geo/1.0';
const AIR_POLLUTION_URL = 'http://api.openweathermap.org/data/2.5/air_pollution';

// Health check endpoint for Render
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    service: 'SkyScope Pro Backend',
    timestamp: new Date().toISOString(),
    apiKeyStatus: isValidApiKey(WEATHER_API_KEY) ? 'valid' : 'demo_mode'
  });
});

// Helper function to check if API key is valid
const isValidApiKey = (key) => {
  return key && key !== 'your_openweather_api_key_here' && key !== 'demo_mode_replace_with_real_key';
};

// Demo data for testing without API key
const getDemoWeatherData = (city = 'Demo City') => ({
  name: city,
  sys: { country: 'US', sunrise: 1695795600, sunset: 1695839400 },
  main: { 
    temp: 22, 
    feels_like: 24, 
    humidity: 65, 
    pressure: 1013,
    temp_min: 18,
    temp_max: 26 
  },
  weather: [{ description: 'partly cloudy', icon: '02d' }],
  wind: { speed: 3.5, deg: 180 },
  visibility: 10000,
  dt: Math.floor(Date.now() / 1000),
  id: Math.floor(Math.random() * 1000000)
});

const getDemoForecastData = () => ({
  list: Array.from({ length: 40 }, (_, i) => ({
    dt: Math.floor(Date.now() / 1000) + (i * 3 * 3600),
    main: { 
      temp: 20 + Math.sin(i * 0.1) * 5,
      feels_like: 22 + Math.sin(i * 0.1) * 5,
      humidity: 60 + Math.sin(i * 0.2) * 20,
      pressure: 1013 + Math.sin(i * 0.05) * 10,
      temp_min: 18 + Math.sin(i * 0.1) * 5,
      temp_max: 26 + Math.sin(i * 0.1) * 5
    },
    weather: [{ 
      description: ['sunny', 'cloudy', 'rainy', 'partly cloudy'][Math.floor(Math.random() * 4)],
      icon: ['01d', '02d', '10d', '04d'][Math.floor(Math.random() * 4)]
    }],
    wind: { speed: 2 + Math.random() * 3, deg: Math.random() * 360 }
  }))
});

const getDemoAirQualityData = () => ({
  list: [{
    main: { aqi: Math.floor(Math.random() * 4) + 1 },
    components: {
      co: 200 + Math.random() * 100,
      no: 0.5 + Math.random() * 0.5,
      no2: 20 + Math.random() * 10,
      o3: 60 + Math.random() * 20,
      so2: 5 + Math.random() * 5,
      pm2_5: 15 + Math.random() * 10,
      pm10: 20 + Math.random() * 15,
      nh3: 1 + Math.random() * 2
    }
  }]
});

// Get current weather by city
app.get('/api/weather/current/:city', async (req, res) => {
  try {
    const { city } = req.params;
    
    // Check if API key is valid
    if (!isValidApiKey(WEATHER_API_KEY)) {
      console.log('⚠️  Using demo data - Please add valid API key to .env file');
      return res.json(getDemoWeatherData(city));
    }
    
    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Weather API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      console.log('🔑 API Key Error - Using demo data');
      return res.json(getDemoWeatherData(req.params.city));
    }
    
    res.status(500).json({ 
      error: 'Failed to fetch weather data',
      message: error.response?.data?.message || error.message,
      demo: 'API key invalid - using demo data'
    });
  }
});

// Get current weather by coordinates
app.get('/api/weather/coordinates/:lat/:lon', async (req, res) => {
  try {
    const { lat, lon } = req.params;
    
    // Check if API key is valid
    if (!isValidApiKey(WEATHER_API_KEY)) {
      console.log('⚠️  Using demo data - Please add valid API key to .env file');
      return res.json(getDemoWeatherData('Your Location'));
    }
    
    const response = await axios.get(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Weather API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      console.log('🔑 API Key Error - Using demo data');
      return res.json(getDemoWeatherData('Your Location'));
    }
    
    res.status(500).json({ 
      error: 'Failed to fetch weather data',
      message: error.response?.data?.message || error.message,
      demo: 'API key invalid - using demo data'
    });
  }
});

// Get 5-day forecast
app.get('/api/weather/forecast/:city', async (req, res) => {
  try {
    const { city } = req.params;
    
    // Check if API key is valid
    if (!isValidApiKey(WEATHER_API_KEY)) {
      console.log('⚠️  Using demo forecast data - Please add valid API key to .env file');
      return res.json(getDemoForecastData());
    }
    
    const response = await axios.get(
      `${BASE_URL}/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Forecast API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      console.log('🔑 API Key Error - Using demo forecast data');
      return res.json(getDemoForecastData());
    }
    
    res.status(500).json({ 
      error: 'Failed to fetch forecast data',
      message: error.response?.data?.message || error.message,
      demo: 'API key invalid - using demo data'
    });
  }
});

// Get forecast by coordinates
app.get('/api/weather/forecast/coordinates/:lat/:lon', async (req, res) => {
  try {
    const { lat, lon } = req.params;
    
    // Check if API key is valid
    if (!isValidApiKey(WEATHER_API_KEY)) {
      console.log('⚠️  Using demo forecast data - Please add valid API key to .env file');
      return res.json(getDemoForecastData());
    }
    
    const response = await axios.get(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Forecast API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      console.log('🔑 API Key Error - Using demo forecast data');
      return res.json(getDemoForecastData());
    }
    
    res.status(500).json({ 
      error: 'Failed to fetch forecast data',
      message: error.response?.data?.message || error.message,
      demo: 'API key invalid - using demo data'
    });
  }
});

// Get air quality data
app.get('/api/weather/air-quality/:lat/:lon', async (req, res) => {
  try {
    const { lat, lon } = req.params;
    
    // Check if API key is valid
    if (!isValidApiKey(WEATHER_API_KEY)) {
      console.log('⚠️  Using demo air quality data - Please add valid API key to .env file');
      return res.json(getDemoAirQualityData());
    }
    
    const response = await axios.get(
      `${AIR_POLLUTION_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Air Quality API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      console.log('🔑 API Key Error - Using demo air quality data');
      return res.json(getDemoAirQualityData());
    }
    
    res.status(500).json({ 
      error: 'Failed to fetch air quality data',
      message: error.response?.data?.message || error.message,
      demo: 'API key invalid - using demo data'
    });
  }
});

// Geocoding - get coordinates from city name
app.get('/api/geo/direct/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const response = await axios.get(
      `${GEO_URL}/direct?q=${city}&limit=5&appid=${WEATHER_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch location data',
      message: error.response?.data?.message || error.message 
    });
  }
});

// Reverse geocoding - get city name from coordinates
app.get('/api/geo/reverse/:lat/:lon', async (req, res) => {
  try {
    const { lat, lon } = req.params;
    const response = await axios.get(
      `${GEO_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${WEATHER_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch location data',
      message: error.response?.data?.message || error.message 
    });
  }
});

// Multiple cities comparison
app.post('/api/weather/compare', async (req, res) => {
  try {
    const { cities } = req.body;
    const weatherPromises = cities.map(city =>
      axios.get(`${BASE_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`)
    );
    
    const responses = await Promise.all(weatherPromises);
    const weatherData = responses.map(response => response.data);
    
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch comparison data',
      message: error.message 
    });
  }
});

// API 404 handler for unmatched API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    error: 'API endpoint not found',
    path: req.originalUrl,
    message: 'This API endpoint does not exist'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`� SkyScope Pro Server running on port ${PORT}`);
  console.log(`🔗 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`🚀 Advanced Weather Intelligence & Analytics Platform`);
  
  // Check API key status
  if (!isValidApiKey(WEATHER_API_KEY)) {
    console.log('⚠️  WARNING: No valid API key detected!');
    console.log('📝 Please add your OpenWeatherMap API key to the .env file');
    console.log('🔑 Get your free API key at: https://openweathermap.org/api');
    console.log('🎮 App will run in DEMO MODE with sample data');
  } else {
    console.log('✅ API key detected - Using live weather data');
    console.log('🔑 API Key:', WEATHER_API_KEY.substring(0, 8) + '...');
  }
  
  console.log('---');
});
