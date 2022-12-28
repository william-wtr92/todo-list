import * as yup from "yup";
import { Form, Formik } from "formik"
import Formfield from "../components/FormField";
import Link from "../components/Link";
import { useRouter } from "next/router.js"
import classNames from "classnames";
import { XMarkIcon } from "@heroicons/react/24/solid"

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

const defaultValidationSchema = yup.object().shape({
  name: yup.string().required().label("name")
})

const defaultInitialValues = {
  name: "",
}


const ListForm = (props) => {
  
  const {
    onSubmit,
    initialValues = defaultInitialValues,
    validationSchema = defaultValidationSchema,
  } = props


  return (
    <>
      <header className="flex border-b-2">
        <h1 className="font-bold p-2">Add New List</h1>
        <p className="absolute right-4 top-2"><NavLink href="/"><XMarkIcon className=" w-6"/></NavLink></p>
      </header>
      <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
        <Form className="flex-col p-2">
          <Formfield name="name" placeholder="List Name" label="Name"/>
          <div className="flex gap-2 absolute right-4 bottom-4">
            <button className="bg-white rounded-xl text-black font-semibold px-2 py-1">
                <NavLink href="/">Cancel</NavLink>
            </button>
            <button type="submit" className="bg-blue-600 rounded-xl text-white font-semibold px-2 py-1">
                <NavLink href="/">Create</NavLink>
            </button>
          </div>
        </Form>
      </Formik>
      </>
   
  )
}

export default ListForm;