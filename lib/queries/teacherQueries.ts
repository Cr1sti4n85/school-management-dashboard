import { Class, Subject, Teacher } from "@/generated/prisma/client";
import { ITEMS_PER_PAGE } from "../constants";
import { prisma } from "../prisma";

export type TeacherList = Teacher & {
  subjects: Subject[];
} & {
  classes: Class[];
};

export const getTeachersAndCount = async (
  page: number,
): Promise<{
  data: TeacherList[];
  count: number;
}> => {
  const [data, count] = await prisma.$transaction([
    prisma.teacher.findMany({
      include: {
        subjects: true,
        classes: true,
      },
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
    }),
    prisma.teacher.count(),
  ]);
  return { data, count };
};
