import { useState } from 'react'
import EditDescription from './EditDescription'

/**
 * This renders a single Task
 * It's purpose is to show the checkbox, the description, and the edit and delete buttons
 * All the logic of the buttons are passed down from App.jsx
 */
function Task({
  description = '',
  completed = false,
  deleteTask,
  index,
  updateCompleted,
  updateDescription,
}) {
  // Create a state to conditionally render the edit input
  const [editing, setEditing] = useState(false)

  // after editing, update the description, and then turn off editing
  const handleEdit = (index, description) => {
    updateDescription(index, description)
    setEditing(false)
  }

  // cancel editing
  const handleCancelEdit = () => {
    setEditing(false)
  }

  // on delete, delete the task and then turn off editing (if there is)
  const handleDelete = () => {
    deleteTask(index)
    setEditing(false)
  }

  return (
    <div
      // The style prop is similar to CSS syntax
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '2px',
        gap: '10px',
      }}
    >
      <input
        type='checkbox'
        checked={completed}
        onChange={(e) => {
          updateCompleted(index, e.target.checked)
        }}
      />
      {editing ? (
        <EditDescription
          index={index}
          description={description}
          onEdit={handleEdit}
          onCancel={handleCancelEdit}
        />
      ) : (
        <span
          style={{
            // optional syntax: if true ? this value : otherwise this value
            textDecoration: completed ? 'line-through' : 'none',
          }}
        >
          {description}
        </span>
      )}
      {!completed && <button onClick={() => setEditing(true)}>Edit</button>}
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default Task
