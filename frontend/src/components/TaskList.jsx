import './TaskList.css'
import TaskItem from './TaskItem'

function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggleTask(task.id, task.completed)}
          onDelete={() => onDeleteTask(task.id)}
        />
      ))}
    </div>
  )
}

export default TaskList
