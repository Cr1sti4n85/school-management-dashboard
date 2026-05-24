import { Prisma, Announcement, Class } from "@/generated/prisma/client";
import { ITEMS_PER_PAGE } from "../constants";
import { prisma } from "../prisma";

export type AnnouncementList = Announcement & { class: Class | null };

export const getAnnouncementsAndCount = async (
  page: number,
  queryParams: unknown,
): Promise<{
  data: AnnouncementList[];
  count: number;
}> => {
  const query: Prisma.AnnouncementWhereInput = {};

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
