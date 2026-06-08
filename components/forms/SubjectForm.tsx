"use client";
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useTransition,
} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import z from "zod";
import { subjectSchema } from "@/zod-schemas/subject";
import { createSubject } from "@/lib/actions/subjectActions";
import { toast } from "react-toastify";

type Props = {
  type: "create" | "update" | "delete";
  setOpen: Dispatch<SetStateAction<boolean>>;
  data?: z.infer<typeof subjectSchema>;
};

const SubjectForm = ({ type, setOpen, data }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof subjectSchema>>({
    resolver: zodResolver(subjectSchema),
  });

  const [state, formAction, pending] = useActionState(createSubject, {
    success: false,
    message: "",
  });
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setOpen(false);
    }
  }, [state, setOpen]);

  const onSubmit = handleSubmit((data) => {
    startTransition(() => {
      formAction(data);
    });
  });
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {`${type === "create" ? "Registrar" : "Actualizar"} `} nueva materia
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Nombre de materia"
          register={register}
          name="name"
          defaultValue={data?.name}
          error={errors.name}
        />
      </div>
      <button
        disabled={pending}
        className="bg-blue-400 text-white p-2 rounded-md"
      >
        {type === "create" ? "Crear" : "Actualizar"}
      </button>
    </form>
  );
};

export default SubjectForm;
