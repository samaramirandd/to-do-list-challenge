import { useState } from 'react'
import './TaskForm.css'

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim()) {
      alert('Por favor, digite uma tarefa')
      return
    }

    try {
      setIsSubmitting(true)
      await onAddTask(title)
      setTitle('')
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Adicione uma nova tarefa..."
          disabled={isSubmitting}
          className="task-input"
          maxLength={255}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-btn"
        >
          Adicionar
        </button>
      </div>
      {title.length > 0 && (
        <div className="char-count">
          {title.length}/255 caracteres
        </div>
      )}
    </form>
  )
}

export default TaskForm
