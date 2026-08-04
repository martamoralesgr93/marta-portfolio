@echo off
cd /d "%~dp0"
echo Eliminando archivos de bloqueo...
del /f /q ".git\refs\heads\main.lock" 2>nul
del /f /q ".git\index.lock" 2>nul
del /f /q ".git\HEAD.lock" 2>nul
echo Anadiendo todos los archivos nuevos...
git add -A
echo Haciendo commit...
git commit -m "Replace skills pills with personal checks — how I work"
echo Haciendo push a GitHub (Vercel se desplegara solo)...
git push origin main
echo.
echo Listo! Vercel desplegara en ~30 segundos.
pause
