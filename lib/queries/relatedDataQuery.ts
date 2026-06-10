import { prisma } from "../prisma";

export type SubjectRelatedData = {
  teachers: {
    id: string;
    name: string;
    surname: string;
  }[];
};

export const getRelatedData = async (type: string, table: string) => {
  let relatedData: SubjectRelatedData = {} as SubjectRelatedData;

  if (type !== "delete") {
    switch (table) {
      case "subject":
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: subjectTeachers };

        break;

      default:
        break;
    }
  }

  return relatedData;
};
