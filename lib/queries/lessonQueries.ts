import {
  Prisma,
  Subject,
  Lesson,
  Class,
  Teacher,
} from "@/generated/prisma/client";
import { ITEMS_PER_PAGE } from "../constants";
import { prisma } from "../prisma";
import { stripTimezone } from "../utils";

export type LessonList = Lesson & { subject: Subject } & { class: Class } & {
  teacher: Teacher;
};

export const getLessonsAndCount = async (
  page: number,
  queryParams: unknown,
): Promise<{
  data: LessonList[];
  count: number;
}> => {
  const query: Prisma.LessonWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId":
            query.teacherId = value;
            break;
          case "classId":
            query.classId = parseInt(value);
            break;
          case "search":
            query.OR = [
              { subject: { name: { contains: value, mode: "insensitive" } } },
              { teacher: { name: { contains: value, mode: "insensitive" } } },
            ];
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: query,
      include: {
        subject: true,
        class: true,
        teacher: true,
      },
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
    }),
    prisma.lesson.count({
      where: query,
    }),
  ]);
  return { data, count };
};

//TEACHER PAGE
export const getTeachersLessons = async (
  type: "teacherId" | "classId",
  id: string | number,
) => {
  const data = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId"
        ? { teacherId: id as string }
        : { classId: id as number }),
    },
  });
  const formattedData = data.map((lesson) => ({
    title: lesson.name,
    start: stripTimezone(lesson.startTime),
    end: stripTimezone(lesson.endTime),
  }));
  return formattedData;
};

//EXAMS
export const getLessonByTeacher = async (userId: string, lessonId: number) => {
  const teacherLesson = await prisma.lesson.findFirst({
    where: {
      id: lessonId,
      teacherId: userId,
    },
  });
  return teacherLesson;
};
