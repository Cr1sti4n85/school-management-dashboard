"use client";

import Image from "next/image";
import { useState } from "react";
import Form from "./Form";

type Props<T> = {
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
  id?: number;
};

const FormModal = <T,>({ table, type, data, id }: Props<T>) => {
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
            <Form table={table} type={type} id={id} data={data} />
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
