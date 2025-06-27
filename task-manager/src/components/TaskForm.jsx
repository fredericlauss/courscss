import { useState, useEffect } from 'react'
import './TaskForm.css'

const TaskForm = ({ onAddTask, onUpdateTask, editingTask, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Travail',
    priority: 'medium',
    dueDate: ''
  })

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        category: editingTask.category,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate || ''
      })
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'Travail',
        priority: 'medium',
        dueDate: ''
      })
    }
  }, [editingTask])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      alert('Le titre de la tâche est requis')
      return
    }

    if (editingTask) {
      onUpdateTask({
        ...editingTask,
        ...formData
      })
    } else {
      onAddTask(formData)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h3>{editingTask ? 'Modifier la tâche' : 'Ajouter une nouvelle tâche'}</h3>
        {editingTask && (
          <button 
            type="button" 
            className="cancel-btn"
            onClick={onCancelEdit}
          >
            Annuler
          </button>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="title">Titre *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Entrez le titre de la tâche"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Décrivez votre tâche (optionnel)"
          rows="3"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Catégorie</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Travail">Travail</option>
            <option value="Personnel">Personnel</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priorité</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Basse</option>
            <option value="medium">Moyenne</option>
            <option value="high">Haute</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Date limite</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="submit-btn">
        {editingTask ? 'Mettre à jour' : 'Ajouter la tâche'}
      </button>
    </form>
  )
}

export default TaskForm 