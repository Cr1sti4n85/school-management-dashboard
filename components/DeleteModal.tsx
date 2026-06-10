"use client";

import { deleteSubject } from "@/lib/actions/subjectActions";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { toast } from "react-toastify";

//TODO: update this action map
const deleteActionMap = {
  subject: deleteSubject,
  class: deleteSubject,
  teacher: deleteSubject,
  student: deleteSubject,
  exam: deleteSubject,
  parent: deleteSubject,
  lesson: deleteSubject,
  assignment: deleteSubject,
  result: deleteSubject,
  attendance: deleteSubject,
  event: deleteSubject,
  announcement: deleteSubject,
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
  setOpen: Dispatch<SetStateAction<boolean>>;
  id?: string | number;
};

const DeleteModal = ({ table, setOpen, id }: Props) => {
  const [state, formAction] = useActionState(deleteActionMap[table], {
    success: false,
    message: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setOpen(false);
      router.refresh();
    }
    if (state.message) {
      toast.error(state.message);
    }
  }, [state.message, state.success, router, setOpen]);
  return (
    <form action={formAction} className="p-4 flex flex-col gap-4">
      <input type="text | number" name="id" value={id} readOnly />
      <span className="text-center font-medium">
        Los datos se perderán. ¿Estás seguro que quieres borrar este elemento?
      </span>
      <button className="bg-red-700 text-white py-2 px-4 rounded-md border-md w-max self-center">
        Eliminar
      </button>
    </form>
  );
};

export default DeleteModal;
