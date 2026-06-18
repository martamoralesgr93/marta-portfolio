@echo off
cd /d "%~dp0"
echo Liberando git locks...
if exist .git\index.lock del /f /q .git\index.lock
if exist .git\HEAD.lock del /f /q .git\HEAD.lock
echo.
echo Haciendo commit de index.html y caso-2.html...
git add index.html caso-2.html
git commit -m "fix: off-skills card visible + caso-2 meta bugs + legacy CSS cleanup"
echo.
echo Haciendo push a Vercel...
git push origin main
echo.
echo Listo! Vercel desplegara en ~30 segundos.
pause
