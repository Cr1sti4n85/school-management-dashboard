"use server";
import z from "zod";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { examSchema } from "@/zod-schemas/exam";
import { getSessionObj } from "../queries/getSession";
import { lessonSchema } from "@/zod-schemas/lesson";

type InitialState = {
  success: boolean;
  message: string;
};

export const createLesson = async (
  initialState: InitialState,
  data: z.infer<typeof lessonSchema>,
) => {
  try {
    await prisma.lesson.create({
      data: {
        name: data.name,
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
        classId: data.classId,
        subjectId: data.subjectId,
        teacherId: data.teacherId,
      },
    });

    revalidatePath("/list/lessons");
    return { success: true, message: "Lección creado correctamente" };
  } catch {
    return { success: false, message: "Error al crear lección" };
  }
};

export const updateLesson = async (
  initialState: InitialState,
  data: z.infer<typeof lessonSchema>,
) => {
  try {
    await prisma.exam.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
        classId: data.classId,
        subjectId: data.subjectId,
        teacherId: data.teacherId,
      },
    });

    revalidatePath("/list/lessons");
    return { success: true, message: "Lección actualizada correctamente" };
  } catch {
    return { success: false, message: "Error al actualizar lección" };
  }
};

export const deleteLesson = async (
  initialState: InitialState,
  data: FormData,
) => {
  const id = data.get("id") as string;
  try {
    await prisma.exam.delete({
      where: {
        id: parseInt(id),
      },
    });

    return { success: true, message: "Lección eliminado correctamente" };
  } catch {
    return { success: false, message: "Error al eliminar lección" };
  }
};
