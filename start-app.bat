@echo off
echo ===================================================
echo               STARTING STUDY BUDDY
echo ===================================================

:: Navigate to project root folder
cd /d "%~dp0"

:: Check if backend .env file exists
if not exist "backend\.env" (
    echo [WARNING] backend\.env file is missing. Creating one from template...
    copy backend\.env.example backend\.env
    echo [IMPORTANT] Please open backend\.env and add your GEMINI_API_KEY.
)

echo Launching Express backend server...
start cmd /k "cd backend && npm run dev"

echo Launching Vite frontend dev server...
start cmd /k "cd frontend && npm run dev"

echo ---------------------------------------------------
echo Study Buddy is booting!
echo Frontend will be running at http://localhost:5173
echo Backend will be running at http://localhost:5000
echo ---------------------------------------------------
pause
