import Link from "./Link"
import classNames from "classnames"
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
  const { checkAll } = useContext()

  return (
    <main className="flex flex-col">
      <div className="flex p-4 justify-between items-center border-b">
        <nav>
          <ul className="flex gap-4">
            <li>
              <NavLink href="/task/create"><PlusIcon className="w-6"/></NavLink>
            </li>
            <li>
              <NavLink href="/task/[taskId]/update"><PencilSquareIcon className="w-6"/></NavLink>
            </li>
            <li>
              <NavLink href="/task/[taskId]/delete/"><TrashIcon className="w-6"/></NavLink>
            </li>
            <li onClick={() => checkAll()} className="absolute right-6">
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