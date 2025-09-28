import React from 'react';
import { Wind } from 'lucide-react';
import WeatherService from '../services/WeatherService';

const AirQualityCard = ({ airQuality }) => {
  if (!airQuality || !airQuality.list || airQuality.list.length === 0) return null;

  const aqi = airQuality.list[0];
  const { level, color, description } = WeatherService.getAQILevel(aqi.main.aqi);
  
  const components = aqi.components;

  return (
    <div className="aqi-card glass fade-in">
      <div className="aqi-title">
        <Wind size={24} style={{ marginRight: '10px' }} />
        Air Quality Index
      </div>
      
      <div className="aqi-value" style={{ color }}>
        {aqi.main.aqi}
      </div>
      
      <div className="aqi-level" style={{ color }}>
        {level}
      </div>
      
      <div className="aqi-description">
        {description}
      </div>

      <div className="aqi-components" style={{ marginTop: '20px' }}>
        <h4 style={{ 
          color: 'var(--text-accent)', 
          marginBottom: '15px',
          textAlign: 'center'
        }}>
          Air Components (μg/m³)
        </h4>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
          gap: '10px'
        }}>
          <div className="component">
            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>CO</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
              {Math.round(components.co)}
            </div>
          </div>
          
          <div className="component">
            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>NO</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
              {Math.round(components.no)}
            </div>
          </div>
          
          <div className="component">
            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>NO₂</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
              {Math.round(components.no2)}
            </div>
          </div>
          
          <div className="component">
            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>O₃</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
              {Math.round(components.o3)}
            </div>
          </div>
          
          <div className="component">
            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>SO₂</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
              {Math.round(components.so2)}
            </div>
          </div>
          
          <div className="component">
            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>PM2.5</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
              {Math.round(components.pm2_5)}
            </div>
          </div>
          
          <div className="component">
            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>PM10</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
              {Math.round(components.pm10)}
            </div>
          </div>
          
          <div className="component">
            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>NH₃</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
              {Math.round(components.nh3)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirQualityCard;
