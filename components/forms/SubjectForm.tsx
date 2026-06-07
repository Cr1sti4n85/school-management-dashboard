"use client";
import { useActionState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import z from "zod";
import { subjectSchema } from "@/zod-schemas/subject";
import { createSubject } from "@/lib/actions/subjectActions";

type Props = {
  type: "create" | "update" | "delete";
  data?: z.infer<typeof subjectSchema>;
};

const SubjectForm = ({ type, data }: Props) => {
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

  const onSubmit = handleSubmit((data) => {
    formAction(data);
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

      {!state.success && <span>{state.message}</span>}
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
