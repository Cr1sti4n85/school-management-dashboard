"use server";
import z from "zod";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { teacherSchema } from "@/zod-schemas/teacher";
import { clerkClient } from "@clerk/nextjs/server";

type InitialState = {
  success: boolean;
  message: string;
};

export const createTeacher = async (
  initialState: InitialState,
  data: z.infer<typeof teacherSchema>,
) => {
  try {
    const client = await clerkClient();
    const user = await client.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "teacher" },
    });

    await prisma.teacher.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        birthday: data.birthday,
        subjects: {
          connect: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });

    revalidatePath("/list/teachers");
    return { success: true, message: "Maestro registrado correctamente" };
  } catch {
    return { success: false, message: "Error al registrar maestro" };
  }
};

export const updateTeacher = async (
  initialState: InitialState,
  data: z.infer<typeof teacherSchema>,
) => {
  try {
    await prisma.teacher.update({
      where: {
        id: data.id,
      },
      data,
    });

    revalidatePath("/list/teachers");
    return { success: true, message: "Información actualizada correctamente" };
  } catch {
    return { success: false, message: "Error al actualizar maestro" };
  }
};

export const deleteTeacher = async (
  initialState: InitialState,
  data: FormData,
) => {
  const id = data.get("id") as string;
  try {
    await prisma.teacher.delete({
      where: {
        id,
      },
    });

    return { success: true, message: "Maestro eliminado correctamente" };
  } catch {
    return { success: false, message: "Error al eliminar maestro" };
  }
};
