import { useState } from 'react'

/**
 * This component specifically renders the edit description form
 * This is conditionally shown when we click Edit on a Task
 */
function EditDescription({ index, description, onEdit, onCancel }) {
  // Creates a state to manage our input value
  const [descriptionField, setDescriptionField] = useState(description)

  const handleSubmit = (e) => {
    e.preventDefault()
    onEdit(index, descriptionField)
  }

  const handleCancel = (e) => {
    // If we press escape while in the input, cancel editing
    if (e.key === 'Escape') {
      onCancel()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        id={`edit-description-${index}`}
        placeholder='Enter description'
        value={descriptionField}
        onChange={(e) => setDescriptionField(e.target.value)}
        onKeyDown={handleCancel}
      />
    </form>
  )
}
export default EditDescription
