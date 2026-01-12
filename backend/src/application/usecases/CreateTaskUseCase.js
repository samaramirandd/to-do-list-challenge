const Task = require("../../domain/entities/Task");

/**
 * CreateTaskUseCase - Use case para criar uma nova tarefa
 * Contém a lógica de negócio relacionada à criação
 */
class CreateTaskUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute(title) {
        // Validação de entrada
        if (!title || title.trim().length === 0) {
            throw new Error("O título da tarefa é obrigatório");
        }

        if (title.length > 255) {
            throw new Error("O título da tarefa não pode ter mais de 255 caracteres");
        }

        // Criar entidade de domínio
        const task = new Task(null, title.trim());

        // Validar entidade
        if (!task.isValid()) {
            throw new Error("Tarefa inválida");
        }

        // Persistir no repositório
        const createdTask = await this.taskRepository.create(task);

        return createdTask;
    }
}

module.exports = CreateTaskUseCase;
