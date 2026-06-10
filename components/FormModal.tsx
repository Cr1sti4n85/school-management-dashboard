"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { JSX, Dispatch, SetStateAction, useState } from "react";
import z from "zod";
import { FormProps } from "./FormContainer";
import DeleteModal from "./DeleteModal";
import { teacherSchema } from "@/zod-schemas/teacher";
import { studentSchema } from "@/zod-schemas/student";
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

const FormModal = <T,>({ table, type, data, id }: FormProps<T>) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-yellow-regular"
      : type === "update"
        ? "bg-sky-light"
        : "bg-purple-regular";
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <button
        className={`flex items-center justify-center rounded-full ${size} ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="action icon" width={16} height={16} />
      </button>
      {open && (
        <div className="z-50 flex items-center justify-center w-screen h-screen absolute left-0 top-0 bg-black/60">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            {type === "delete" && id ? (
              <DeleteModal table={table} setOpen={setOpen} id={id} />
            ) : type === "create" || type === "update" ? (
              forms[table](type, setOpen, data)
            ) : null}
            <div
              className="absolute top-3 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image
                src="/close.png"
                alt="close button"
                width={14}
                height={14}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
