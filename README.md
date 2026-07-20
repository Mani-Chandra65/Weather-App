# SkyScope Pro - Weather Analytics Platform

SkyScope Pro is a full-stack web application that provides real-time weather details, multi-city comparisons, and forecast analytics. The platform features a modern user interface and a secure backend service that handles weather API integrations.

## Core Features

- **Real-Time Weather Metrics**: Displays temperature, humidity, atmospheric pressure, wind details, and visibility.
- **Five-Day Forecast**: Shows hourly weather predictions and atmospheric changes over five days.
- **Air Quality Monitoring**: Measures the Air Quality Index (AQI) along with pollutant levels (PM2.5, PM10, CO, NO2, O3).
- **Multi-City Comparison**: Allows users to select and compare weather metrics for up to five different cities at the same time.
- **Location Detection**: Uses the device GPS to fetch local weather details automatically.
- **Dynamic Layout Theme**: Switches automatically between day and night modes based on the local time, with manual control.
- **Data Visualizations**: Offers interactive charts for temperature, humidity, and pressure trends.
- **Demo Mode**: Includes simulated fallback data if the API service is unavailable or if the API key is missing.

## Tech Stack

### Frontend
- **React 18**: User interface library.
- **Vite**: Build tool and local development server.
- **CSS**: Glassmorphism-style design with responsive layout support.
- **Recharts**: Data visualization library for interactive weather charts.
- **Lucide React**: Vector icons library.
- **React Router**: Client-side routing.
- **React Hot Toast**: User notifications.

### Backend
- **Node.js**: Server environment.
- **Express.js**: Backend framework for routing.
- **Axios**: HTTP client for API requests.
- **Helmet**: Middleware to configure secure HTTP headers.
- **Compression**: Gzip compression middleware to reduce response sizes.
- **Morgan**: HTTP request logging middleware.

---

## Directory Structure

- [client](file:///home/mani/Desktop/Temp/Weather-App/client): React application files.
  - [src/components](file:///home/mani/Desktop/Temp/Weather-App/client/src/components): Reusable user interface components.
  - [src/services](file:///home/mani/Desktop/Temp/Weather-App/client/src/services): Frontend services including [WeatherService.js](file:///home/mani/Desktop/Temp/Weather-App/client/src/services/WeatherService.js) for backend communication.
- [server](file:///home/mani/Desktop/Temp/Weather-App/server): Node.js Express server.
  - [server.js](file:///home/mani/Desktop/Temp/Weather-App/server/server.js): Server configuration, routing, and integration with the OpenWeatherMap API.
- [setup.sh](file:///home/mani/Desktop/Temp/Weather-App/setup.sh): Installation script for Linux/macOS systems.
- [setup.bat](file:///home/mani/Desktop/Temp/Weather-App/setup.bat): Installation script for Windows systems.

---

## Quick Start

### Prerequisites
- Node.js version 16.0.0 or higher.
- npm (Node Package Manager) or yarn.
- An OpenWeatherMap API key (available from [openweathermap.org](https://openweathermap.org/api)).

### Setup Steps

1. Clone this repository:
   ```bash
   git clone https://github.com/Mani-Chandra65/Weather-App.git
   cd Weather-App
   ```

2. Run the setup script to install all dependencies for both client and server:
   - For Linux/macOS:
     ```bash
     chmod +x setup.sh
     ./setup.sh
     ```
   - For Windows:
     ```cmd
     setup.bat
     ```

3. Configure environment variables. Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=5000
   WEATHER_API_KEY=your_openweathermap_api_key_here
   ```

### Running the Application

To run both the server and client concurrently in development mode, run:
```bash
npm run dev
```

Alternatively, you can run them individually:
- Start backend server on `http://localhost:5000`:
  ```bash
  npm run server:dev
  ```
- Start frontend dev server on `http://localhost:5173`:
  ```bash
  npm run client:dev
  ```

### Production Build

1. Build the frontend assets:
   ```bash
   npm run build
   ```
2. Start the production backend server:
   ```bash
   npm run start
   ```

---

## API Documentation

The backend service acts as a proxy for the OpenWeatherMap API.

### Health Check
- `GET /api/health`: Verifies the backend server status and API key validity.

### Weather Data
- `GET /api/weather/current/:city`: Returns current weather metrics for the specified city.
- `GET /api/weather/coordinates/:lat/:lon`: Returns current weather metrics for the specified geographic coordinates.
- `GET /api/weather/forecast/:city`: Returns 5-day forecast metrics (3-hour intervals) for the specified city.
- `GET /api/weather/forecast/coordinates/:lat/:lon`: Returns 5-day forecast metrics for the specified coordinates.
- `GET /api/weather/air-quality/:lat/:lon`: Returns air pollution and gas concentration metrics.

### Location Services
- `GET /api/geo/direct/:city`: Resolves city names to geographic coordinates.
- `GET /api/geo/reverse/:lat/:lon`: Resolves geographic coordinates to city names.
- `POST /api/weather/compare`: Expects a list of city names in the request body to retrieve compared metrics.

---

## Deployment

### Frontend (Netlify / Vercel)
The project includes a [netlify.toml](file:///home/mani/Desktop/Temp/Weather-App/netlify.toml) configuration file. Build command:
```bash
cd client && npm install && npm run build
```
Publish directory: `client/dist`

### Backend (Render / Heroku)
The project includes a [render.yaml](file:///home/mani/Desktop/Temp/Weather-App/render.yaml) file for one-click or automated deployment on Render.
- Build Command: `cd server && npm install`
- Start Command: `cd server && npm start`
- Set the `WEATHER_API_KEY` environment variable in the dashboard.

---

## Contributing

1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your modifications:
   ```bash
   git commit -m "Describe your changes"
   ```
4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License.

---

## Support and Contact

For questions, issues, or feedback:
- View open issues or report a bug on the repository issue tracker.
- Contact the developer via email at manichandra842@gmail.com or via [LinkedIn](https://www.linkedin.com/in/y-mani-chandra-reddy).
