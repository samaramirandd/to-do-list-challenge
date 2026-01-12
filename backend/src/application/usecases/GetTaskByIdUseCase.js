/**
 * GetTaskByIdUseCase - Use case para obter uma tarefa por ID
 */
class GetTaskByIdUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute(id) {
        const task = await this.taskRepository.findById(id);

        if (!task) {
            throw new Error("Tarefa não encontrada");
        }

        return task;
    }
}

module.exports = GetTaskByIdUseCase;
