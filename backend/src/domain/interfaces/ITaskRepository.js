/**
 * ITaskRepository - Interface (contrato) para operações com Tasks
 * Define quais métodos o repositório deve implementar
 */
class ITaskRepository {
    async create(task) {
        throw new Error("Method 'create' must be implemented");
    }

    async findById(id) {
        throw new Error("Method 'findById' must be implemented");
    }

    async findAll() {
        throw new Error("Method 'findAll' must be implemented");
    }

    async update(id, task) {
        throw new Error("Method 'update' must be implemented");
    }

    async delete(id) {
        throw new Error("Method 'delete' must be implemented");
    }
}

module.exports = ITaskRepository;
