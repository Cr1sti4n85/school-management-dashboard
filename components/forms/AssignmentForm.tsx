"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import InputField from "./InputField";
import z from "zod";
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useTransition,
} from "react";
import { assignmentSchema } from "@/zod-schemas/assignment";
import { AssignmentRelatedData } from "@/lib/queries/relatedDataQuery";
import {
  createAssignment,
  updateAssignment,
} from "@/lib/actions/assignmentActions";
import { toast } from "react-toastify";

type Props = {
  type: "create" | "update" | "delete";
  setOpen: Dispatch<SetStateAction<boolean>>;
  data?: z.infer<typeof assignmentSchema>;
  relatedData?: AssignmentRelatedData;
};

const AssignmentForm = ({ type, setOpen, data, relatedData }: Props) => {
  const { lessons } = relatedData || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof assignmentSchema>>({
    resolver: zodResolver(assignmentSchema) as Resolver<
      z.infer<typeof assignmentSchema>
    >,
  });

  const [state, formAction, pending] = useActionState(
    type === "create" ? createAssignment : updateAssignment,
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
        {type === "create" ? "Crear" : "Actualizar"} tarea
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Título"
          register={register}
          name="title"
          defaultValue={data?.title}
          error={errors.title}
        />
        <InputField
          label="Fecha de inicio"
          register={register}
          name="startDate"
          type="datetime-local"
          defaultValue={data?.startDate.toLocaleDateString()}
          error={errors.startDate}
        />
        <InputField
          label="Fecha de término"
          register={register}
          name="dueDate"
          type="datetime-local"
          defaultValue={data?.dueDate.toLocaleDateString()}
          error={errors.dueDate}
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
          <label className="text-xs text-gray-500">Clase</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("lessonId")}
            defaultValue={data?.lessonId}
          >
            {lessons?.map((lesson) => (
              <option value={lesson.id} key={lesson.id}>
                {lesson.name}
              </option>
            ))}
          </select>
          {errors.lessonId?.message && (
            <p className="text-xs text-red-400">
              {errors.lessonId.message.toString()}
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

export default AssignmentForm;
