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
import {
  ClassRelatedData,
  ExamRelatedData,
  StudentRelatedData,
  SubjectRelatedData,
  TeacherRelatedData,
} from "@/lib/queries/relatedDataQuery";
import { classSchema } from "@/zod-schemas/class";
import { examSchema } from "@/zod-schemas/exam";

const TeacherForm = dynamic(() => import("./forms/TeacherForm"));
const StudentForm = dynamic(() => import("./forms/StudentForm"));
const SubjectForm = dynamic(() => import("./forms/SubjectForm"));
const ClassForm = dynamic(() => import("./forms/ClassForm"));
const ExamForm = dynamic(() => import("./forms/ExamForm"));

const forms: {
  [key: string]: (
    type: "create" | "update",
    setOpen: Dispatch<SetStateAction<boolean>>,
    data?: unknown,
    relatedData?: unknown,
  ) => JSX.Element;
} = {
  teacher: (type, setOpen, data, relatedData) => (
    <TeacherForm
      type={type}
      setOpen={setOpen}
      data={data as z.infer<typeof teacherSchema>}
      relatedData={relatedData as TeacherRelatedData}
    />
  ),
  student: (type, setOpen, data, relatedData) => (
    <StudentForm
      type={type}
      setOpen={setOpen}
      data={data as z.infer<typeof studentSchema>}
      relatedData={relatedData as StudentRelatedData}
    />
  ),
  subject: (type, setOpen, data, relatedData) => (
    <SubjectForm
      type={type}
      setOpen={setOpen}
      data={data as z.infer<typeof subjectSchema>}
      relatedData={relatedData as SubjectRelatedData}
    />
  ),
  class: (type, setOpen, data, relatedData) => (
    <ClassForm
      type={type}
      setOpen={setOpen}
      data={data as z.infer<typeof classSchema>}
      relatedData={relatedData as ClassRelatedData}
    />
  ),
  exam: (type, setOpen, data, relatedData) => (
    <ExamForm
      type={type}
      setOpen={setOpen}
      data={data as z.infer<typeof examSchema>}
      relatedData={relatedData as ExamRelatedData}
    />
  ),
};

type Props<T, U> = FormProps<T> & { relatedData?: U };

const FormModal = <T, U>({
  table,
  type,
  data,
  id,
  relatedData,
}: Props<T, U>) => {
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
        <Image
          src={`/${type}.png`}
          alt="action icon"
          width={20}
          height={20}
          className="cursor-pointer"
        />
      </button>
      {open && (
        <div className="z-50 flex items-center justify-center w-screen h-screen absolute left-0 top-0 bg-black/60">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            {type === "delete" && id ? (
              <DeleteModal table={table} setOpen={setOpen} id={id} />
            ) : type === "create" || type === "update" ? (
              forms[table](type, setOpen, data, relatedData)
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
