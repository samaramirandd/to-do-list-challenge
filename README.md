# Full-Stack Challenge: To-Do List
Este projeto foi desenvolvido como parte do desafio técnico para a IT’S Possible Tech. Trata-se de uma aplicação de gestão de tarefas (To-Do List) que utiliza uma arquitetura moderna e escalável, integrando um backend robusto em Node.js com um frontend dinâmico em React.

 Tecnologias Utilizadas
## Backend
- Runtime: Node.js
- Framework: Express.js (Servidor robusto e flexível)
- Base de Dados: MongoDB (Base de dados NoSQL orientada a documentos) 
- ODM: Mongoose (Para modelagem e validação de dados)

## Frontend
- Framework: React com Vite (Para um ambiente de desenvolvimento rápido e eficiente) 
- Linguagem: JavaScript (ES6+) 
- Estilização: CSS3 / Tailwind CSS (Opcional, se decidires usar)

## Arquitetura do Projeto
A estrutura do projeto foi desenhada seguindo os princípios de Separação de Responsabilidades (SoC) e Baixo Acoplamento, facilitando a manutenção futura.
` todo-challenge/
├── backend/
│   ├── models/      # Esquema do MongoDB (Mongoose)
│   ├── routes/      # Definição dos Endpoints RESTful
│   ├── controllers/ # Lógica de negócio (opcional, para maior organização)
│   └── server.js    # Ponto de entrada do servidor
├── frontend/        # Aplicação React
│   ├── src/
│   │   ├── components/ # Componentes reutilizáveis
│   │   └── services/   # Integração com a API do Backend
└── README.md `

## Endpoints da API (CRUD)
A API segue os padrões RESTful, expondo os seguintes recursos:

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| **GET** | `/tasks` | Lista todas as tarefas |
| **POST** | `/tasks` | Adiciona uma nova tarefa |
| **PATCH** | `/tasks/:id` | Alterna o estado de conclusão da tarefa (concluída/pendente) |
| **DELETE** | `/tasks/:id` | Remove uma tarefa permanentemente |

## Como Executar o Projeto
Pré-requisitos
Node.js instalado

Instância do MongoDB (Local ou MongoDB Atlas)

1. Configuração do Backend
Bash
` cd backend
npm install `

# Crie um ficheiro .env com: MONGODB_URI=sua_conexao_aqui
` npm start `

## 2. Configuração do Frontend
Bash
`cd frontend
npm install
npm run dev `

## Notas de Desenvolvimento
- Tratamento de Erros: Todos os endpoints incluem blocos try/catch para garantir a resiliência da API.
- CORS: Implementado para permitir a comunicação segura entre o frontend e o backend.
- Escalabilidade: A separação clara entre rotas e lógica de negócio permite que o projeto cresça de forma organizada.

Desenvolvido por: Samara Miranda
