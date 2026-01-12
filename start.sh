#!/bin/bash

# Script para iniciar a aplicação To-Do List
# Uso: ./start.sh

set -e

echo "🚀 Iniciando To-Do List Application..."
echo ""

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Por favor, instale Node.js 16+"
    exit 1
fi

echo -e "${GREEN}✓ Node.js encontrado: $(node --version)${NC}"
echo ""

# Instalar dependências do backend
echo -e "${BLUE}📦 Instalando dependências do backend...${NC}"
cd backend
if [ ! -d "node_modules" ]; then
    npm install
else
    echo "✓ Dependências do backend já instaladas"
fi

# Verificar se .env existe
if [ ! -f ".env" ]; then
    echo -e "${BLUE}📝 Criando arquivo .env${NC}"
    cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/todo-list
PORT=5000
NODE_ENV=development
EOF
    echo "✓ Arquivo .env criado"
else
    echo "✓ Arquivo .env já existe"
fi

cd ..

# Instalar dependências do frontend
echo -e "${BLUE}📦 Instalando dependências do frontend...${NC}"
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
else
    echo "✓ Dependências do frontend já instaladas"
fi
cd ..

echo ""
echo -e "${GREEN}✓ Instalação concluída!${NC}"
echo ""
echo -e "${BLUE}Para iniciar a aplicação, abra dois terminais:${NC}"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd backend"
echo "  npm run dev"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo -e "${GREEN}Frontend: ${BLUE}http://localhost:3000${NC}"
echo -e "${GREEN}Backend: ${BLUE}http://localhost:5000${NC}"
