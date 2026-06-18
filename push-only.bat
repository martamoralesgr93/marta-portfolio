@echo off
cd /d "%~dp0"
echo Pushing to GitHub/Vercel...
git push origin main
echo.
echo Done! Check vercel.app in ~30 seconds.
pause
