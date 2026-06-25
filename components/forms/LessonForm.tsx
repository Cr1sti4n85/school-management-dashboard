"use client";
import { teacherSchema } from "@/zod-schemas/teacher";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import InputField from "./InputField";
import z from "zod";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useTransition,
} from "react";
import { lessonSchema } from "@/zod-schemas/lesson";
import { LessonRelatedData } from "@/lib/queries/relatedDataQuery";
import { createLesson, updateLesson } from "@/lib/actions/lessonActions";
import { toast } from "react-toastify";
import { weekDays } from "@/lib/constants";

type Props = {
  type: "create" | "update" | "delete";
  setOpen: Dispatch<SetStateAction<boolean>>;
  data?: z.infer<typeof lessonSchema>;
  relatedData?: LessonRelatedData;
};

const LessonForm = ({ type, setOpen, data, relatedData }: Props) => {
  const { classes, teachers, subjects } = relatedData || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof lessonSchema>>({
    resolver: zodResolver(lessonSchema) as Resolver<
      z.infer<typeof lessonSchema>
    >,
  });

  const [state, formAction, pending] = useActionState(
    type === "create" ? createLesson : updateLesson,
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
        {type === "create" ? "Crear" : "Actualizar"} clase
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Nombre de la clase"
          register={register}
          name="name"
          defaultValue={data?.name}
          error={errors.name}
        />
        {/* <InputField
          label="Día de semana"
          register={register}
          name="day"
          defaultValue={data?.day}
          error={errors.day}
        /> */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Día</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("day")}
            defaultValue={data?.day}
          >
            {weekDays?.map((wd, idx) => (
              <option value={data?.day} key={idx}>
                {wd}
              </option>
            ))}
          </select>
          {errors.day?.message && (
            <p className="text-xs text-red-400">
              {errors.day.message.toString()}
            </p>
          )}
        </div>
        <InputField
          label="Horario de inicio"
          register={register}
          name="startTime"
          type="datetime-local"
          defaultValue={data?.startTime.toLocaleDateString()}
          error={errors.startTime}
        />
        <InputField
          label="Horario de término"
          register={register}
          name="endTime"
          type="datetime-local"
          defaultValue={data?.endTime.toLocaleDateString()}
          error={errors.endTime}
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
          <label className="text-xs text-gray-500">Materia</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("subjectId")}
            defaultValue={data?.subjectId}
          >
            {subjects?.map((subject) => (
              <option value={subject.id} key={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors.subjectId?.message && (
            <p className="text-xs text-red-400">
              {errors.subjectId.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Salones</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("classId")}
            defaultValue={data?.classId}
          >
            {classes?.map((classItem) => (
              <option value={classItem.id} key={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </select>
          {errors.classId?.message && (
            <p className="text-xs text-red-400">
              {errors.classId.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Maestros</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("teacherId")}
            defaultValue={data?.teacherId}
          >
            {teachers?.map((teacher) => (
              <option value={teacher.id} key={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
          {errors.teacherId?.message && (
            <p className="text-xs text-red-400">
              {errors.teacherId.message.toString()}
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

export default LessonForm;
