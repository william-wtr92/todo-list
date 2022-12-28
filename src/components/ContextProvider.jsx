import {
  createContext,
  useCallback,
  useContext as useNativeContext,
  useState,
} from "react"

const initialTasks = [
  {
    id: 1,
    title: "Item1",
    valid: false
  },
]

export const Context = createContext()

export const useContext = () => useNativeContext(Context)

const ContextProvider = (props) => {
  const [nextId, setNextId] = useState(2)
  const [tasks, setTasks] = useState(initialTasks)

  const getNextId = useCallback(() => {
    setNextId(nextId + 1)

    return nextId
  }, [nextId])

  const createTask = useCallback(
    (task) => {
      setTasks((tasks) => [
        ...tasks,
        {
          id: getNextId(),
          ...task,
        },
      ])
    },
    [getNextId]
  )

  const updatedTask = useCallback((updatedTask) => {
    setTasks((tasks) =>
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    )
  }, [])

  const deleteTask = useCallback(
    (taskId) => setTasks((tasks) => tasks.filter((task) => task.id !== taskId)),
    []
  )

  return (
    <Context.Provider
      {...props}
      value={{
        tasks,
        createTask,
        deleteTask,
        updatedTask,
      }}
    />
  )
}

export default ContextProvider