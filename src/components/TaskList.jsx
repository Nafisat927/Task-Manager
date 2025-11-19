import Task from './Task'
import { useTaskContext } from './TaskContext'

// This component specifically renders the list of tasks.
// If there are no tasks, it will render "No tasks to display"

// This also renders how many tasks are in the list.
function TaskList() {
  const {tasks} = useTaskContext()
  return (
    <div>
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <Task
            key={index} // in a map, always pass a unique key value
            {...task}
            index={index}
          />
        ))
      ) : (
        <p>No tasks to display!</p>
      )}

      {tasks.length > 0 && <p>There are {tasks.length} tasks in the list. </p>}
    </div>
  )
}
export default TaskList
