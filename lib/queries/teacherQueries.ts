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

export const getTeacherById = async (id: string) => {
  const teacher:
    | (Teacher & {
        _count: {
          subjects: number;
          classes: number;
          lessons: number;
        };
      })
    | null = await prisma.teacher.findUnique({
    where: {
      id,
    },
    include: {
      _count: {
        select: {
          subjects: true,
          classes: true,
          lessons: true,
        },
      },
    },
  });
  return teacher;
};
