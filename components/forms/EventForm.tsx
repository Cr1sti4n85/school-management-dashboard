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
import { eventSchema } from "@/zod-schemas/event";
import { EventRelatedData } from "@/lib/queries/relatedDataQuery";
import { createEvent, updateEvent } from "@/lib/actions/eventActions";
import { toast } from "react-toastify";

type Props = {
  type: "create" | "update" | "delete";
  setOpen: Dispatch<SetStateAction<boolean>>;
  data?: z.infer<typeof eventSchema>;
  relatedData?: EventRelatedData;
};

const EventForm = ({ type, setOpen, data, relatedData }: Props) => {
  const { classes } = relatedData || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema) as Resolver<z.infer<typeof eventSchema>>,
  });

  const [state, formAction, pending] = useActionState(
    type === "create" ? createEvent : updateEvent,
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
        {`${type === "create" ? "Registrar" : "Actualizar"} `} evento
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
          label="Descripción"
          register={register}
          name="description"
          type="text"
          defaultValue={data?.description}
          error={errors.description}
        />
        <InputField
          label="Fecha de inicio"
          register={register}
          name="startTime"
          type="datetime-local"
          defaultValue={data?.startTime.toLocaleDateString()}
          error={errors.startTime}
        />
        <InputField
          label="Fecha de término"
          register={register}
          name="endTime"
          type="datetime-local"
          defaultValue={data?.endTime.toLocaleDateString()}
          error={errors.endTime}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Salón</label>
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

export default EventForm;
