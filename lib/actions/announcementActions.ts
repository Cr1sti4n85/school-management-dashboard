"use server";
import z from "zod";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { announcementSchema } from "@/zod-schemas/announcement";

type InitialState = {
  success: boolean;
  message: string;
};

export const createAnnouncement = async (
  initialState: InitialState,
  data: z.infer<typeof announcementSchema>,
) => {
  try {
    await prisma.announcement.create({
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        classId: data.classId || null,
      },
    });

    revalidatePath("/list/announcements");
    return { success: true, message: "Anuncio creada correctamente" };
  } catch {
    return { success: false, message: "Error al crear anuncio" };
  }
};

export const updateAnnouncement = async (
  initialState: InitialState,
  data: z.infer<typeof announcementSchema>,
) => {
  try {
    await prisma.announcement.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        classId: data.classId,
      },
    });

    revalidatePath("/list/announcements");
    return { success: true, message: "Anuncio actualizada correctamente" };
  } catch {
    return { success: false, message: "Error al actualizar anuncio" };
  }
};

export const deleteAnnouncement = async (
  initialState: InitialState,
  data: FormData,
) => {
  const id = data.get("id") as string;
  try {
    await prisma.assignment.delete({
      where: {
        id: parseInt(id),
      },
    });

    return { success: true, message: "Anuncio eliminada correctamente" };
  } catch {
    return { success: false, message: "Error al eliminar anuncio" };
  }
};
