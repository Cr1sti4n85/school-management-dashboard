"use server";
import z from "zod";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { eventSchema } from "@/zod-schemas/event";

type InitialState = {
  success: boolean;
  message: string;
};

export const createEvent = async (
  initialState: InitialState,
  data: z.infer<typeof eventSchema>,
) => {
  try {
    await prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
        classId: data.classId || null,
      },
    });

    revalidatePath("/list/events");
    return { success: true, message: "Evento creada correctamente" };
  } catch {
    return { success: false, message: "Error al crear evento" };
  }
};

export const updateEvent = async (
  initialState: InitialState,
  data: z.infer<typeof eventSchema>,
) => {
  try {
    await prisma.event.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
        classId: data.classId,
      },
    });

    revalidatePath("/list/events");
    return { success: true, message: "Evento actualizada correctamente" };
  } catch {
    return { success: false, message: "Error al actualizar evento" };
  }
};

export const deleteEvent = async (
  initialState: InitialState,
  data: FormData,
) => {
  const id = data.get("id") as string;
  try {
    await prisma.event.delete({
      where: {
        id: parseInt(id),
      },
    });

    return { success: true, message: "Evento eliminada correctamente" };
  } catch {
    return { success: false, message: "Error al eliminar evento" };
  }
};
