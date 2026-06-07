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
      data,
    });

    revalidatePath("/list/subjects");
    return { success: true, message: "Materia creada correctamente" };
  } catch {
    return { success: false, message: "Error al crear la materia" };
  }
};
