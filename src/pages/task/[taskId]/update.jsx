import { useContext } from "../../../components/ContextProvider"
import TaskForm from "../../../components/TaskForm"
import { useRouter } from "next/router.js"
import { useCallback } from "react"

export const getServerSideProps = ({ params }) => ({
  props: {
    params: {
      taskId: Number.parseInt(params.taskId, 10),
    },
  },
})

const TaskUpdatePage = (props) => {
  const {
    params: { taskId },
  } = props
  const { updatedTask, tasks } = useContext()
  const router = useRouter()
  const handleSubmit = useCallback(
    (values) => {
      console.log(values)
      updatedTask(values)
      router.push("/")
    },
    [router, updatedTask]
  )

  return (
      <TaskForm
        onSubmit={handleSubmit}
        initialValues={tasks.find(({ id }) => id === taskId)}
      />
  )
}

export default TaskUpdatePage