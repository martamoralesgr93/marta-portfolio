@echo off
cd /d "C:\Users\mmora\Desktop\Marta Morales — Product Designer_files"
echo Preparando despliegue...
git add -A
git commit -m "Add English translations for all 4 case studies (data-lang blocks)"
git push
echo.
echo Listo! Abre Vercel para ver el estado del despliegue.
pause
