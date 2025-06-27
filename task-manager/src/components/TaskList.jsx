import TaskItem from './TaskItem'
import './TaskList.css'

const TaskList = ({ tasks, onDelete, onToggleComplete, onEdit }) => {
  if (tasks.length === 0) {
    return (
      <div className="task-list empty">
        <p>Aucune tâche dans cette catégorie</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}

export default TaskList 