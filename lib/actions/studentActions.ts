"use server";
import z from "zod";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";
import { studentSchema } from "@/zod-schemas/student";
import { getSingleClass } from "../queries/classQueries";

type InitialState = {
  success: boolean;
  message: string;
};

export const createStudent = async (
  initialState: InitialState,
  data: z.infer<typeof studentSchema>,
) => {
  try {
    const classItem = await getSingleClass(data.classId);

    if (classItem && classItem.capacity === classItem._count.students) {
      return { success: false, message: "El salón no tiene más cupos" };
    }
    const client = await clerkClient();

    const user = await client.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.lastName,
      publicMetadata: { role: "student" },
    });

    await prisma.student.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        lastName: data.lastName,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });

    revalidatePath("/list/students");
    return { success: true, message: "Estudiante registrado correctamente" };
  } catch {
    return { success: false, message: "Error al registrar estudiante" };
  }
};

export const updateStudent = async (
  initialState: InitialState,
  data: z.infer<typeof studentSchema>,
) => {
  if (!data.id)
    return { success: false, message: "Error al actualizar maestro" };
  try {
    const client = await clerkClient();

    await client.users.updateUser(data.id, {
      username: data.username,
      ...(data.password !== "" && { password: data.password }),
      firstName: data.name,
      lastName: data.lastName,
    });

    await prisma.student.update({
      where: {
        id: data.id,
      },
      data: {
        username: data.username,
        name: data.name,
        lastName: data.lastName,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });

    revalidatePath("/list/students");
    return { success: true, message: "Información actualizada correctamente" };
  } catch (error: any) {
    console.log({ error });
    return { success: false, message: "Error al actualizar estudiante" };
  }
};

export const deleteStudent = async (
  initialState: InitialState,
  data: FormData,
) => {
  const id = data.get("id") as string;
  try {
    const client = await clerkClient();
    await client.users.deleteUser(id);

    await prisma.student.delete({
      where: {
        id,
      },
    });

    return { success: true, message: "Estudiante eliminado correctamente" };
  } catch {
    return { success: false, message: "Error al eliminar estudiante" };
  }
};
