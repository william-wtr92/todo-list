import List from "../components/TasksList"
import { useContext } from "../components/ContextProvider"
import { useCallback } from "react"
import Link from "../components/Link"
import { useRouter } from "next/router.js"
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid"
import classNames from "classnames"

const NavLink = (props) => {
  const { asPath } = useRouter()

  return (
    <Link
      {...props}
      className={classNames("text-lg font-semibold", {
        underline: asPath === props.href,
      })}
    />
  )
}

const Main = () => {
  const { tasks, deleteTask } = useContext()

  const handleClickDelete = useCallback(
    (event) => {
      const taskId = Number.parseInt(
        event.currentTarget.getAttribute("data-task-id"),
        10
      )

      deleteTask(taskId)
    },
    [deleteTask]
  )

  return (
    <>
      <List title="ToDo List"></List>

      {tasks.map((task) => (
        <ul key={task.id}>
          <li className="border px-4 py-2 flex items-center">
            <input className="m-4" type="checkbox" />
            {task.title}

            <NavLink href={`/task/${task.id}/update`}>
              <PencilSquareIcon className="w-6 absolute right-12 -mt-2" />
            </NavLink>

            <button data-task-id={task.id} onClick={handleClickDelete}>
              <TrashIcon className="w-6 absolute right-4 -mt-2" />
            </button>
          </li>
        </ul>
      ))}
    </>
  )
}

export default Main
