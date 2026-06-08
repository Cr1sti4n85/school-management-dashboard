import { Dispatch, JSX, SetStateAction } from "react";
import z from "zod";
import { teacherSchema } from "@/zod-schemas/teacher";
import { studentSchema } from "@/zod-schemas/student";
import dynamic from "next/dynamic";
import { subjectSchema } from "@/zod-schemas/subject";

const TeacherForm = dynamic(() => import("./forms/TeacherForm"));
const StudentForm = dynamic(() => import("./forms/StudentForm"));
const SubjectForm = dynamic(() => import("./forms/SubjectForm"));

const forms: {
  [key: string]: (
    type: "create" | "update",
    setOpen: Dispatch<SetStateAction<boolean>>,
    data?: unknown,
  ) => JSX.Element;
} = {
  teacher: (type, setOpen, data) => (
    <TeacherForm
      type={type}
      setOpen={setOpen}
      data={data as z.infer<typeof teacherSchema>}
    />
  ),
  student: (type, setOpen, data) => (
    <StudentForm
      type={type}
      setOpen={setOpen}
      data={data as z.infer<typeof studentSchema>}
    />
  ),
  subject: (type, setOpen, data) => (
    <SubjectForm
      type={type}
      setOpen={setOpen}
      data={data as z.infer<typeof subjectSchema>}
    />
  ),
};

type Props = {
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
  id?: string | number;
  data?: unknown;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const Form = ({ type, id, table, data, setOpen }: Props) => {
  return type === "delete" && id ? (
    <form action="" className="p-4 flex flex-col gap-4">
      <span className="text-center font-medium">
        Los datos se perderán. ¿Estás seguro que quieres borrar esta {table}?
      </span>
      <button className="bg-red-700 text-white py-2 px-4 rounded-md border-md w-max self-center">
        Eliminar
      </button>
    </form>
  ) : type === "create" || type === "update" ? (
    forms[table](type, setOpen, data)
  ) : null;
};

export default Form;
