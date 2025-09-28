import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import WeatherService from '../services/WeatherService';

const ChartsSection = ({ forecast, currentWeather }) => {
  if (!forecast || !forecast.list) return null;

  // Prepare data for charts (next 24 hours)
  const hourlyData = forecast.list.slice(0, 8).map(item => ({
    time: WeatherService.formatDateTime(item.dt),
    temperature: Math.round(item.main.temp),
    humidity: item.main.humidity,
    pressure: item.main.pressure,
    windSpeed: WeatherService.meterPerSecondToKmPerHour(item.wind.speed),
    precipitation: item.rain?.['3h'] || item.snow?.['3h'] || 0,
  }));

  return (
    <div className="charts-container fade-in">
      {/* Temperature Chart */}
      <div className="chart-card glass">
        <h3 className="chart-title">24-Hour Temperature Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={hourlyData}>
            <defs>
              <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffd700" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ffd700" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="time" 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
              unit="°C"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '10px',
                color: '#fff'
              }}
            />
            <Area
              type="monotone"
              dataKey="temperature"
              stroke="#ffd700"
              strokeWidth={3}
              fill="url(#temperatureGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Humidity & Pressure Chart */}
      <div className="chart-card glass">
        <h3 className="chart-title">Humidity & Pressure</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="time" 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
            />
            <YAxis 
              yAxisId="humidity"
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
              domain={[0, 100]}
              unit="%"
            />
            <YAxis 
              yAxisId="pressure"
              orientation="right"
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
              unit="hPa"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '10px',
                color: '#fff'
              }}
            />
            <Line
              yAxisId="humidity"
              type="monotone"
              dataKey="humidity"
              stroke="#00e400"
              strokeWidth={2}
              dot={{ fill: '#00e400', strokeWidth: 2, r: 4 }}
            />
            <Line
              yAxisId="pressure"
              type="monotone"
              dataKey="pressure"
              stroke="#ff7e00"
              strokeWidth={2}
              dot={{ fill: '#ff7e00', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Wind Speed & Precipitation */}
      <div className="chart-card glass">
        <h3 className="chart-title">Wind & Precipitation</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="time" 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
            />
            <YAxis 
              yAxisId="wind"
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
              unit=" km/h"
            />
            <YAxis 
              yAxisId="precipitation"
              orientation="right"
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
              unit="mm"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '10px',
                color: '#fff'
              }}
            />
            <Bar
              yAxisId="wind"
              dataKey="windSpeed"
              fill="#64b5f6"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="precipitation"
              dataKey="precipitation"
              fill="#42a5f5"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartsSection;
