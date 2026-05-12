import { JSX } from "react";
import z from "zod";
import { teacherSchema } from "@/zod-schemas/teacher";
import { studentSchema } from "@/zod-schemas/student";
import dynamic from "next/dynamic";

const TeacherForm = dynamic(() => import("./forms/TeacherForm"));
const StudentForm = dynamic(() => import("./forms/StudentForm"));

const forms: {
  [key: string]: (type: "create" | "update", data?: unknown) => JSX.Element;
} = {
  teacher: (type, data) => (
    <TeacherForm type={type} data={data as z.infer<typeof teacherSchema>} />
  ),
  student: (type, data) => (
    <StudentForm type={type} data={data as z.infer<typeof studentSchema>} />
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
  id?: string;
  data?: unknown;
};

const Form = ({ type, id, table, data }: Props) => {
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
    forms[table](type, data)
  ) : null;
};

export default Form;
