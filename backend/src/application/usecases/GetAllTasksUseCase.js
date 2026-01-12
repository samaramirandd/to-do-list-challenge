/**
 * GetAllTasksUseCase - Use case para obter todas as tarefas
 */
class GetAllTasksUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute() {
        const tasks = await this.taskRepository.findAll();
        return tasks;
    }
}

module.exports = GetAllTasksUseCase;
