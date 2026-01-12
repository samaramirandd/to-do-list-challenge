/**
 * Task Entity - Representa a entidade de Tarefa na camada de domínio
 * Contém a lógica de negócio pura (sem dependências externas)
 */
class Task {
    constructor(id, title, completed = false, createdAt = new Date(), updatedAt = new Date()) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    /**
     * Marca a tarefa como completa
     */
    markAsCompleted() {
        this.completed = true;
        this.updatedAt = new Date();
    }

    /**
     * Marca a tarefa como incompleta
     */
    markAsIncompleted() {
        this.completed = false;
        this.updatedAt = new Date();
    }

    /**
     * Atualiza o título da tarefa
     */
    updateTitle(newTitle) {
        if (!newTitle || newTitle.trim().length === 0) {
            throw new Error("O título da tarefa não pode estar vazio");
        }
        this.title = newTitle;
        this.updatedAt = new Date();
    }

    /**
     * Valida a tarefa
     */
    isValid() {
        return this.title && this.title.trim().length > 0;
    }
}

module.exports = Task;
