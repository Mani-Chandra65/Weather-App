import React from 'react';
import WeatherService from '../services/WeatherService';

const ForecastSection = ({ forecast }) => {
  if (!forecast || !forecast.list) return null;

  // Group forecast by day (take one forecast per day at 12:00 or closest)
  const dailyForecast = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000);
    const dateString = date.toDateString();
    
    if (!acc[dateString] || date.getHours() === 12) {
      acc[dateString] = item;
    }
    
    return acc;
  }, {});

  const forecastDays = Object.values(dailyForecast).slice(0, 5);

  return (
    <div className="forecast-section fade-in">
      <h2 className="forecast-title">5-Day Forecast</h2>
      
      <div className="forecast-grid">
        {forecastDays.map((day, index) => (
          <div key={day.dt} className="forecast-card glass">
            <div className="forecast-day">
              {index === 0 ? 'Today' : WeatherService.getDayName(day.dt)}
            </div>
            
            <img 
              src={WeatherService.getWeatherIconUrl(day.weather[0].icon)} 
              alt={day.weather[0].description}
              className="forecast-icon"
            />
            
            <div className="forecast-temp">
              <span style={{ fontWeight: 'bold' }}>
                {Math.round(day.main.temp)}°
              </span>
              <br />
              <small style={{ opacity: 0.7 }}>
                {Math.round(day.main.temp_min)}° / {Math.round(day.main.temp_max)}°
              </small>
            </div>
            
            <div className="forecast-desc">
              {day.weather[0].description}
            </div>
            
            <div className="forecast-details">
              <small>
                💨 {WeatherService.meterPerSecondToKmPerHour(day.wind.speed)} km/h
              </small>
              <br />
              <small>
                💧 {day.main.humidity}%
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastSection;
