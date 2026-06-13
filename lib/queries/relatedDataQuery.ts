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

export type TeacherRelatedData = {
  subjects: {
    id: number;
    name: string;
  }[];
};

export type StudentRelatedData = {
  grades: {
    id: number;
    level: number;
  }[];
  classes: {
    id: number;
    name: string;
    capacity: number;
    _count: {
      students: number;
    };
  }[];
};

export const getRelatedData = async (type: string, table: string) => {
  let relatedData:
    | SubjectRelatedData
    | ClassRelatedData
    | TeacherRelatedData
    | StudentRelatedData
    | null = null;

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
      case "teacher":
        const teacherSubjects = await prisma.subject.findMany({
          select: { id: true, name: true },
        });
        relatedData = { subjects: teacherSubjects };
        break;
      case "student":
        const studentGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const studentClasses = await prisma.class.findMany({
          include: { _count: { select: { students: true } } },
        });
        relatedData = { grades: studentGrades, classes: studentClasses };
        break;

      default:
        break;
    }
  }

  return relatedData;
};
