import List from "../components/TasksList"
import { useContext } from "../components/ContextProvider"
import { Fragment, useCallback, useState } from "react"
import { TrashIcon } from "@heroicons/react/24/solid"
import { NavLink } from "../components/NavLink"

const Main = () => {
  const { tasks, lists, deleteTask, listId, updatedValue, filter } =
    useContext()
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
    }, 250)
  }

  const hiddenTask = tasks.filter((task) => !task.hidden)

  return (
    <>
      <List title="ToDo List"></List>

      {tasks.length === 0 && lists.length >= 1 ? (
        <div className="m-4 font-bold border-2 border-gray-200 text-center p-2 rounded-lg">
          Add a new task ...
        </div>
      ) : (
        <>
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
                        className="m-4 h-8 w-8 hover:cursor-pointer appearance-none border-2 rounded-md checked:bg-green-300 transition-all ease-out duration-1000"
                        onChange={() => updatedValue(task.id)}
                        type="checkbox"
                        name="valid"
                        checked={task.valid ? true : false}
                      />

                      <div className="hover:cursor-pointer">
                        <NavLink href={`/task/${task.id}/update`}>
                          {task.title}
                        </NavLink>
                      </div>

                      {show === task.id ? (
                        <>
                          <button
                            data-task-id={task.id}
                            onClick={handleClickDelete}
                          >
                            <TrashIcon className="w-6 absolute right-10 -mt-2" />
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
                        className="m-4 h-8 w-8 hover:cursor-pointer appearance-none border-2 rounded-md checked:bg-green-300 transition-all ease-out duration-1000"
                        onChange={() => updatedValue(task.id)}
                        type="checkbox"
                        name="valid"
                        checked={task.valid ? true : false}
                      />

                      <div className="hover:cursor-pointer">
                        <NavLink href={`/task/${task.id}/update`}>
                          {task.title}
                        </NavLink>
                      </div>

                      {show === task.id ? (
                        <>
                          <button
                            data-task-id={task.id}
                            onClick={handleClickDelete}
                            className="opacity-100 transform-translate-x-0"
                          >
                            <TrashIcon className="w-6 absolute right-10 -mt-2 transition-all duration-200 ease-in-out" />
                          </button>
                        </>
                      ) : null}
                    </li>
                  ) : null}
                </Fragment>
              ))}
        </>
      )}
    </>
  )
}

export default Main
