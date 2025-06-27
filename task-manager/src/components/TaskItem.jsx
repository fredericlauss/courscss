import { ChevronLeft, ChevronRight, Edit, Trash2 } from 'lucide-react'
import './TaskItem.css'

const TaskItem = ({ task, onDelete, onEdit, onMoveTask, currentStatus }) => {
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

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Travail':
        return 'category-work'
      case 'Personnel':
        return 'category-personal'
      case 'Urgent':
        return 'category-urgent'
      default:
        return 'category-work'
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
    
    // Normaliser les dates à minuit pour comparer seulement les jours
    const todayNormalized = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const dueNormalized = new Date(due.getFullYear(), due.getMonth(), due.getDate())
    
    // En retard si la date limite est aujourd'hui ou avant
    return dueNormalized <= todayNormalized
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

  const getMoveButtons = () => {
    const buttons = []
    
    if (currentStatus === 'en-cours') {
      buttons.push(
        <button
          key="move-backlog"
          className="move-btn move-backlog"
          onClick={() => onMoveTask(task.id, 'backlog')}
          title="Retourner au Backlog"
        >
          <ChevronLeft size={16} />
        </button>
      )
    } else if (currentStatus === 'fini') {
      buttons.push(
        <button
          key="move-progress"
          className="move-btn move-progress"
          onClick={() => onMoveTask(task.id, 'en-cours')}
          title="Remettre en cours"
        >
          <ChevronLeft size={16} />
        </button>
      )
    }
    
    if (currentStatus === 'backlog') {
      buttons.push(
        <button
          key="move-progress"
          className="move-btn move-progress"
          onClick={() => onMoveTask(task.id, 'en-cours')}
          title="Commencer la tâche"
        >
          <ChevronRight size={16} />
        </button>
      )
    } else if (currentStatus === 'en-cours') {
      buttons.push(
        <button
          key="move-done"
          className="move-btn move-done"
          onClick={() => onMoveTask(task.id, 'fini')}
          title="Terminer la tâche"
        >
          <ChevronRight size={16} />
        </button>
      )
    }
    
    return buttons
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${dueDateStatus ? `due-${dueDateStatus}` : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <div className="task-title-section">
            <h4 className={`task-title ${task.completed ? 'completed' : ''}`}>
              {task.title}
            </h4>
            <div className="task-badges">
              <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
                {task.priority === 'high' ? 'Haute' : 
                 task.priority === 'medium' ? 'Moyenne' : 'Basse'}
              </span>
              <span className={`category-badge ${getCategoryColor(task.category)}`}>
                {task.category}
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
        <div className="move-actions">
          {getMoveButtons()}
        </div>
        <div className="edit-actions">
          <button
            className="action-btn edit-btn"
            onClick={() => onEdit(task)}
            title="Modifier la tâche"
          >
            <Edit size={16} />
          </button>
          <button
            className="action-btn delete-btn"
            onClick={() => onDelete(task.id)}
            title="Supprimer la tâche"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskItem