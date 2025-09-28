import React from 'react';
import { Wind, Droplets, Eye, Thermometer, Gauge, Sunrise, Sunset } from 'lucide-react';
import WeatherService from '../services/WeatherService';

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const {
    name,
    sys: { country, sunrise, sunset },
    main: { temp, feels_like, humidity, pressure },
    weather: [{ description, icon }],
    wind: { speed, deg },
    visibility,
    dt
  } = weather;

  return (
    <div className="weather-card glass fade-in">
      <div className="weather-main">
        <div className="weather-location">
          {name}, {country}
        </div>
        <div className="weather-date">
          {WeatherService.formatDate(dt)}
        </div>
        
        <img 
          src={WeatherService.getWeatherIconUrl(icon, '4x')} 
          alt={description}
          className="weather-icon"
        />
        
        <div className="temperature">
          {Math.round(temp)}°C
        </div>
        
        <div className="weather-description">
          {description}
        </div>
        
        <div className="feels-like">
          Feels like {Math.round(feels_like)}°C
        </div>
      </div>

      <div className="weather-details">
        <div className="weather-detail">
          <div className="detail-label">
            <Wind size={16} style={{ marginRight: '5px' }} />
            Wind
          </div>
          <div className="detail-value">
            {WeatherService.meterPerSecondToKmPerHour(speed)} km/h
          </div>
          <div className="detail-extra">
            {WeatherService.getWindDirection(deg)}
          </div>
        </div>

        <div className="weather-detail">
          <div className="detail-label">
            <Droplets size={16} style={{ marginRight: '5px' }} />
            Humidity
          </div>
          <div className="detail-value">
            {humidity}%
          </div>
        </div>

        <div className="weather-detail">
          <div className="detail-label">
            <Gauge size={16} style={{ marginRight: '5px' }} />
            Pressure
          </div>
          <div className="detail-value">
            {pressure} hPa
          </div>
        </div>

        <div className="weather-detail">
          <div className="detail-label">
            <Eye size={16} style={{ marginRight: '5px' }} />
            Visibility
          </div>
          <div className="detail-value">
            {Math.round(visibility / 1000)} km
          </div>
        </div>

        <div className="weather-detail">
          <div className="detail-label">
            <Sunrise size={16} style={{ marginRight: '5px' }} />
            Sunrise
          </div>
          <div className="detail-value">
            {WeatherService.formatTime(sunrise)}
          </div>
        </div>

        <div className="weather-detail">
          <div className="detail-label">
            <Sunset size={16} style={{ marginRight: '5px' }} />
            Sunset
          </div>
          <div className="detail-value">
            {WeatherService.formatTime(sunset)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
