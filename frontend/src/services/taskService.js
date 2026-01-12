import axios from 'axios'

const API_BASE_URL = '/api'

const taskService = {
  /**
   * Cria uma nova tarefa
   */
  create: async (title) => {
    return axios.post(`${API_BASE_URL}/tasks`, { title })
  },

  /**
   * Obtém todas as tarefas
   */
  getAll: async () => {
    return axios.get(`${API_BASE_URL}/tasks`)
  },

  /**
   * Obtém uma tarefa por ID
   */
  getById: async (id) => {
    return axios.get(`${API_BASE_URL}/tasks/${id}`)
  },

  /**
   * Atualiza uma tarefa
   */
  update: async (id, data) => {
    return axios.put(`${API_BASE_URL}/tasks/${id}`, data)
  },

  /**
   * Deleta uma tarefa
   */
  delete: async (id) => {
    return axios.delete(`${API_BASE_URL}/tasks/${id}`)
  }
}

export default taskService
