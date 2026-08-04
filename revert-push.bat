@echo off
cd /d "%~dp0"
echo Revirtiendo a commit seguro b19ee97...
git push origin main --force
echo.
echo Listo! Vercel desplegara el estado bueno en ~30 segundos.
pause
