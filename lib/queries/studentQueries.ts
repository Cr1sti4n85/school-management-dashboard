import { Class, Prisma, Student } from "@/generated/prisma/client";
import { ITEMS_PER_PAGE } from "../constants";
import { prisma } from "../prisma";

export type StudentsList = Student & { class: Class };

export const getStudentsAndCount = async (
  page: number,
  queryParams: unknown,
): Promise<{
  data: StudentsList[];
  count: number;
}> => {
  const query: Prisma.StudentWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId":
            query.class = {
              lessons: {
                some: {
                  teacherId: value,
                },
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
    prisma.student.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
    }),
    prisma.student.count({
      where: query,
    }),
  ]);
  return { data, count };
};

export const getStudentById = async (id: string) => {
  const student:
    | (Student & { class: Class & { _count: { lessons: number } } })
    | null = await prisma.student.findUnique({
    where: {
      id,
    },
    include: {
      class: {
        include: {
          _count: { select: { lessons: true } },
        },
      },
    },
  });
  return student;
};

export const getAttendancePercentage = async (id: string) => {
  const attendance = await prisma.attendance.findMany({
    where: {
      studentId: id,
      date: {
        gte: new Date(new Date().getFullYear(), 0, 1),
      },
    },
  });
  const totalDays = attendance.length;
  const daysPresent = attendance.filter((item) => item.present).length;
  const percentage = (daysPresent / totalDays) * 100;

  return percentage;
};

export const getStudentsByParent = async (id: string) => {
  const students = await prisma.student.findMany({
    where: {
      parentId: id,
    },
  });
  return students;
};
