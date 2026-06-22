"use server";
import z from "zod";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { getSessionObj } from "../queries/getSession";
import { getLessonByTeacher } from "../queries/lessonQueries";
import { assignmentSchema } from "@/zod-schemas/assignment";

type InitialState = {
  success: boolean;
  message: string;
};

export const createAssignment = async (
  initialState: InitialState,
  data: z.infer<typeof assignmentSchema>,
) => {
  try {
    const { role, userId } = await getSessionObj();
    if (role === "teacher") {
      const teacherLesson = await getLessonByTeacher(userId!, data.lessonId);
      if (!teacherLesson)
        return { success: false, message: "Acción no permitida" };
    }

    await prisma.assignment.create({
      data: {
        title: data.title,
        startDate: data.startDate,
        dueDate: data.dueDate,
        lessonId: data.lessonId,
      },
    });

    revalidatePath("/list/assignments");
    return { success: true, message: "Tarea creada correctamente" };
  } catch {
    return { success: false, message: "Error al crear tarea" };
  }
};

export const updateAssignment = async (
  initialState: InitialState,
  data: z.infer<typeof assignmentSchema>,
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
        startDate: data.startDate,
        dueDate: data.dueDate,
        lessonId: data.lessonId,
      },
    });

    revalidatePath("/list/assignments");
    return { success: true, message: "Tarea actualizada correctamente" };
  } catch {
    return { success: false, message: "Error al actualizar tarea" };
  }
};

export const deleteAssignment = async (
  initialState: InitialState,
  data: FormData,
) => {
  const id = data.get("id") as string;
  try {
    const { role, userId } = await getSessionObj();
    await prisma.assignment.delete({
      where: {
        id: parseInt(id),
        ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {}),
      },
    });

    return { success: true, message: "Tarea eliminada correctamente" };
  } catch {
    return { success: false, message: "Error al eliminar tarea" };
  }
};
