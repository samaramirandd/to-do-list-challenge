/**
 * TaskController - Controlador que recebe requisições HTTP
 * Responsável por traduzir requisições em chamadas aos use cases
 */
class TaskController {
    constructor(
        createTaskUseCase,
        getAllTasksUseCase,
        getTaskByIdUseCase,
        updateTaskUseCase,
        deleteTaskUseCase
    ) {
        this.createTaskUseCase = createTaskUseCase;
        this.getAllTasksUseCase = getAllTasksUseCase;
        this.getTaskByIdUseCase = getTaskByIdUseCase;
        this.updateTaskUseCase = updateTaskUseCase;
        this.deleteTaskUseCase = deleteTaskUseCase;
    }

    async create(req, res) {
        try {
            const { title } = req.body;

            const task = await this.createTaskUseCase.execute(title);

            return res.status(201).json({
                success: true,
                data: task,
                message: "Tarefa criada com sucesso"
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async getAll(req, res) {
        try {
            const tasks = await this.getAllTasksUseCase.execute();

            return res.status(200).json({
                success: true,
                data: tasks,
                count: tasks.length
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;

            const task = await this.getTaskByIdUseCase.execute(id);

            return res.status(200).json({
                success: true,
                data: task
            });
        } catch (error) {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const task = await this.updateTaskUseCase.execute(id, updateData);

            return res.status(200).json({
                success: true,
                data: task,
                message: "Tarefa atualizada com sucesso"
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            await this.deleteTaskUseCase.execute(id);

            return res.status(200).json({
                success: true,
                message: "Tarefa deletada com sucesso"
            });
        } catch (error) {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = TaskController;
