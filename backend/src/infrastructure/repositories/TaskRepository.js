const ITaskRepository = require("../../domain/interfaces/ITaskRepository");
const Task = require("../../domain/entities/Task");
const TaskModel = require("../database/models/TaskModel");

/**
 * TaskRepository - Implementação concreta do repositório
 * Responsável por conversão entre modelo MongoDB e entidade de domínio
 */
class TaskRepository extends ITaskRepository {
    async create(task) {
        try {
            const taskDocument = new TaskModel({
                title: task.title,
                completed: task.completed
            });

            const savedTask = await taskDocument.save();

            return this._mapToEntity(savedTask);
        } catch (error) {
            // Capturar erros de validação do Mongoose
            if (error.name === 'ValidationError') {
                const messages = Object.values(error.errors)
                    .map(err => err.message)
                    .join(', ');
                throw new Error(messages);
            }
            throw new Error(`Erro ao criar tarefa: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const taskDocument = await TaskModel.findById(id);

            if (!taskDocument) {
                return null;
            }

            return this._mapToEntity(taskDocument);
        } catch (error) {
            throw new Error(`Erro ao buscar tarefa: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const taskDocuments = await TaskModel.find().sort({ createdAt: -1 });

            return taskDocuments.map(doc => this._mapToEntity(doc));
        } catch (error) {
            throw new Error(`Erro ao buscar tarefas: ${error.message}`);
        }
    }

    async update(id, task) {
        try {
            const updateData = {
                title: task.title,
                completed: task.completed
            };

            const updatedTaskDocument = await TaskModel.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true }
            );

            if (!updatedTaskDocument) {
                throw new Error("Tarefa não encontrada");
            }

            return this._mapToEntity(updatedTaskDocument);
        } catch (error) {
            throw new Error(`Erro ao atualizar tarefa: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const deletedTask = await TaskModel.findByIdAndDelete(id);

            if (!deletedTask) {
                throw new Error("Tarefa não encontrada");
            }

            return true;
        } catch (error) {
            throw new Error(`Erro ao deletar tarefa: ${error.message}`);
        }
    }

    /**
     * Converte documento MongoDB em entidade de domínio
     */
    _mapToEntity(taskDocument) {
        return new Task(
            taskDocument._id.toString(),
            taskDocument.title,
            taskDocument.completed,
            taskDocument.createdAt,
            taskDocument.updatedAt
        );
    }
}

module.exports = TaskRepository;
