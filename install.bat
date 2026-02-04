@echo off
echo ==========================================
echo Wabyte Landing Page - Installation Script
echo ==========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo [OK] Node.js is installed
echo.

echo Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not available.
    pause
    exit /b 1
)

echo [OK] npm is available
echo.

echo Installing dependencies...
echo This may take a few minutes...
echo.

npm install

if %errorlevel% equ 0 (
    echo.
    echo ==========================================
    echo [SUCCESS] Dependencies installed!
    echo ==========================================
    echo.
    echo Next steps:
    echo 1. Run 'npm run dev' to start development server
    echo 2. Open http://localhost:3000 in your browser
    echo 3. See README.md for more information
    echo.
) else (
    echo.
    echo [ERROR] Installation failed.
    echo Please check the error messages above.
    echo.
)

pause
