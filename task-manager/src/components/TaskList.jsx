import TaskItem from './TaskItem'
import './TaskList.css'

const TaskList = ({ tasks, onDelete, onEdit, onMoveTask, currentStatus }) => {
  if (tasks.length === 0) {
    return (
      <div className="task-list empty">
        <p>Aucune tâche dans cette colonne</p>
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
          onEdit={onEdit}
          onMoveTask={onMoveTask}
          currentStatus={currentStatus}
        />
      ))}
    </div>
  )
}

export default TaskList 