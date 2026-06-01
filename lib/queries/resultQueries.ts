import { Prisma } from "@/generated/prisma/client";
import { ITEMS_PER_PAGE } from "../constants";
import { prisma } from "../prisma";
import { getSessionObj } from "./getSession";

export type ResultList = {
  id: number;
  title: string;
  studentName: string;
  studentSurname: string;
  teacherName: string;
  teacherSurname: string;
  className: string;
  score: number;
  startTime: Date;
};

export const getResultsAndCount = async (
  page: number,
  queryParams: unknown,
): Promise<{
  data: ResultList[];
  count: number;
}> => {
  const query: Prisma.ResultWhereInput = {};
  const { role, userId } = await getSessionObj();

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "studentId":
            query.studentId = value;
            break;

          case "search":
            query.OR = [
              { exam: { title: { contains: value, mode: "insensitive" } } },
              {
                student: {
                  name: { contains: value, mode: "insensitive" },
                },
              },
              {
                student: {
                  lastName: { contains: value, mode: "insensitive" },
                },
              },
            ];
            break;
          default:
            break;
        }
      }
    }
  }

  //Role conditions
  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.OR = [
        { exam: { lesson: { teacherId: userId! } } },
        { assignment: { lesson: { teacherId: userId! } } },
      ];
      break;

    case "student":
      query.studentId = userId!;
      break;

    case "parent":
      query.student = {
        parentId: userId!,
      };
      break;
    default:
      break;
  }

  const [dataResponse, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        student: {
          select: { name: true, lastName: true },
        },
        exam: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
        assignment: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
      },
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
    }),
    prisma.result.count({
      where: query,
    }),
  ]);

  const data = dataResponse
    .map((item) => {
      const assessment = item.exam || item.assignment;
      if (!assessment) return null;
      const isExam = "startTime" in assessment;
      return {
        id: item.id,
        title: assessment.title,
        studentName: item.student.name,
        studentSurname: item.student.lastName,
        teacherName: assessment.lesson.teacher.name,
        teacherSurname: assessment.lesson.teacher.surname,
        score: item.score,
        className: assessment.lesson.class.name,
        startTime: isExam ? assessment.startTime : assessment.startDate,
      };
    })
    .filter((item): item is ResultList => item !== null);

  return { data, count };
};
