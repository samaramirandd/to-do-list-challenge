// Ensure .env overrides any existing env vars (like PORT)
require("dotenv").config({ override: true });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const taskRoutes = require("./src/presentation/routes/taskRoutes");

const app = express();

// Middlewares de CORS e parsing
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5000'],
    credentials: true
}));
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
    res.json({
        message: "🚀 API To-Do List a funcionar",
        version: "1.0.0",
        endpoints: {
            tasks: "/api/tasks"
        }
    });
});

// Conexão com o banco de dados
mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/todo-list")
    .then(() => console.log("✅ MongoDB conectado"))
    .catch(err => console.error("❌ Erro ao conectar MongoDB:", err));

// Ligação de rotas
app.use("/api", taskRoutes);

// Middleware de tratamento de erros global (DEVE estar por último!)
app.use((err, req, res, next) => {
    console.error("Erro:", err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Erro interno do servidor",
        error: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`🚀 Servidor rodando na porta ${PORT}`)
);