import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastSection from './components/ForecastSection';
import ChartsSection from './components/ChartsSection';
import AirQualityCard from './components/AirQualityCard';
import BackgroundParticles from './components/BackgroundParticles';
import ComparisonSection from './components/ComparisonSection';
import Footer from './components/Footer';
import WeatherService from './services/WeatherService';
import './App.css';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('light');
  const [comparisonCities, setComparisonCities] = useState([]);
  const [autoTheme, setAutoTheme] = useState(false);

  useEffect(() => {
    // Load theme preferences from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedAutoTheme = localStorage.getItem('autoTheme') === 'true';
    
    setAutoTheme(savedAutoTheme);
    
    if (savedAutoTheme) {
      // Use automatic theme based on time
      const autoThemeValue = getAutoTheme();
      setTheme(autoThemeValue);
      document.documentElement.setAttribute('data-theme', autoThemeValue);
      localStorage.setItem('theme', autoThemeValue);
    } else {
      // Use saved manual theme
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    // Load user's location on first visit
    getCurrentLocation();
  }, []);

  // Auto theme updater - runs every minute when auto theme is enabled
  useEffect(() => {
    let interval;
    
    if (autoTheme) {
      interval = setInterval(() => {
        const autoThemeValue = getAutoTheme();
        if (autoThemeValue !== theme) {
          setTheme(autoThemeValue);
          document.documentElement.setAttribute('data-theme', autoThemeValue);
          localStorage.setItem('theme', autoThemeValue);
          
          // Show notification when theme auto-switches
          const hour = new Date().getHours();
          const message = autoThemeValue === 'light' 
            ? `☀️ Good morning! Switched to light mode (${hour}:00)`
            : `🌙 Good evening! Switched to dark mode (${hour}:00)`;
          
          toast(message, {
            icon: autoThemeValue === 'light' ? '☀️' : '🌙',
            duration: 3000,
          });
        }
      }, 60000); // Check every minute
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoTheme, theme]);

  // Function to determine theme based on time
  const getAutoTheme = () => {
    const now = new Date();
    const hour = now.getHours();
    
    // Light theme from 6 AM to 6 PM, dark theme otherwise
    return (hour >= 6 && hour < 18) ? 'light' : 'dark';
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await fetchWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to default city
          fetchWeatherByCity('New York');
        }
      );
    } else {
      // Fallback to default city
      fetchWeatherByCity('New York');
    }
  };

  const fetchWeatherByCity = async (city) => {
    try {
      setLoading(true);
      setError('');

      // Get city coordinates first
      const locations = await WeatherService.getLocationsByCity(city);
      if (locations.length === 0) {
        throw new Error('City not found');
      }

      const { lat, lon } = locations[0];
      await fetchWeatherByCoordinates(lat, lon);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      setLoading(false);
    }
  };

  const fetchWeatherByCoordinates = async (lat, lon) => {
    try {
      setLoading(true);
      setError('');

      const [weatherData, forecastData, airQualityData] = await Promise.all([
        WeatherService.getCurrentWeatherByCoordinates(lat, lon),
        WeatherService.getForecastByCoordinates(lat, lon),
        WeatherService.getAirQuality(lat, lon)
      ]);

      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setAirQuality(airQualityData);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    if (autoTheme) {
      // If auto theme is on, turn it off and set manual theme
      setAutoTheme(false);
      localStorage.setItem('autoTheme', 'false');
      
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    } else {
      // Normal theme toggle
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  };

  const toggleAutoTheme = () => {
    const newAutoTheme = !autoTheme;
    setAutoTheme(newAutoTheme);
    localStorage.setItem('autoTheme', newAutoTheme.toString());
    
    if (newAutoTheme) {
      // Enable auto theme - set theme based on current time
      const autoThemeValue = getAutoTheme();
      setTheme(autoThemeValue);
      document.documentElement.setAttribute('data-theme', autoThemeValue);
      localStorage.setItem('theme', autoThemeValue);
      
      const hour = new Date().getHours();
      toast.success(`🕒 Auto theme enabled! Currently ${autoThemeValue} mode (${hour}:00)`, {
        duration: 4000,
      });
    } else {
      toast('🎯 Auto theme disabled - Manual control active', {
        icon: '🎮',
        duration: 3000,
      });
    }
  };

  const addCityToComparison = async (cityName) => {
    try {
      if (comparisonCities.length >= 5) {
        throw new Error('Maximum 5 cities allowed for comparison');
      }

      const weatherData = await WeatherService.getCurrentWeatherByCity(cityName);
      
      // Check if city is already in comparison
      if (comparisonCities.find(city => city.id === weatherData.id)) {
        throw new Error('City already in comparison');
      }

      setComparisonCities(prev => [...prev, weatherData]);
    } catch (err) {
      setError(err.message);
    }
  };

  const removeCityFromComparison = (cityId) => {
    setComparisonCities(prev => prev.filter(city => city.id !== cityId));
  };

  return (
    <Router>
      <div className="app">
        <BackgroundParticles />
        
        <Header 
          theme={theme} 
          autoTheme={autoTheme}
          toggleTheme={toggleTheme}
          toggleAutoTheme={toggleAutoTheme}
        />
        
        <SearchBar 
          onSearch={fetchWeatherByCity}
          onLocationClick={getCurrentLocation}
          onAddToComparison={addCityToComparison}
        />

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        )}

        {error && (
          <div className="error fade-in">
            <p>{error}</p>
          </div>
        )}

        {currentWeather && !loading && (
          <div className="weather-grid fade-in">
            <WeatherCard weather={currentWeather} />
            {airQuality && <AirQualityCard airQuality={airQuality} />}
          </div>
        )}

        {forecast && !loading && (
          <ForecastSection forecast={forecast} />
        )}

        {forecast && !loading && (
          <ChartsSection 
            forecast={forecast} 
            currentWeather={currentWeather}
          />
        )}

        {comparisonCities.length > 0 && (
          <ComparisonSection 
            cities={comparisonCities}
            onRemoveCity={removeCityFromComparison}
          />
        )}

        <Footer />

        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
