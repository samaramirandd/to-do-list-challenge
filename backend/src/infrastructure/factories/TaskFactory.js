const TaskRepository = require("../repositories/TaskRepository");
const CreateTaskUseCase = require("../../application/usecases/CreateTaskUseCase");
const GetAllTasksUseCase = require("../../application/usecases/GetAllTasksUseCase");
const GetTaskByIdUseCase = require("../../application/usecases/GetTaskByIdUseCase");
const UpdateTaskUseCase = require("../../application/usecases/UpdateTaskUseCase");
const DeleteTaskUseCase = require("../../application/usecases/DeleteTaskUseCase");
const TaskController = require("../../presentation/controllers/TaskController");

/**
 * TaskFactory - Factory para criar instâncias de todas as dependências
 * Implementa o padrão Factory para gerenciar a injeção de dependências
 */
class TaskFactory {
    static makeTaskController() {
        const taskRepository = new TaskRepository();

        const createTaskUseCase = new CreateTaskUseCase(taskRepository);
        const getAllTasksUseCase = new GetAllTasksUseCase(taskRepository);
        const getTaskByIdUseCase = new GetTaskByIdUseCase(taskRepository);
        const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
        const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);

        const taskController = new TaskController(
            createTaskUseCase,
            getAllTasksUseCase,
            getTaskByIdUseCase,
            updateTaskUseCase,
            deleteTaskUseCase
        );

        return taskController;
    }
}

module.exports = TaskFactory;
