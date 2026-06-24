"use server";
import z from "zod";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";
import { parentSchema } from "@/zod-schemas/parent";

type InitialState = {
  success: boolean;
  message: string;
};

export const createParent = async (
  initialState: InitialState,
  data: z.infer<typeof parentSchema>,
) => {
  try {
    const client = await clerkClient();
    const user = await client.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "parent" },
    });
    await prisma.parent.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone,
        address: data.address,
      },
    });

    revalidatePath("/list/parents");
    return { success: true, message: "Tutor registrado correctamente" };
  } catch {
    return { success: false, message: "Error al registrar tutor" };
  }
};

export const updateParent = async (
  initialState: InitialState,
  data: z.infer<typeof parentSchema>,
) => {
  if (!data.id) return { success: false, message: "Error al actualizar padre" };
  try {
    const client = await clerkClient();

    await client.users.updateUser(data.id, {
      username: data.username,
      ...(data.password !== "" && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
    });

    await prisma.teacher.update({
      where: {
        id: data.id,
      },
      data: {
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone,
        address: data.address,
      },
    });

    revalidatePath("/list/parents");
    return { success: true, message: "Información actualizada correctamente" };
  } catch {
    return { success: false, message: "Error al actualizar tutor" };
  }
};

export const deleteParent = async (
  initialState: InitialState,
  data: FormData,
) => {
  const id = data.get("id") as string;
  try {
    const client = await clerkClient();
    await client.users.deleteUser(id);

    await prisma.teacher.delete({
      where: {
        id,
      },
    });

    return { success: true, message: "Tutor eliminado correctamente" };
  } catch {
    return { success: false, message: "Error al eliminar tutor" };
  }
};
