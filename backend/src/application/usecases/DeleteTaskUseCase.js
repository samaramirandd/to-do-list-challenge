/**
 * DeleteTaskUseCase - Use case para deletar uma tarefa
 */
class DeleteTaskUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute(id) {
        // Buscar tarefa
        const task = await this.taskRepository.findById(id);

        if (!task) {
            throw new Error("Tarefa não encontrada");
        }

        // Deletar do repositório
        await this.taskRepository.delete(id);

        return { message: "Tarefa deletada com sucesso" };
    }
}

module.exports = DeleteTaskUseCase;
