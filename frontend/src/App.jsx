import { useState, useEffect } from 'react'
import taskService from './services/taskService'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Carregar tarefas ao montar o componente
  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await taskService.getAll()
      // Backend retorna { success, data: Task[], count }
      setTasks(Array.isArray(response?.data?.data) ? response.data.data : [])
    } catch (err) {
      const msg = err?.response?.data?.message || 'Erro ao carregar tarefas. Verifique se o servidor está rodando.'
      setError(msg)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = async (title) => {
    try {
      setError(null)
      const response = await taskService.create(title)
      // Backend retorna { success, data: Task, message }
      const created = response?.data?.data
      if (created) setTasks([created, ...tasks])
    } catch (err) {
      const msg = err?.response?.data?.message || 'Erro ao adicionar tarefa.'
      setError(msg)
      console.error(err)
    }
  }

  const handleToggleTask = async (id, currentStatus) => {
    try {
      setError(null)
      const response = await taskService.update(id, {
        completed: !currentStatus
      })
      const updated = response?.data?.data
      if (updated) setTasks(tasks.map(task => task.id === id ? updated : task))
    } catch (err) {
      const msg = err?.response?.data?.message || 'Erro ao atualizar tarefa.'
      setError(msg)
      console.error(err)
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      setError(null)
      await taskService.delete(id)
      setTasks(tasks.filter(task => task.id !== id))
    } catch (err) {
      const msg = err?.response?.data?.message || 'Erro ao deletar tarefa.'
      setError(msg)
      console.error(err)
    }
  }

  const completedCount = tasks.filter(t => t.completed).length
  const totalCount = tasks.length

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Minha Lista de Tarefas</h1>
          <p className="subtitle">Organize suas atividades de forma simples e eficaz</p>
        </header>

        {error && (
          <div className="error-banner">
            <span>{error}</span>
            <button className="error-close" onClick={() => setError(null)}>✕</button>
          </div>
        )}

        <TaskForm onAddTask={handleAddTask} />

        {loading ? (
          <div className="loading">A carregar tarefas...</div>
        ) : totalCount === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">✨</div>
            <p>Nenhuma tarefa ainda. Crie uma para começar!</p>
          </div>
        ) : (
          <>
            <div className="stats">
              <div className="stat">
                <span className="stat-number">{totalCount}</span>
                <span className="stat-label">Total</span>
              </div>
              <div className="stat">
                <span className="stat-number">{completedCount}</span>
                <span className="stat-label">Concluídas</span>
              </div>
              <div className="stat">
                <span className="stat-number">{totalCount - completedCount}</span>
                <span className="stat-label">Pendentes</span>
              </div>
            </div>

            <TaskList
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default App
