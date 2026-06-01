import { Prisma, Exam } from "@/generated/prisma/client";
import { ITEMS_PER_PAGE } from "../constants";
import { prisma } from "../prisma";
import { getSessionObj } from "./getSession";

export type ExamList = Exam & {
  lesson: {
    subject: { name: string };
    class: { name: string };
    teacher: { name: string; surname: string };
  };
};

export const getExamsAndCount = async (
  page: number,
  queryParams: unknown,
): Promise<{
  data: ExamList[];
  count: number;
}> => {
  const query: Prisma.ExamWhereInput = {};
  query.lesson = {};
  const { role, userId } = await getSessionObj();

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lesson.classId = parseInt(value);
            break;
          case "teacherId":
            query.lesson.teacherId = value;
            break;

          case "search":
            query.lesson.subject = {
              name: { contains: value, mode: "insensitive" },
            };

            break;
          default:
            break;
        }
      }
    }
  }

  //ROLE Conditions
  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.lesson.teacherId = userId!;
      break;
    case "student":
      query.lesson.class = { students: { some: { id: userId! } } };
      break;
    case "parent":
      query.lesson.class = {
        students: {
          some: { parentId: userId! },
        },
      };
    default:
      break;
  }

  const [data, count] = await prisma.$transaction([
    prisma.exam.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
            class: { select: { name: true } },
          },
        },
      },
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
    }),
    prisma.exam.count({
      where: query,
    }),
  ]);
  return { data, count };
};
