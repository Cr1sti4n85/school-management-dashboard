"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import InputField from "./InputField";
import z from "zod";
import { classSchema } from "@/zod-schemas/class";
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useTransition,
} from "react";
import { ClassRelatedData } from "@/lib/queries/relatedDataQuery";
import { createClass, updateClass } from "@/lib/actions/classActions";
import { toast } from "react-toastify";

type Props = {
  type: "create" | "update" | "delete";
  setOpen: Dispatch<SetStateAction<boolean>>;
  data?: z.infer<typeof classSchema>;
  relatedData?: ClassRelatedData;
};

const ClassForm = ({ type, setOpen, data, relatedData }: Props) => {
  const { teachers, grades } = relatedData || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof classSchema>>({
    resolver: zodResolver(classSchema) as Resolver<z.infer<typeof classSchema>>,
  });

  const [state, formAction, pending] = useActionState(
    type === "create" ? createClass : updateClass,
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
        {`${type === "create" ? "Registrar" : "Actualizar"} `} salón
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Nombre del salón"
          register={register}
          name="name"
          defaultValue={data?.name}
          error={errors.name}
        />
        <InputField
          label="Capacidad"
          register={register}
          name="capacity"
          defaultValue={data?.capacity.toString()}
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
          <label className="text-xs text-gray-500">Supervisor</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("supervisorId")}
            defaultValue={data?.supervisorId}
          >
            {teachers?.map((teacher) => (
              <option value={teacher.id} key={teacher.id}>
                {teacher.name + " " + teacher.surname}
              </option>
            ))}
          </select>
          {errors.supervisorId?.message && (
            <p className="text-xs text-red-400">
              {errors.supervisorId.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Curso</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("gradeId")}
            defaultValue={data?.gradeId}
          >
            {grades?.map((grade) => (
              <option value={grade.id} key={grade.id}>
                {grade.level}
              </option>
            ))}
          </select>
          {errors.gradeId?.message && (
            <p className="text-xs text-red-400">
              {errors.gradeId.message.toString()}
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

export default ClassForm;
