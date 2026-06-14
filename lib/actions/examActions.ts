"use server";
import z from "zod";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { examSchema } from "@/zod-schemas/exam";
import { getSessionObj } from "../queries/getSession";
import { getLessonByTeacher } from "../queries/lessonQueries";

type InitialState = {
  success: boolean;
  message: string;
};

export const createExam = async (
  initialState: InitialState,
  data: z.infer<typeof examSchema>,
) => {
  try {
    const { role, userId } = await getSessionObj();
    if (role === "teacher") {
      const teacherLesson = await getLessonByTeacher(userId!, data.lessonId);
      if (!teacherLesson)
        return { success: false, message: "Acción no permitida" };
    }

    await prisma.exam.create({
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    });

    revalidatePath("/list/exams");
    return { success: true, message: "Examen creado correctamente" };
  } catch {
    return { success: false, message: "Error al crear el examen" };
  }
};

export const updateExam = async (
  initialState: InitialState,
  data: z.infer<typeof examSchema>,
) => {
  try {
    const { role, userId } = await getSessionObj();
    if (role === "teacher") {
      const teacherLesson = await getLessonByTeacher(userId!, data.lessonId);
      if (!teacherLesson)
        return { success: false, message: "Acción no permitida" };
    }

    await prisma.exam.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    });

    revalidatePath("/list/exams");
    return { success: true, message: "Examen actualizado correctamente" };
  } catch {
    return { success: false, message: "Error al actualizar examen" };
  }
};

export const deleteExam = async (
  initialState: InitialState,
  data: FormData,
) => {
  const id = data.get("id") as string;
  try {
    const { role, userId } = await getSessionObj();
    await prisma.exam.delete({
      where: {
        id: parseInt(id),
        ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {}),
      },
    });

    return { success: true, message: "Examen eliminado correctamente" };
  } catch {
    return { success: false, message: "Error al eliminar examen" };
  }
};
