@echo off
echo 🌤️ SkyScope Pro Setup Script
echo ================================

echo.
echo 📦 Installing root workspace dependencies...
call npm install

echo.
echo 🖥️ Installing server dependencies...
cd server
call npm install
cd ..

echo.
echo ⚛️ Installing client dependencies...
cd client
call npm install
cd ..

echo.
echo ✅ Dependencies installed successfully!
echo.
echo 🔧 Next steps:
echo 1. Get your FREE API key from https://openweathermap.org/api
echo 2. Create/Edit .env file and add: WEATHER_API_KEY=your_api_key_here
echo 3. Run 'npm run dev' to start both server and client
echo.
echo 🚀 Your futuristic weather app will be available at:
echo    Frontend: http://localhost:3000
echo    Backend API: http://localhost:5000
echo.
pause
