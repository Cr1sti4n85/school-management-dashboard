import { Subject, Prisma, Teacher } from "@/generated/prisma/client";
import { ITEMS_PER_PAGE } from "../constants";
import { prisma } from "../prisma";

export type SubjectList = Subject & { teachers: Teacher[] };

export const getSubjectsAndCount = async (
  page: number,
  queryParams: unknown,
): Promise<{
  data: SubjectList[];
  count: number;
}> => {
  const query: Prisma.SubjectWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
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
    prisma.subject.findMany({
      where: query,
      include: {
        teachers: true,
      },
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
    }),
    prisma.subject.count({
      where: query,
    }),
  ]);
  return { data, count };
};
