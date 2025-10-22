import { useEffect, useState } from 'react'
import './App.css'
import { TaskForm, TaskList } from './components'
import axios from 'axios'

function App() {
  // This creates a state to track our list of tasks
  // Initalized to an empty array because we'll populate it with our API.
  const [taskList, setTaskList] = useState([])

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
      setTaskList(data)
    } catch (error) {
      console.error('Something went wrong', error)
      // if something goes wrong, set the task list back to empty
      setTaskList([])
    }
  }

  // deleteTask takes an index and removes the task at that index
  function deleteTask(index) {
    // the filter function returns a new array after applying the \
    // filter condition to every item in the array
    const updatedTasks = taskList.filter((task, idx) => index !== idx)

    // update our state to the new array
    // state immutability: we must always set a state array to a new array
    setTaskList(updatedTasks)
  }

  // addTask adds a task to our array with the description
  function addTask(description) {
    // define a new task object
    const newTask = {
      completed: false, // new tasks are incomplete
      description: description,
    }

    // append this task to the taskList state
    const updatedTasks = [...taskList, newTask] // spread operator copies array

    // update our state
    setTaskList(updatedTasks)
  }

  // updateTaskField is a helper function that updates the task at index
  // it updates the field (either description or completed) to
  // value
  function updateTaskField(index, field, value) {
    // the map function takes an array and applies logic to every item \
    // returning a new item for each item
    const updatedTasks = taskList.map((task, idx) => {
      if (index == idx) {
        return { ...task, [field]: value }
      }
      return task
    })

    // update our state
    setTaskList(updatedTasks)
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
    <>
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={taskList}
        deleteTask={deleteTask}
        updateCompleted={updateCompleted}
        updateDescription={updateDescription}
      />
    </>
  )
}

export default App
