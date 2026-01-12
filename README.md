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
O backend segue Clean/Onion Architecture com 4 camadas bem definidas. Estrutura real do projeto:

- Backend (Node.js + Express)
	- [backend/server.js](backend/server.js)
	- [backend/.env](backend/.env)
	- Camada de Domínio
		- [backend/src/domain/entities/Task.js](backend/src/domain/entities/Task.js)
		- [backend/src/domain/interfaces/ITaskRepository.js](backend/src/domain/interfaces/ITaskRepository.js)
	- Camada de Aplicação
		- Use cases em [backend/src/application/usecases/](backend/src/application/usecases/)
			- `CreateTaskUseCase.js`, `GetAllTasksUseCase.js`, `GetTaskByIdUseCase.js`, `UpdateTaskUseCase.js`, `DeleteTaskUseCase.js`
	- Camada de Infraestrutura
		- [backend/src/infrastructure/database/models/TaskModel.js](backend/src/infrastructure/database/models/TaskModel.js)
		- [backend/src/infrastructure/repositories/TaskRepository.js](backend/src/infrastructure/repositories/TaskRepository.js)
		- [backend/src/infrastructure/factories/TaskFactory.js](backend/src/infrastructure/factories/TaskFactory.js)
	- Camada de Apresentação (HTTP)
		- [backend/src/presentation/controllers/TaskController.js](backend/src/presentation/controllers/TaskController.js)
		- [backend/src/presentation/routes/taskRoutes.js](backend/src/presentation/routes/taskRoutes.js)

- Frontend (React + Vite)
	- [frontend/vite.config.js](frontend/vite.config.js)
	- [frontend/index.html](frontend/index.html)
	- [frontend/src/App.jsx](frontend/src/App.jsx)
	- Componentes em [frontend/src/components/](frontend/src/components/)
		- `TaskForm.jsx`, `TaskList.jsx`, `TaskItem.jsx`
	- Serviços em [frontend/src/services/taskService.js](frontend/src/services/taskService.js)

### Visão em Camadas (Clean/Onion)

```
Presentation (HTTP)  ->  Application (Use Cases)  ->  Domain (Entities)
													 ^                           |
													 |                           v
											Infrastructure (Repository/DB/Factory)
```

### Responsabilidades por Camada

- Presentation: Controla requisições HTTP e respostas
	- Rotas: [backend/src/presentation/routes/taskRoutes.js](backend/src/presentation/routes/taskRoutes.js)
	- Controller: [backend/src/presentation/controllers/TaskController.js](backend/src/presentation/controllers/TaskController.js)
- Application: Orquestra regras de negócio por caso de uso
	- Use Cases: [backend/src/application/usecases/](backend/src/application/usecases)
	- Define validações (ex.: título obrigatório, limite de 255)
- Domain: Núcleo da lógica; independente de I/O
	- Entidade: [backend/src/domain/entities/Task.js](backend/src/domain/entities/Task.js)
	- Contrato de repositório: [backend/src/domain/interfaces/ITaskRepository.js](backend/src/domain/interfaces/ITaskRepository.js)
- Infrastructure: Implementa acesso a dados e integrações
	- Model Mongoose: [backend/src/infrastructure/database/models/TaskModel.js](backend/src/infrastructure/database/models/TaskModel.js)
	- Repositório: [backend/src/infrastructure/repositories/TaskRepository.js](backend/src/infrastructure/repositories/TaskRepository.js)
	- Factory (injeção de dependências): [backend/src/infrastructure/factories/TaskFactory.js](backend/src/infrastructure/factories/TaskFactory.js)

### Fluxo de Dados

- Requisição: UI → `/api/tasks`
- `TaskController` chama o `UseCase`
- `UseCase` usa `ITaskRepository` → implementação em `TaskRepository`
- `TaskRepository` persiste via `TaskModel` (Mongoose)
- Resposta volta ao `Controller` → UI

## Endpoints da API (CRUD)
A API expõe os recursos sob o prefixo `/api`:

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| **GET** | `/api/tasks` | Lista todas as tarefas |
| **POST** | `/api/tasks` | Adiciona uma nova tarefa |
| **GET** | `/api/tasks/:id` | Obtém uma tarefa por ID |
| **PUT** | `/api/tasks/:id` | Atualiza título ou estado `completed` |
| **DELETE** | `/api/tasks/:id` | Remove uma tarefa permanentemente |

## Como Executar o Projeto
Pré-requisitos
- Node.js instalado
- MongoDB Atlas (recomendado) ou MongoDB local

1. Backend
- Crie o ficheiro `.env` em `backend/` com:

```
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<database>?retryWrites=true&w=majority
PORT=3001
NODE_ENV=development
```

- Instale e execute:

```bash
cd backend
npm install
npm run dev
```

2. Frontend
- Proxy já configurado para o backend em `http://localhost:3001`

```bash
cd frontend
npm install
npm run dev
```

3. Teste rápido

```bash
curl http://localhost:3001/api/tasks
```

## Notas de Desenvolvimento
- Tratamento de Erros: Todos os endpoints incluem blocos try/catch para garantir a resiliência da API.
- CORS: Implementado para permitir a comunicação segura entre o frontend e o backend.
- Escalabilidade: A separação clara entre rotas e lógica de negócio permite que o projeto cresça de forma organizada.

Desenvolvido por: Samara Miranda
