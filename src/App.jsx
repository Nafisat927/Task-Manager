import { useEffect, useReducer } from 'react'
import './App.css'
import { TaskContext, TaskForm, TaskList, taskReducer } from './components'
import axios from 'axios'

function App() {
  // This creates a state to track our list of tasks
  // Initalized to an empty array because we'll populate it with our API.
  const [taskList, dispatch] = useReducer(taskReducer, [])

  useEffect(() => {
    // logic to run on component mount
    getTasks()
  }, []) // Empty dependency array = run on component mount only

  // async means our function will run asynchronously
  async function getTasks() {
    try {
      // await means JS will wait for this to finish before moving on
      const response = await axios.get(
        'https://68ebf9e7eff9ad3b14010278.mockapi.io/api/tasks'
      )

      // destruct data from response
      // same as response.data
      const { data } = response

      // set the value of our state
      dispatch({ type: 'set_tasks', tasks: data })
    } catch (error) {
      console.error('Something went wrong', error)
      // if something goes wrong, set the task list back to empty
      dispatch({ type: 'set_tasks', tasks: [] })
    }
  }

  // deleteTask takes an index and removes the task at that index
  function deleteTask(index) {
    // the filter function returns a new array after applying the \
    // filter condition to every item in the array
  dispatch({ type: 'delete_task', index })
  }

  // addTask adds a task to our array with the description
  function addTask(description) {
      dispatch({ type: 'add_task', description })
  }

  // updateTaskField is a helper function that updates the task at index
  // it updates the field (either description or completed) to
  // value
  function updateTaskField(index, field, value) {
      dispatch({ type: 'update_task_field', index, field, value })
  }

  // updateCompleted updates the completed field of our task
  function updateCompleted(index, completed) {
    updateTaskField(index, 'completed', completed)
  }

  // updateDescription updates the description field of our task
  function updateDescription(index, description) {
    updateTaskField(index, 'description', description)
  }

  // This is the render function: what visually shows in the UI
  return (
    <TaskContext.Provider value = {
      {
        tasks: taskList, addTask, deleteTask, updateCompleted, updateDescription
      }
    }>
      <TaskForm/>
      <TaskList/>
    </TaskContext.Provider>
  )
}

export default App
