import { useContext } from "../../components/ContextProvider";
import { useRouter } from "next/router.js"
import TaskForm from "../../components/TaskForm";
import { useCallback } from "react";


const CreateTaskForm = () => {
  const { createTask } = useContext()
  const router = useRouter()
  const handleSubmit = useCallback(
    (values) => {
      createTask(values)
      router.push("/")
    },
    [router, createTask]
  )

  return (
    <TaskForm onSubmit={handleSubmit}/>
  )
}

export default CreateTaskForm;