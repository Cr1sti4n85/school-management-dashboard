"use client";

import { deleteAnnouncement } from "@/lib/actions/announcementActions";
import { deleteAssignment } from "@/lib/actions/assignmentActions";
import { deleteClass } from "@/lib/actions/classActions";
import { deleteEvent } from "@/lib/actions/eventActions";
import { deleteExam } from "@/lib/actions/examActions";
import { deleteLesson } from "@/lib/actions/lessonActions";
import { deleteParent } from "@/lib/actions/parentActions";
import { deleteStudent } from "@/lib/actions/studentActions";
import { deleteSubject } from "@/lib/actions/subjectActions";
import { deleteTeacher } from "@/lib/actions/teacherActions";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { toast } from "react-toastify";

//TODO: update this action map
const deleteActionMap = {
  subject: deleteSubject,
  class: deleteClass,
  teacher: deleteTeacher,
  student: deleteStudent,
  exam: deleteExam,
  parent: deleteParent,
  lesson: deleteLesson,
  assignment: deleteAssignment,
  result: deleteSubject,
  attendance: deleteSubject,
  event: deleteEvent,
  announcement: deleteAnnouncement,
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
      <input type="text | number" name="id" value={id} readOnly hidden />
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
