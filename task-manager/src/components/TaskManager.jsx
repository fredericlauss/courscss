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
    return tasks.filter(task => task.category === category)
  }

  return (
    <div className="task-manager">
      <header className="task-manager-header">
        <h1>Gestionnaire de Tâches</h1>
        <p>Organisez vos tâches par catégorie</p>
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