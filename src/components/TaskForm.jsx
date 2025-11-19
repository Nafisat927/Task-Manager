import { useEffect, useRef, useState } from 'react'
import { useTaskContext } from './TaskContext'

function TaskForm() {
  // Creates a state to store our description input value
  const [description, setDescription] = useState('')

  const {addTask} = useTaskContext()

  /*
   * The useRef hook allows us to reference a value not needed for rendering
   * It's useful for manipulating the DOM
   * Initialized to null because this is declared before rendering
   * */
  const inputRef = useRef(null)

  useEffect(() => {
    // Focuses the description form input
    inputRef?.current?.focus()
  }, []) // no dependency = on mount, run this logic

  const handleSubmit = (e) => {
    e.preventDefault()

    // addTask is passed as prop from App.jsx to use here
    addTask(description)
    // reset our form input value
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='description'>Description</label>
      <input
        type='text'
        id='description'
        name='description'
        value={description}
        ref={inputRef}
        onChange={(e) => {
          setDescription(e.target.value)
        }}
      />
      <button type='submit'>Add Task</button>
    </form>
  )
}
export default TaskForm
