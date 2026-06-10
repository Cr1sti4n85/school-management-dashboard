"use server";
import z from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { classSchema } from "@/zod-schemas/class";

type InitialState = {
  success: boolean;
  message: string;
};

export const createClass = async (
  initialState: InitialState,
  data: z.infer<typeof classSchema>,
) => {
  try {
    await prisma.class.create({
      data,
    });

    revalidatePath("/list/classes");
    return { success: true, message: "Salón creada correctamente" };
  } catch {
    return { success: false, message: "Error al crear el salón" };
  }
};

export const updateClass = async (
  initialState: InitialState,
  data: z.infer<typeof classSchema>,
) => {
  try {
    await prisma.class.update({
      where: {
        id: data.id,
      },
      data,
    });

    revalidatePath("/list/classes");
    return { success: true, message: "Salón actualizado correctamente" };
  } catch {
    return { success: false, message: "Error al actualizar el salón" };
  }
};

export const deleteClass = async (
  initialState: InitialState,
  data: FormData,
) => {
  const id = data.get("id") as string;
  try {
    await prisma.class.delete({
      where: {
        id: parseInt(id),
      },
    });

    return { success: true, message: "Salón eliminado correctamente" };
  } catch {
    return { success: false, message: "Error al eliminar salón" };
  }
};
