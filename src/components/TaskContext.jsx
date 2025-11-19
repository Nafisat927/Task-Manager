import { createContext, useContext } from "react";

export const TaskContext = createContext(undefined)

export const useTaskContext = () => {
    const context = useContext(TaskContext)
    if (!context){
        throw new Error('useTaskContext must be used in a TaskContext Provider')
    }

    return context
}