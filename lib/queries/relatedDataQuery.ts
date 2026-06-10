import { prisma } from "../prisma";

export type SubjectRelatedData = {
  teachers: {
    id: string;
    name: string;
    surname: string;
  }[];
};

export type ClassRelatedData = {
  grades: {
    level: number;
    id: number;
  }[];
  teachers: {
    id: string;
    name: string;
    surname: string;
  }[];
};

export const getRelatedData = async (type: string, table: string) => {
  let relatedData: SubjectRelatedData | ClassRelatedData | null = null;

  if (type !== "delete") {
    switch (table) {
      case "subject":
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: subjectTeachers };
        break;
      case "class":
        const classGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const classTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: classTeachers, grades: classGrades };
        break;

      default:
        break;
    }
  }

  return relatedData;
};
