import FormModal from "./FormModal";

export type FormProps<T> = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: T;
  id?: string | number;
};

const FormContainer = async <T,>({ table, type, data, id }: FormProps<T>) => {
  return <FormModal table={table} type={type} data={data} id={id}></FormModal>;
};

export default FormContainer;
