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

  const toggleTaskComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const startEditing = (task) => {
    setEditingTask(task)
  }

  const cancelEditing = () => {
    setEditingTask(null)
  }

  const getTasksByCategory = (category) => {
    let categoryTasks = tasks.filter(task => task.category === category)
    
    categoryTasks = categoryTasks.sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      
      const dateA = new Date(a.dueDate)
      const dateB = new Date(b.dueDate)
      
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
    })
    
    return categoryTasks
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
        <p>Organisez vos tâches par catégorie</p>
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

        <div className="task-categories">
          <div className="category-section">
            <h2 className="category-title urgent">Urgent</h2>
            <TaskList 
              tasks={getTasksByCategory('Urgent')}
              onDelete={deleteTask}
              onToggleComplete={toggleTaskComplete}
              onEdit={startEditing}
            />
          </div>

          <div className="category-section">
            <h2 className="category-title work">Travail</h2>
            <TaskList 
              tasks={getTasksByCategory('Travail')}
              onDelete={deleteTask}
              onToggleComplete={toggleTaskComplete}
              onEdit={startEditing}
            />
          </div>

          <div className="category-section">
            <h2 className="category-title personal">Personnel</h2>
            <TaskList 
              tasks={getTasksByCategory('Personnel')}
              onDelete={deleteTask}
              onToggleComplete={toggleTaskComplete}
              onEdit={startEditing}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskManager 