# 🌌 SkyScope Pro - Weather Intelligence Platform

<div align="center">
  <h3>Advanced Weather Intelligence & Analytics Platform</h3>
  <p>Built with React, Node.js, Express & OpenWeatherMap API</p>
  
  ![License](https://img.shields.io/badge/license-MIT-blue.svg)
  ![React](https://img.shields.io/badge/react-18.2.0-blue.svg)
  ![Node.js](https://img.shields.io/badge/node.js-16.0+-green.svg)
  ![Express](https://img.shields.io/badge/express-4.18.2-lightgrey.svg)
</div>

## 🚀 Features

### ✨ **Advanced Weather Intelligence**
- **Real-time Weather Data** - Current conditions, temperature, humidity, pressure
- **5-Day Detailed Forecast** - Hourly predictions with comprehensive metrics
- **Air Quality Monitoring** - AQI with PM2.5, PM10, CO, NO2, O3 components
- **Multi-City Comparison** - Compare up to 5 cities simultaneously
- **GPS Location Detection** - Automatic location-based weather

### 🎨 **Futuristic UI/UX**
- **Glassmorphism Design** - Modern glass-like transparent effects
- **Auto Theme Switching** - Day mode (6AM-6PM) & Night mode (6PM-6AM)
- **Interactive Charts** - Temperature, humidity, pressure trends
- **Responsive Design** - Optimized for mobile, tablet, desktop
- **Smooth Animations** - CSS transitions and hover effects

### 🤖 **Smart Features**
- **Intelligent Notifications** - Real-time feedback and theme changes
- **Error Handling** - Graceful fallbacks with demo mode
- **Data Persistence** - Theme and preferences saved locally
- **Professional Analytics** - Comprehensive weather insights

## 🛠️ Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

### Installation
```bash
# Clone the repository
git clone https://github.com/Mani-Chandra65/Weather-App.git
cd Weather-App

# Install dependencies
npm install
cd client && npm install && cd ..

# Environment setup
echo "WEATHER_API_KEY=your_api_key_here" > .env
```

### Development
```bash
# Start both server and client
npm run dev

# Or start individually
npm run server  # Backend on http://localhost:5000
npm run client  # Frontend on http://localhost:3000
```

### Production Build
```bash
npm run build
npm start
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=5000
WEATHER_API_KEY=your_openweathermap_api_key_here
```

## 📚 API Endpoints

### Weather Data
- `GET /api/weather/current/:city` - Current weather by city
- `GET /api/weather/coordinates/:lat/:lon` - Current weather by coordinates
- `GET /api/weather/forecast/:city` - 5-day forecast by city
- `GET /api/weather/forecast/coordinates/:lat/:lon` - 5-day forecast by coordinates
- `GET /api/weather/air-quality/:lat/:lon` - Air quality data

### Location Services
- `GET /api/geo/direct/:city` - Get coordinates from city name
- `GET /api/geo/reverse/:lat/:lon` - Get city from coordinates
- `POST /api/weather/compare` - Compare multiple cities

## 🎯 Key Features

### Auto Theme Switching
- **Light Mode**: 6:00 AM - 6:00 PM
- **Dark Mode**: 6:00 PM - 6:00 AM
- **Manual Override**: Full control available
- **Smart Notifications**: Theme change alerts

### Weather Analytics
- **Current Conditions**: Temperature, humidity, pressure, wind
- **Forecast Analysis**: 5-day predictions with hourly data
- **Air Quality**: Comprehensive pollution monitoring
- **Visual Charts**: Interactive data visualizations

## 🏗️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **CSS3** - Glassmorphism design system
- **Recharts** - Interactive data visualizations
- **Lucide React** - Beautiful icon library
- **React Router** - Navigation
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Axios** - HTTP client
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers
- **Morgan** - Request logging

## 📱 Responsive Design

- **Mobile First** - Optimized for all screen sizes
- **Tablet Ready** - Perfect tablet experience
- **Desktop Enhanced** - Full-featured desktop layout
- **Touch Friendly** - Mobile gesture support

## 🚀 Deployment

### Vercel/Netlify (Frontend)
```bash
cd client
npm run build
# Deploy the client/dist folder
```

### Heroku (Full Stack)
```bash
git add .
git commit -m "Deploy SkyScope Pro"
git push heroku main
```

### Environment Variables for Production
```env
NODE_ENV=production
WEATHER_API_KEY=your_production_api_key
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Y Mani Chandra Reddy**
- Portfolio: [manichandrareddy.netlify.app](https://manichandrareddy.netlify.app/)
- LinkedIn: [Y Mani Chandra Reddy](https://www.linkedin.com/in/y-mani-chandra-reddy)
- Email: Contact via LinkedIn or Portfolio

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) - Weather data API
- [React](https://reactjs.org/) - Frontend framework
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Recharts](https://recharts.org/) - Data visualization

## 📞 Support

If you have any questions or run into issues:

1. Check the [Issues](https://github.com/yourusername/skyscope-pro/issues) page
2. Create a new issue with detailed information
3. Contact via LinkedIn or portfolio site

---

<div align="center">
  <p><strong>🌌 SkyScope Pro - Where Weather Intelligence Meets Beautiful Design</strong></p>
  <p>Made with ❤️ by Y Mani Chandra Reddy | © 2024 SkyScope Pro</p>
</div>
