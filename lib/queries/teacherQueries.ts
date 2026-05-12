import { Class, Prisma, Subject, Teacher } from "@/generated/prisma/client";
import { ITEMS_PER_PAGE } from "../constants";
import { prisma } from "../prisma";

export type TeacherList = Teacher & {
  subjects: Subject[];
} & {
  classes: Class[];
};

export const getTeachersAndCount = async (
  page: number,
  queryParams: unknown,
): Promise<{
  data: TeacherList[];
  count: number;
}> => {
  const query: Prisma.TeacherWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lessons = {
              some: {
                classId: parseInt(value),
              },
            };
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
    prisma.teacher.findMany({
      where: query,
      include: {
        subjects: true,
        classes: true,
      },
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
    }),
    prisma.teacher.count({
      where: query,
    }),
  ]);
  return { data, count };
};
