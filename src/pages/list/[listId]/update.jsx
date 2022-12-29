import { useContext } from "../../../components/ContextProvider"
import ListForm from "../../../components/ListForm"
import { useRouter } from "next/router.js"
import { useCallback } from "react"

export const getServerSideProps = ({ params }) => ({
  props: {
    params: {
      listId: Number.parseInt(params.listId, 10),
    },
  },
})

const ListUpdatePage = (props) => {
  const {
    params: { listId },
  } = props
  const { updatedList, lists } = useContext()
  const router = useRouter()
  const handleSubmit = useCallback(
    (values) => {
      console.log(values)
      updatedList(values)
      router.push("/")
    },
    [router, updatedList]
  )

  return (
      <ListForm
        onSubmit={handleSubmit}
        initialValues={lists.find(({ id }) => id === listId)}
      />
  )
}

export default ListUpdatePage