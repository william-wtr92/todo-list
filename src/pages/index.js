import List from "../components/TasksList"
import { useContext } from "../components/ContextProvider"
import { Fragment, useCallback, useState } from "react"
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
  const { tasks, deleteTask, listId, updatedValue, filter } = useContext()
  const [show, setShow] = useState(false)

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

  const handleEnter = (taskId) => {
    setTimeout(() => {
      setShow(taskId)
    }, 300)
  }

  const hiddenTask = tasks.filter((task) => !task.hidden)

  return (
    <>
      <List title="ToDo List"></List>

      {filter
        ? hiddenTask.map((task) => (
            <Fragment key={task.id}>
              {task.listNameId === listId ? (
                <li
                  key={task.id}
                  onMouseEnter={() => {
                    handleEnter(task.id)
                  }}
                  onMouseLeave={() => {
                    setShow(false)
                  }}
                  className="border px-4 py-2 flex items-center"
                >
                  <input
                    className="m-4 h-8 w-8 hover:cursor-pointer appearance-none border-2 rounded-md checked:bg-green-300 "
                    onChange={() => updatedValue(task.id)}
                    type="checkbox"
                    name="valid"
                    checked={task.valid ? true : false}
                  />

                  <div className="hover:cursor-pointer">{task.title}</div>

                  {show === task.id ? (
                    <>
                      <NavLink href={`/task/${task.id}/update`}>
                        <PencilSquareIcon className="w-6 absolute right-12 -mt-2" />
                      </NavLink>

                      <button
                        data-task-id={task.id}
                        onClick={handleClickDelete}
                      >
                        <TrashIcon className="w-6 absolute right-4 -mt-2" />
                      </button>
                    </>
                  ) : null}
                </li>
              ) : null}
            </Fragment>
          ))
        : tasks.map((task) => (
            <Fragment key={task.id}>
              {task.listNameId === listId ? (
                <li
                  key={task.id}
                  onMouseEnter={() => {
                    handleEnter(task.id)
                  }}
                  onMouseLeave={() => {
                    setShow(false)
                  }}
                  className="border px-4 py-2 flex items-center"
                >
                  <input
                    className="m-4 h-8 w-8 hover:cursor-pointer appearance-none border-2 rounded-md checked:bg-green-300 "
                    onChange={() => updatedValue(task.id)}
                    type="checkbox"
                    name="valid"
                    checked={task.valid ? true : false}
                  />

                  <div className="hover:cursor-pointer">{task.title}</div>

                  {show === task.id ? (
                    <>
                      <NavLink href={`/task/${task.id}/update`}>
                        <PencilSquareIcon className="w-6 absolute right-12 -mt-2" />
                      </NavLink>

                      <button
                        data-task-id={task.id}
                        onClick={handleClickDelete}
                      >
                        <TrashIcon className="w-6 absolute right-4 -mt-2" />
                      </button>
                    </>
                  ) : null}
                </li>
              ) : null}
            </Fragment>
          ))}
    </>
  )
}

export default Main
