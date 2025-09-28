import React from 'react';
import { X, Thermometer, Droplets, Wind, Gauge, Eye, MapPin } from 'lucide-react';
import WeatherService from '../services/WeatherService';

const ComparisonSection = ({ cities, onRemoveCity }) => {
  if (cities.length === 0) return null;

  const getTemperatureColor = (temp) => {
    if (temp < 0) return '#87CEEB';  // Sky blue for freezing
    if (temp < 10) return '#4A90E2'; // Blue for cold
    if (temp < 20) return '#50C878'; // Green for cool
    if (temp < 30) return '#FFD700'; // Yellow for warm
    if (temp < 40) return '#FF8C00'; // Orange for hot
    return '#FF4500'; // Red for very hot
  };

  const getHighestTemp = () => Math.max(...cities.map(city => city.main.temp));
  const getLowestTemp = () => Math.min(...cities.map(city => city.main.temp));

  return (
    <div className="comparison-container fade-in">
      <div className="comparison-header">
        <h2 className="comparison-title">
          <MapPin size={24} className="comparison-icon" />
          City Weather Comparison
        </h2>
        <div className="comparison-stats">
          <span className="cities-count">
            {cities.length}/5 cities • Compare up to 5 locations
          </span>
        </div>
      </div>
      
      <div className="comparison-grid">
        {cities.map((city) => {
          const isHottest = city.main.temp === getHighestTemp() && cities.length > 1;
          const isColdest = city.main.temp === getLowestTemp() && cities.length > 1;
          
          return (
            <div key={city.id} className={`comparison-card ${isHottest ? 'hottest' : ''} ${isColdest ? 'coldest' : ''}`}>
              <button 
                className="remove-city-btn"
                onClick={() => onRemoveCity(city.id)}
                title="Remove city from comparison"
              >
                <X size={18} />
              </button>
              
              {(isHottest || isColdest) && (
                <div className={`temperature-badge ${isHottest ? 'hottest-badge' : 'coldest-badge'}`}>
                  {isHottest ? '🔥 Hottest' : '❄️ Coldest'}
                </div>
              )}
              
              <div className="city-header">
                <div className="city-name">{city.name}</div>
                <div className="country-code">{city.sys.country}</div>
              </div>
              
              <div className="weather-icon-container">
                <img 
                  src={WeatherService.getWeatherIconUrl(city.weather[0].icon)} 
                  alt={city.weather[0].description}
                  className="weather-icon-large"
                />
              </div>
              
              <div 
                className="temperature-display"
                style={{ color: getTemperatureColor(city.main.temp) }}
              >
                {Math.round(city.main.temp)}°C
              </div>
              
              <div className="weather-description-text">
                {city.weather[0].description}
              </div>
              
              <div className="weather-metrics">
                <div className="metric-row">
                  <div className="metric-item">
                    <Thermometer size={16} className="metric-icon" />
                    <span className="metric-label">Feels like</span>
                    <span className="metric-value">{Math.round(city.main.feels_like)}°C</span>
                  </div>
                  
                  <div className="metric-item">
                    <Droplets size={16} className="metric-icon" />
                    <span className="metric-label">Humidity</span>
                    <span className="metric-value">{city.main.humidity}%</span>
                  </div>
                </div>
                
                <div className="metric-row">
                  <div className="metric-item">
                    <Wind size={16} className="metric-icon" />
                    <span className="metric-label">Wind</span>
                    <span className="metric-value">{WeatherService.meterPerSecondToKmPerHour(city.wind.speed)} km/h</span>
                  </div>
                  
                  <div className="metric-item">
                    <Gauge size={16} className="metric-icon" />
                    <span className="metric-label">Pressure</span>
                    <span className="metric-value">{city.main.pressure} hPa</span>
                  </div>
                </div>
                
                {city.visibility && (
                  <div className="metric-row">
                    <div className="metric-item full-width">
                      <Eye size={16} className="metric-icon" />
                      <span className="metric-label">Visibility</span>
                      <span className="metric-value">{(city.visibility / 1000).toFixed(1)} km</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComparisonSection;
