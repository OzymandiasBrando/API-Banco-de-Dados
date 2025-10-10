REM Ir até a pasta da API
cd /d "%~dp0API"

REM Verifica se o Node.js está instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js nao encontrado neste computador.
    echo Baixando e instalando Node.js automaticamente...
    echo.

    REM Baixar o instalador LTS do Node.js (versao 22.x LTS)
    powershell -Command "Invoke-WebRequest https://nodejs.org/dist/v22.11.0/node-v22.11.0-x64.msi -OutFile node-installer.msi"

    if exist node-installer.msi (
        echo Instalando Node.js... (aguarde alguns minutos)
        msiexec /i node-installer.msi /quiet /norestart
        echo.
        echo Node.js instalado com sucesso!
        del node-installer.msi
    ) else (
        echo Erro ao baixar o instalador do Node.js.
        echo Abra manualmente: https://nodejs.org/en/download/
        pause
        exit /b
    )
)

echo.
echo Verificando versao do Node e npm:
node -v
npm -v

echo.
echo Instalando dependencias...
call npm install

echo.
echo Gerando client do Prisma...
call npx prisma generate


pause
