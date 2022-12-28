import { useContext } from "../../components/ContextProvider";
import { useRouter } from "next/router.js"
import TaskForm from "../../components/TaskForm";
import { useCallback } from "react";


const CreateTaskForm = () => {
  const { createTask, listId } = useContext()
  const router = useRouter()
  const handleSubmit = useCallback(
    ({title}) => {
      createTask({title, listNameId: listId})
      router.push("/")
    },
    [router, createTask, listId]
  )

  return (
    <TaskForm onSubmit={handleSubmit}/>
  )
}

export default CreateTaskForm;