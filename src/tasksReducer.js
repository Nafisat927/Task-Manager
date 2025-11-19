export const taskReducer = (tasks, action) => {
    switch (action.type) {
        case 'set_tasks':
            return action.tasks
        case 'delete_task': {
            const updatedTasks = tasks.filter((task, idx) => action.index !== idx)
            return updatedTasks
        }
        case 'add_task': {
            const newTask = {
                completed: false,
                description: action.description,
            }
            const updatedTasks = [...tasks, newTask]
        return updatedTasks
        }
        case 'update_task_field': {
            const {index, field, value} = action
            const updatedTasks = tasks.map((task, idx) => {
                if (idx == index) {
                    return { ...task, [field]: value }
                }
                return task
            })
            return updatedTasks
        }
    }
}
        

