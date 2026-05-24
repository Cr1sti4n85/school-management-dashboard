import { Class, Prisma, Event } from "@/generated/prisma/client";
import { ITEMS_PER_PAGE } from "../constants";
import { prisma } from "../prisma";

export type EventList = Event & { class: Class | null };

export const getEventsAndCount = async (
  page: number,
  queryParams: unknown,
): Promise<{
  data: EventList[];
  count: number;
}> => {
  const query: Prisma.EventWhereInput = {};

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
    prisma.event.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
    }),
    prisma.event.count({
      where: query,
    }),
  ]);
  return { data, count };
};
