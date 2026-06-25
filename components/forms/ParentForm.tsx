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
import { parentSchema } from "@/zod-schemas/parent";
import { createParent, updateParent } from "@/lib/actions/parentActions";
import { toast } from "react-toastify";

type Props = {
  type: "create" | "update";
  setOpen: Dispatch<SetStateAction<boolean>>;
  data?: z.infer<typeof parentSchema>;
};

const ParentForm = ({ type, setOpen, data }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof parentSchema>>({
    resolver: zodResolver(parentSchema) as Resolver<
      z.infer<typeof parentSchema>
    >,
  });

  const [state, formAction, pending] = useActionState(
    type === "create" ? createParent : updateParent,
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
        {`${type === "create" ? "Registrar" : "Actualizar"}`} padre/madre
      </h1>
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

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Nombre"
          register={register}
          name="name"
          type="text"
          defaultValue={data?.name}
          error={errors.name}
        />
        <InputField
          label="Apellido"
          register={register}
          name="surname"
          type="text"
          defaultValue={data?.surname}
          error={errors.surname}
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

export default ParentForm;
