import axios from 'axios';

// Use environment variable for API URL, fallback to proxy path for Netlify
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

class WeatherService {
  async getCurrentWeatherByCity(city) {
    try {
      const response = await axios.get(`${API_BASE_URL}/weather/current/${encodeURIComponent(city)}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
    }
  }

  async getCurrentWeatherByCoordinates(lat, lon) {
    try {
      const response = await axios.get(`${API_BASE_URL}/weather/coordinates/${lat}/${lon}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
    }
  }

  async getForecastByCity(city) {
    try {
      const response = await axios.get(`${API_BASE_URL}/weather/forecast/${encodeURIComponent(city)}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch forecast data');
    }
  }

  async getForecastByCoordinates(lat, lon) {
    try {
      const response = await axios.get(`${API_BASE_URL}/weather/forecast/coordinates/${lat}/${lon}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch forecast data');
    }
  }

  async getAirQuality(lat, lon) {
    try {
      const response = await axios.get(`${API_BASE_URL}/weather/air-quality/${lat}/${lon}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch air quality data');
    }
  }

  async getLocationsByCity(city) {
    try {
      const response = await axios.get(`${API_BASE_URL}/geo/direct/${encodeURIComponent(city)}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch location data');
    }
  }

  async getLocationByCoordinates(lat, lon) {
    try {
      const response = await axios.get(`${API_BASE_URL}/geo/reverse/${lat}/${lon}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch location data');
    }
  }

  async compareCities(cities) {
    try {
      const response = await axios.post(`${API_BASE_URL}/weather/compare`, { cities });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch comparison data');
    }
  }

  getWeatherIconUrl(iconCode, size = '2x') {
    return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
  }

  getAQILevel(aqi) {
    switch (aqi) {
      case 1:
        return { level: 'Good', color: '#00e400', description: 'Air quality is good. Enjoy outdoor activities!' };
      case 2:
        return { level: 'Fair', color: '#ffff00', description: 'Air quality is acceptable for most people.' };
      case 3:
        return { level: 'Moderate', color: '#ff7e00', description: 'Sensitive individuals should limit outdoor activities.' };
      case 4:
        return { level: 'Poor', color: '#ff0000', description: 'Everyone should limit outdoor activities.' };
      case 5:
        return { level: 'Very Poor', color: '#8f3f97', description: 'Health warnings. Everyone should avoid outdoor activities.' };
      default:
        return { level: 'Unknown', color: '#999999', description: 'Air quality data unavailable.' };
    }
  }

  formatDate(timestamp) {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatDateTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getDayName(timestamp) {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'short' });
  }

  kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
  }

  celsiusToFahrenheit(celsius) {
    return Math.round((celsius * 9) / 5 + 32);
  }

  meterPerSecondToKmPerHour(mps) {
    return Math.round(mps * 3.6);
  }

  getWindDirection(degrees) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  }
}

export default new WeatherService();
