"use client";
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
  useState,
  useTransition,
} from "react";
import { studentSchema } from "@/zod-schemas/student";
import { StudentRelatedData } from "@/lib/queries/relatedDataQuery";
import { createStudent, updateStudent } from "@/lib/actions/studentActions";
import { toast } from "react-toastify";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";

type Props = {
  type: "create" | "update" | "delete";
  setOpen: Dispatch<SetStateAction<boolean>>;
  data?: z.infer<typeof studentSchema>;
  relatedData?: StudentRelatedData;
};

const StudentForm = ({ type, setOpen, data, relatedData }: Props) => {
  const { classes, grades } = relatedData || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(studentSchema) as Resolver<
      z.infer<typeof studentSchema>
    >,
  });

  const [state, formAction, pending] = useActionState(
    type === "create" ? createStudent : updateStudent,
    {
      success: false,
      message: "",
    },
  );
  const [, startTransition] = useTransition();
  const [img, setImg] = useState<string>("");

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setOpen(false);
    }
  }, [state, setOpen]);

  const onSubmit = handleSubmit((data) => {
    startTransition(() => {
      formAction({ ...data, img });
    });
  });
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {`${type === "create" ? "Registrar" : "Actualizar"}`} estudiante
      </h1>
      <span className="text-xs text-gray-400 font-medium">Autenticación</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Nombre usuario"
          register={register}
          name="username"
          defaultValue={data?.username}
          error={errors.username}
        />
        <InputField
          label="Email"
          register={register}
          name="email"
          type="email"
          defaultValue={data?.email}
          error={errors.email}
        />
        <InputField
          label="Password"
          register={register}
          name="password"
          type="password"
          defaultValue={data?.password}
          error={errors.password}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Información personal
      </span>
      <CldUploadWidget
        uploadPreset="school-mgmt"
        onSuccess={(result, { widget }) => {
          const { secure_url } = result.info as CloudinaryUploadWidgetInfo;
          setImg(secure_url);
          widget.close();
          toast.success("Imagen subida con éxito");
        }}
      >
        {({ open }) => {
          return (
            <div
              className=" cursor-pointer text-xs text-gray-500 flex items-center gap-2"
              onClick={() => open()}
            >
              <Image
                src="/upload.png"
                alt="upload icon"
                width={28}
                height={28}
              />
              <span>Sube una foto</span>
            </div>
          );
        }}
      </CldUploadWidget>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Nombre"
          register={register}
          name="name"
          defaultValue={data?.name}
          error={errors.name}
        />
        <InputField
          label="Apellido"
          register={register}
          name="lastName"
          defaultValue={data?.lastName}
          error={errors.lastName}
        />
        <InputField
          label="Teléfono"
          register={register}
          name="phone"
          defaultValue={data?.phone}
          error={errors.phone}
        />
        <InputField
          label="Dirección"
          register={register}
          name="address"
          defaultValue={data?.address}
          error={errors.address}
        />
        <InputField
          label="Tipo de sangre"
          register={register}
          name="bloodType"
          defaultValue={data?.bloodType}
          error={errors.bloodType}
        />
        <InputField
          label="Nacimiento"
          register={register}
          name="birthday"
          type="date"
          defaultValue={data?.birthday.toISOString().split("T")[0]}
          error={errors.birthday}
        />
        <InputField
          label="Id del tutor"
          name="parentId"
          defaultValue={data?.parentId}
          register={register}
          error={errors.parentId}
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
          <label className="text-xs text-gray-500">Sexo</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="MALE">Hombre</option>
            <option value="FEMALE">Mujer</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Nivel</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("gradeId")}
            defaultValue={data?.gradeId}
          >
            {grades?.map((grade: { id: number; level: number }) => (
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
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Salón</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("classId")}
            defaultValue={data?.classId}
          >
            {classes?.map((classItem) => (
              <option value={classItem.id} key={classItem.id}>
                ({classItem.name} - Capacidad{" "}
                {classItem._count.students + "/" + classItem.capacity})
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

export default StudentForm;
