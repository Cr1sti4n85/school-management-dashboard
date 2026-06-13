import { Prisma, Teacher, Class } from "@/generated/prisma/client";
import { ITEMS_PER_PAGE } from "../constants";
import { prisma } from "../prisma";

export type ClassList = Class & { supervisor: Teacher | null };

export const getClassesAndCount = async (
  page: number,
  queryParams: unknown,
): Promise<{
  data: ClassList[];
  count: number;
}> => {
  const query: Prisma.ClassWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "supervisorId":
            query.supervisorId = value;
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.class.findMany({
      where: query,
      include: {
        supervisor: true,
      },
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
    }),
    prisma.class.count({
      where: query,
    }),
  ]);
  return { data, count };
};

//Get class by student id
export const getClassByStudentId = async (id: string) => {
  const singleClass = await prisma.class.findFirst({
    where: {
      students: {
        some: { id },
      },
    },
  });
  return singleClass;
};

export const getSingleClass = async (id: number) => {
  const classItem = await prisma.class.findUnique({
    where: {
      id,
    },
    include: {
      _count: { select: { students: true } },
    },
  });
  return classItem;
};
