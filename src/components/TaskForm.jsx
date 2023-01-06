import * as yup from "yup";
import { Form, Formik } from "formik"
import Formfield from "../components/FormField";
import { XMarkIcon } from "@heroicons/react/24/solid"
import { NavLink } from "./NavLink";


const defaultValidationSchema = yup.object().shape({
  title: yup.string().required().label("title")
})

const defaultInitialValues = {
  title: "",
}


const TaskForm = (props) => {
  
  const {
    onSubmit,
    initialValues = defaultInitialValues,
    validationSchema = defaultValidationSchema,
  } = props


  return (
    <>
      <header className="flex border-b-2">
        <h1 className="font-bold p-2">Add ToDo</h1>
        <p className="absolute right-4 top-2"><NavLink href="/"><XMarkIcon className=" w-6"/></NavLink></p>
      </header>
      <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
        {({ values }) => (

        <Form className="flex-col p-2">
          <Formfield name="title" placeholder="Describe your task" label="Title"/>
          <div className="flex gap-2 absolute right-4 bottom-4">
            <button className="bg-white rounded-xl text-black font-semibold px-2 py-1">
                <NavLink href="/">Cancel</NavLink>
            </button>
            <button type="submit" className={`bg-blue-500 rounded-xl text-white font-semibold px-2 py-1 ${values.title === '' ? 'bg-gray-400 cursor-not-allowed' : ''}`} disabled={values.title === ''}>
                {values.title === '' ? (<div>Create</div>) : <NavLink href="/">Create</NavLink>}
            </button>
          </div>
        </Form>
          
      )}
      </Formik>
    </>
   
  )
}

export default TaskForm;