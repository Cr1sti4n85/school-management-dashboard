"use client";
import { teacherSchema } from "@/zod-schemas/teacher";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type Props<T> = {
  type: "create" | "update";
  data?: T;
};

const TeacherForm = <T,>({ type, data }: Props<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(teacherSchema),
  });
  return <form>TeacherForm</form>;
};

export default TeacherForm;
