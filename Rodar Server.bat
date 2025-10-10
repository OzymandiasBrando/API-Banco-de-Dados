@echo off
title Servidor Node - API

cd /d "%~dp0"
cd API

echo.
echo Iniciando servidor...
echo.
node server.js

pause
