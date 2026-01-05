@echo off
setlocal enabledelayedexpansion

title Bedbug Detector - Complete Setup and Run

echo.
echo ============================================================
echo Bedbug Detector - Complete Setup and Run
echo ============================================================
echo.

set "PROJECT_DIR=%~dp0"
cd /d "%PROJECT_DIR%"

REM ============================================================
REM INSTALL BACKEND
REM ============================================================

echo [1/5] Setting up Backend...
echo.

cd /d "%PROJECT_DIR%backend"

if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
    if errorlevel 1 (
        echo ERROR: Failed to create virtual environment
        pause
        exit /b 1
    )
    echo Virtual environment created
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing Python packages...
pip install --upgrade pip >nul 2>&1
pip install -r requirements.txt >nul 2>&1

if errorlevel 1 (
    echo ERROR: Failed to install backend packages
    pause
    exit /b 1
)

echo Backend setup complete!
echo.

REM ============================================================
REM INSTALL FRONTEND
REM ============================================================

cd /d "%PROJECT_DIR%"

echo [2/5] Setting up Frontend...
echo.

if not exist "node_modules" (
    echo Installing Node packages with pnpm...
    call pnpm install
    
    if errorlevel 1 (
        echo ERROR: Failed to install frontend packages
        pause
        exit /b 1
    )
    echo Frontend packages installed
) else (
    echo Frontend packages already installed
)

echo Frontend setup complete!
echo.

REM ============================================================
REM CHECK MODEL FILE
REM ============================================================

echo [3/5] Checking model file...
echo.

if exist "backend\model\cimex_binary_RGB_V4.keras" (
    echo Model file found: backend\model\cimex_binary_RGB_V4.keras
    echo.
) else (
    echo WARNING: Model file not found!
    echo Expected: backend\model\cimex_binary_RGB_V4.keras
    echo.
    echo The API will start but predictions will fail.
    echo Please copy your model file to the correct location.
    echo.
)

REM ============================================================
REM START BACKEND
REM ============================================================

echo [4/5] Starting Backend Server...
echo.

start "Bedbug Detector - Backend API (port 8000)" cmd /k "cd /d "%PROJECT_DIR%backend" && call venv\Scripts\activate.bat && python app.py"

timeout /t 3 /nobreak

echo Backend started in new window
echo.

REM ============================================================
REM START FRONTEND
REM ============================================================

echo [5/5] Starting Frontend Server...
echo.

start "Bedbug Detector - Frontend (port 3000)" cmd /k "cd /d "%PROJECT_DIR%" && pnpm dev"

timeout /t 3 /nobreak

echo Frontend started in new window
echo.

REM ============================================================
REM OPEN BROWSER
REM ============================================================

echo Opening browser...
timeout /t 2 /nobreak

start http://localhost:3000

echo.
echo ============================================================
echo [✓] Everything is Running!
echo ============================================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo.
echo Two new windows have opened:
echo 1. Backend API Server (port 8000)
echo 2. Frontend Development Server (port 3000)
echo.
echo Keep both windows open while using the application.
echo Close them to stop the servers.
echo.
echo This window will close in 10 seconds...
echo.

timeout /t 10

exit /b 0
