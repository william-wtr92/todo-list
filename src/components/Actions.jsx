import Link from "./Link"
import classNames from "classnames"
import { useRouter } from "next/router.js"
import { TrashIcon, PlusIcon, PencilSquareIcon, CheckCircleIcon } from "@heroicons/react/24/solid"

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
            <li className="absolute right-6">
              <NavLink href="/"><CheckCircleIcon className="w-6"/></NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <section>{children}</section>
    </main>
  )
}

export default Actions