"use client";
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useTransition,
} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import InputField from "./InputField";
import z from "zod";
import { subjectSchema } from "@/zod-schemas/subject";
import { createSubject, updateSubject } from "@/lib/actions/subjectActions";
import { toast } from "react-toastify";
import { SubjectRelatedData } from "@/lib/queries/relatedDataQuery";

type Props = {
  type: "create" | "update" | "delete";
  setOpen: Dispatch<SetStateAction<boolean>>;
  data?: z.infer<typeof subjectSchema>;
  relatedData?: SubjectRelatedData;
};

const SubjectForm = ({ type, setOpen, data, relatedData }: Props) => {
  const { teachers } = relatedData || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof subjectSchema>>({
    resolver: zodResolver(subjectSchema) as Resolver<
      z.infer<typeof subjectSchema>
    >,
  });

  const [state, formAction, pending] = useActionState(
    type === "create" ? createSubject : updateSubject,
    {
      success: false,
      message: "",
    },
  );
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

        {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id?.toString()}
            register={register}
            error={errors?.id}
            hidden
          />
        )}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Maestros</label>
          <select
            multiple
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("teachers")}
            defaultValue={data?.teachers}
          >
            {teachers?.map((teacher) => (
              <option value={teacher.id} key={teacher.id}>
                {teacher.name + " " + teacher.surname}
              </option>
            ))}
          </select>
          {errors.teachers?.message && (
            <p className="text-xs text-red-400">
              {errors.teachers.message.toString()}
            </p>
          )}
        </div>
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
