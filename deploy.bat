@echo off
cd /d "%~dp0"
echo Liberando git locks...
if exist .git\index.lock del /f /q .git\index.lock
if exist .git\HEAD.lock del /f /q .git\HEAD.lock
echo.
echo Haciendo commit de cambios técnicos...
git add -A
git commit -m "fix: consistencia técnica — robots meta, rutas de assets, focus visible y numeración de casos"
echo.
echo Haciendo push a Vercel...
git push origin main
echo.
echo Listo! Vercel desplegara en ~30 segundos.
pause
