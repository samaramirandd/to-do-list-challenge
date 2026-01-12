import './TaskItem.css'

function TaskItem({ task, onToggle, onDelete }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          className="task-checkbox"
          aria-label={`Marcar '${task.title}' como ${task.completed ? 'incompleta' : 'completa'}`}
        />
        <div className="task-text">
          <p className="task-title">{task.title}</p>
          <span className="task-date">{formatDate(task.createdAt)}</span>
        </div>
      </div>
      <button
        onClick={onDelete}
        className="delete-btn"
        aria-label={`Deletar tarefa '${task.title}'`}
        title="Deletar tarefa"
      >
        🗑️
      </button>
    </div>
  )
}

export default TaskItem
