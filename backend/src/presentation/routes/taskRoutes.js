const express = require("express");
const TaskFactory = require("../../infrastructure/factories/TaskFactory");

const router = express.Router();

// Criar instância do controller usando o factory
const taskController = TaskFactory.makeTaskController();

/**
 * Rotas da API de Tasks
 */

// POST /api/tasks - Criar nova tarefa
router.post("/tasks", (req, res) => taskController.create(req, res));

// GET /api/tasks - Listar todas as tarefas
router.get("/tasks", (req, res) => taskController.getAll(req, res));

// GET /api/tasks/:id - Obter tarefa por ID
router.get("/tasks/:id", (req, res) => taskController.getById(req, res));

// PUT /api/tasks/:id - Atualizar tarefa
router.put("/tasks/:id", (req, res) => taskController.update(req, res));

// DELETE /api/tasks/:id - Deletar tarefa
router.delete("/tasks/:id", (req, res) => taskController.delete(req, res));

module.exports = router;
