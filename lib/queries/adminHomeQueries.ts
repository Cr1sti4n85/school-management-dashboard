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

export const getBoysAndGirlsCount = async () => {
  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });

  const boys = data.find((b) => b.sex === "MALE")?._count || 0;
  const girls = data.find((b) => b.sex === "FEMALE")?._count || 0;

  return {
    boys,
    girls,
    total: boys + girls,
  };
};
