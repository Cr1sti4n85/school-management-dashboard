"use server";
import { subjectSchema } from "@/zod-schemas/subject";
import z from "zod";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

type InitialState = {
  success: boolean;
  message: string;
};

export const createSubject = async (
  initialState: InitialState,
  data: z.infer<typeof subjectSchema>,
) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    revalidatePath("/list/subjects");
    return { success: true, message: "Materia creada correctamente" };
  } catch {
    return { success: false, message: "Error al crear la materia" };
  }
};

export const updateSubject = async (
  initialState: InitialState,
  data: z.infer<typeof subjectSchema>,
) => {
  try {
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    revalidatePath("/list/subjects");
    return { success: true, message: "Materia actualizada correctamente" };
  } catch {
    return { success: false, message: "Error al actualizar la materia" };
  }
};

export const deleteSubject = async (
  initialState: InitialState,
  data: FormData,
) => {
  const id = data.get("id") as string;
  try {
    await prisma.subject.delete({
      where: {
        id: parseInt(id),
      },
    });

    return { success: true, message: "Materia eliminada correctamente" };
  } catch {
    return { success: false, message: "Error al eliminar la materia" };
  }
};
