import { useContext } from "../../components/ContextProvider";
import { useRouter } from "next/router.js"
import ListForm from "../../components/ListForm";
import { useCallback } from "react";


const CreateListForm = () => {
  const { createList } = useContext()
  const router = useRouter()
  const handleSubmit = useCallback(
    (values) => {
      createList(values)
      router.push("/")
    },
    [router, createList]
  )

  return (
    <ListForm onSubmit={handleSubmit}/>
  )
}

export default CreateListForm;