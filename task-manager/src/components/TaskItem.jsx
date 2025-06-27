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
      year: 'numeric'
    })
  }

  const isOverdue = (dueDate) => {
    if (!dueDate) return false
    const today = new Date()
    const due = new Date(dueDate)
    // Comparer seulement les dates (sans heure)
    return due.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)
  }

  const isDueSoon = (dueDate) => {
    if (!dueDate) return false
    const today = new Date()
    const due = new Date(dueDate)
    const diffInDays = Math.ceil((due.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24))
    return diffInDays > 0 && diffInDays <= 3
  }

  const getDueDateStatus = (dueDate) => {
    if (!dueDate) return null
    if (isOverdue(dueDate)) return 'overdue'
    if (isDueSoon(dueDate)) return 'due-soon'
    return 'normal'
  }

  const dueDateStatus = getDueDateStatus(task.dueDate)

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${dueDateStatus ? `due-${dueDateStatus}` : ''}`}>
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
            <div className="task-badges">
              <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
                {task.priority === 'high' ? 'Haute' : 
                 task.priority === 'medium' ? 'Moyenne' : 'Basse'}
              </span>
              {dueDateStatus && (
                <span className={`due-badge ${dueDateStatus}`}>
                  {dueDateStatus === 'overdue' ? 'En retard' : 
                   dueDateStatus === 'due-soon' ? 'Bientôt due' : 'À temps'}
                </span>
              )}
            </div>
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
          {task.dueDate && (
            <span className={`task-due-date ${dueDateStatus}`}>
              {dueDateStatus === 'overdue' ? 'Échue le ' : 'Due le '}
              {formatDate(task.dueDate)}
            </span>
          )}
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