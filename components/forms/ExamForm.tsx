"use client";
import { teacherSchema } from "@/zod-schemas/teacher";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import z from "zod";
import Image from "next/image";

type Props = {
  type: "create" | "update" | "delete";
  data?: z.infer<typeof teacherSchema>;
};

const ExamForm = ({ type, data }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof teacherSchema>>({
    resolver: zodResolver(teacherSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Registrar nuevo examen</h1>
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
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Nombre"
          register={register}
          name="firstName"
          defaultValue={data?.firstName}
          error={errors.firstName}
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
          defaultValue={data?.birthday.toString()}
          error={errors.birthday}
        />
        <div className="flex gap-2 w-full justify-center items-center">
          <label
            htmlFor="img"
            className=" cursor-pointer text-xs text-gray-500 flex items-center gap-2"
          >
            <Image src="/upload.png" alt="upload icon" width={28} height={28} />
            <span>Sube una foto</span>
          </label>
          <input id="img" type="file" {...register("img")} className="hidden" />
          {errors?.img?.message && (
            <p className="text-red-500 text-xs">{errors?.img.message}</p>
          )}
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Crear" : "Actualizar"}
      </button>
    </form>
  );
};

export default ExamForm;
