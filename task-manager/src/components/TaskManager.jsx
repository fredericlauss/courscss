import { useState, useEffect } from 'react'
import TaskForm from './TaskForm'
import TaskList from './TaskList'
import './TaskManager.css'

const TaskManager = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  const [editingTask, setEditingTask] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
      status: 'backlog', // Nouvelle tâche = backlog
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTasks([...tasks, newTask])
  }

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ))
    setEditingTask(null)
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const moveTask = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus, completed: newStatus === 'fini' }
        : task
    ))
  }

  const startEditing = (task) => {
    setEditingTask(task)
  }

  const cancelEditing = () => {
    setEditingTask(null)
  }

  const getTasksByStatus = (status) => {
    let statusTasks = tasks.filter(task => task.status === status)
    
    statusTasks = statusTasks.sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      
      const dateA = new Date(a.dueDate)
      const dateB = new Date(b.dueDate)
      
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
    })
    
    return statusTasks
  }

  const toggleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const getSortButtonText = () => {
    return sortOrder === 'asc' ? '📅 ↑ Croissant' : '📅 ↓ Décroissant'
  }

  const getSortButtonTitle = () => {
    return sortOrder === 'asc' 
      ? 'Passer au tri décroissant (plus lointain en premier)' 
      : 'Passer au tri croissant (plus proche en premier)'
  }

  return (
    <div className="task-manager">
      <header className="task-manager-header">
        <h1>Gestionnaire de Tâches</h1>
        <p>Organisez vos tâches par statut</p>
        <button 
          className={`sort-btn ${sortOrder === 'asc' ? 'asc' : 'desc'}`}
          onClick={toggleSort}
          title={getSortButtonTitle()}
        >
          {getSortButtonText()}
        </button>
      </header>

      <div className="main-content">
        <div className="form-section">
          <TaskForm 
            onAddTask={addTask}
            onUpdateTask={updateTask}
            editingTask={editingTask}
            onCancelEdit={cancelEditing}
          />
        </div>

        <div className="task-statuses">
          <div className="status-section">
            <h2 className="status-title backlog">Backlog</h2>
            <TaskList 
              tasks={getTasksByStatus('backlog')}
              onDelete={deleteTask}
              onEdit={startEditing}
              onMoveTask={moveTask}
              currentStatus="backlog"
            />
          </div>

          <div className="status-section">
            <h2 className="status-title in-progress">En cours</h2>
            <TaskList 
              tasks={getTasksByStatus('en-cours')}
              onDelete={deleteTask}
              onEdit={startEditing}
              onMoveTask={moveTask}
              currentStatus="en-cours"
            />
          </div>

          <div className="status-section">
            <h2 className="status-title done">Fini</h2>
            <TaskList 
              tasks={getTasksByStatus('fini')}
              onDelete={deleteTask}
              onEdit={startEditing}
              onMoveTask={moveTask}
              currentStatus="fini"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskManager 