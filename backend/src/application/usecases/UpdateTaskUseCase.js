const Task = require("../../domain/entities/Task");

/**
 * UpdateTaskUseCase - Use case para atualizar uma tarefa
 */
class UpdateTaskUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute(id, { title, completed }) {
        // Buscar tarefa existente
        const existingTask = await this.taskRepository.findById(id);

        if (!existingTask) {
            throw new Error("Tarefa não encontrada");
        }

        // Criar nova instância da entidade com dados atualizados
        const task = new Task(
            existingTask.id,
            title !== undefined ? title : existingTask.title,
            completed !== undefined ? completed : existingTask.completed,
            existingTask.createdAt,
            new Date()
        );

        // Validar
        if (!task.isValid()) {
            throw new Error("Dados da tarefa inválidos");
        }

        // Atualizar no repositório
        const updatedTask = await this.taskRepository.update(id, task);

        return updatedTask;
    }
}

module.exports = UpdateTaskUseCase;
