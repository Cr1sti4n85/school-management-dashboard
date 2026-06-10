import { getRelatedData } from "@/lib/queries/relatedDataQuery";
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
  const relatedData = await getRelatedData(type, table);

  return (
    <FormModal
      table={table}
      type={type}
      data={data}
      id={id}
      relatedData={relatedData}
    />
  );
};

export default FormContainer;
