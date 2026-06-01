import { prisma } from "../prisma";

type RoleTypes = "admin" | "teacher" | "student" | "parent";

export const getCardsData = async (role: RoleTypes) => {
  const modelType: Record<RoleTypes, { count: () => Promise<number> }> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };
  const count = await modelType[role].count();
  return count;
};
