import './TaskItem.css'

const TaskItem = ({ task, onDelete, onToggleComplete, onEdit }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high'
      case 'medium':
        return 'priority-medium'
      case 'low':
        return 'priority-low'
      default:
        return 'priority-medium'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
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
        <div className="task-header">
          <div className="task-checkbox">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              id={`task-${task.id}`}
            />
            <label htmlFor={`task-${task.id}`} className="checkbox-label"></label>
          </div>
          
          <div className="task-title-section">
            <h4 className={`task-title ${task.completed ? 'completed' : ''}`}>
              {task.title}
            </h4>
            <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
              {task.priority === 'high' ? 'Haute' : 
               task.priority === 'medium' ? 'Moyenne' : 'Basse'}
            </span>
          </div>
        </div>

        {task.description && (
          <p className={`task-description ${task.completed ? 'completed' : ''}`}>
            {task.description}
          </p>
        )}

        <div className="task-meta">
          <span className="task-date">
            Créée le {formatDate(task.createdAt)}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button
          className="action-btn edit-btn"
          onClick={() => onEdit(task)}
          title="Modifier la tâche"
        >
          ✏️
        </button>
        <button
          className="action-btn delete-btn"
          onClick={() => onDelete(task.id)}
          title="Supprimer la tâche"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

export default TaskItem