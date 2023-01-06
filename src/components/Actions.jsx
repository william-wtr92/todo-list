import { useCallback } from "react"
import { TrashIcon, PlusIcon, PencilSquareIcon, CheckCircleIcon } from "@heroicons/react/24/solid"
import { useContext } from "./ContextProvider"
import { NavLink } from "./NavLink"

const Actions = (props) => {
  const { children } = props
  const { deleteList, listId, filter, setFilter } = useContext()

  const handleClickDelete = useCallback(
    (event) => {
      const listId = Number.parseInt(
        event.currentTarget.getAttribute("data-list-id"),
        10
      )

      deleteList(listId)
    },
    [deleteList]
  )

  const filterTask = useCallback(() => {
    if (filter === true) {
      setFilter(false)
    } else if (filter === false) {
      setFilter(true)
    }
  }, [filter, setFilter])

  return (
    <main className="flex flex-col sticky top-20 bg-white">
      <div className="flex p-4 justify-between items-center border-b">
        <nav>
          <ul className="flex gap-4">
            <li>
              <NavLink href="/task/create"><PlusIcon className="w-6"/></NavLink>
            </li>
            <li>
              <NavLink href={`/list/${listId}/update`}><PencilSquareIcon className="w-6"/></NavLink>
            </li>
            <li data-list-id={listId} onClick={handleClickDelete} className="hover:cursor-pointer">
              <TrashIcon className="w-6"/>
            </li>
            <li onClick={() => filterTask()} className="absolute right-6 hover:cursor-pointer">
              <CheckCircleIcon className="w-6"/>
            </li>
          </ul>
        </nav>
      </div>
      <section>{children}</section>
    </main>
  )
}

export default Actions