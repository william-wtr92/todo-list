import {
  createContext,
  useCallback,
  useContext as useNativeContext,
  useState,
} from "react"

const initialState = {
  tasks: [{
    id: 1,
    title: "Item1",
    valid: false,
    listNameId: 1
  }],
  listName: [{
    id: 1, 
    name: "Homeworks"
  }]

}



export const Context = createContext()

export const useContext = () => useNativeContext(Context)

const ContextProvider = (props) => {
  const [nextTaskId, setNextTaskId] = useState(2)
  const [nextListId, setNextListId] = useState(2)
  const [tasks, setTasks] = useState(initialState.tasks)
  const [lists, setLists] = useState(initialState.listName)
  const [listId, setListId] = useState(1)

  const getNextTaskId = useCallback(() => {
    setNextTaskId(nextTaskId + 1)

    return nextTaskId
  }, [nextTaskId])

  
  const updateListId = useCallback((id) => {
    setListId(id)
    console.log(id)
  }, [setListId])

  const createTask = useCallback(
    ({title, listNameId}) => {
      setTasks((tasks) => [
        ...tasks,
        {
          id: getNextTaskId(),
          title,
          listNameId
        },
  
      ])
    },
    [getNextTaskId]
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

  const getNextListId = useCallback(() => {
    setNextListId(nextListId + 1)

    return nextListId
  }, [nextListId])

  const createList = useCallback(
    ({name}) => {
      setLists((lists) => [
        ...lists,
        {
          id: getNextListId(),
          name,
        },
      ])
    },
    [getNextListId]
  )

  const updatedValue = useCallback((id) => {
    const newTask = [...tasks]
    newTask.forEach((task) => {
      if (task.id === id && !task.valid) {
        task.valid = true
      } else if (task.id === id && task.valid) {
        task.valid = false
      }
    })
    setTasks((tasks) => [
      ...tasks,
    ])
  }, [setTasks, tasks])

   const checkAll = useCallback(() => {
     const newTask = [...tasks]
      newTask.filter((task) => {
        task.valid === false
    })
    setTasks((tasks) => [
      ...tasks,
    ])
    console.log("ok")
  }, [setTasks, tasks])

  return (
    <Context.Provider
      {...props}
      value={{
        tasks,
        createTask,
        deleteTask,
        updatedTask,
        lists,
        createList,
        listId,
        updateListId,
        updatedValue,
        checkAll
      }}
    />
  )
}

export default ContextProvider