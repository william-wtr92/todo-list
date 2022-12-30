import Link from "./Link"
import classNames from "classnames"
import { useCallback } from "react"
import { useRouter } from "next/router.js"
import { TrashIcon, PlusIcon, PencilSquareIcon, CheckCircleIcon } from "@heroicons/react/24/solid"
import { useContext } from "../components/ContextProvider"

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

const Actions = (props) => {
  const { children } = props
  const { deleteList, listId, filterTask } = useContext()

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

  return (
    <main className="flex flex-col">
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