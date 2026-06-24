import { Prisma, Announcement, Class } from "@/generated/prisma/client";
import { ITEMS_PER_PAGE } from "../constants";
import { prisma } from "../prisma";
import { getSessionObj } from "./getSession";

export type AnnouncementList = Announcement & { class: Class | null };

export const getAnnouncementsAndCount = async (
  page: number,
  queryParams: unknown,
): Promise<{
  data: AnnouncementList[];
  count: number;
}> => {
  const query: Prisma.AnnouncementWhereInput = {};
  const { role, userId } = await getSessionObj();
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.title = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  // ROLE CONDITIONS

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };

  if (role !== "admin") {
    query.OR = [
      { classId: null },
      {
        class: roleConditions[role as keyof typeof roleConditions] || {},
      },
    ];
  }

  const [data, count] = await prisma.$transaction([
    prisma.announcement.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
    }),
    prisma.announcement.count({
      where: query,
    }),
  ]);
  return { data, count };
};
