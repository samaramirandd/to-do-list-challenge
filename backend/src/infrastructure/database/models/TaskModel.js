const mongoose = require("mongoose");

/**
 * TaskModel - Schema MongoDB para persistência
 * Diferente da entidade de domínio, este é específico do banco de dados
 */
const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "O título é obrigatório"],
            minlength: [1, "O título não pode estar vazio"],
            maxlength: [255, "O título não pode ter mais de 255 caracteres"],
            trim: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true // Adiciona createdAt e updatedAt automaticamente
    }
);

module.exports = mongoose.model("Task", taskSchema);
