import { prisma } from "../prisma";
import { getSessionObj } from "./getSession";

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

export type ExamRelatedData = {
  lessons: {
    id: number;
    name: string;
  }[];
};

export type AssignmentRelatedData = {
  lessons: {
    id: number;
    name: string;
  }[];
};

export type AnnouncementRelatedData = {
  classes: {
    id: number;
    name: string;
  }[];
};

export type EventRelatedData = {
  classes: {
    id: number;
    name: string;
  }[];
};

export type LessonRelatedData = {
  classes: {
    id: number;
    name: string;
  }[];
  subjects: {
    id: number;
    name: string;
  }[];
  teachers: {
    id: string;
    name: string;
  }[];
};

export const getRelatedData = async (type: string, table: string) => {
  let relatedData:
    | SubjectRelatedData
    | ClassRelatedData
    | TeacherRelatedData
    | StudentRelatedData
    | ExamRelatedData
    | AssignmentRelatedData
    | AnnouncementRelatedData
    | EventRelatedData
    | LessonRelatedData
    | null = null;

  if (type !== "delete") {
    const { role, userId } = await getSessionObj();

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
      case "exam":
        const examLessons = await prisma.lesson.findMany({
          where: {
            ...(role === "teacher" ? { teacherId: userId! } : {}),
          },
          select: {
            id: true,
            name: true,
          },
        });
        relatedData = { lessons: examLessons };
        break;
      case "assignment":
        const assignmentLessons = await prisma.lesson.findMany({
          where: {
            ...(role === "teacher" ? { teacherId: userId! } : {}),
          },
          select: {
            id: true,
            name: true,
          },
        });
        relatedData = { lessons: assignmentLessons };
        break;
      case "announcement":
        const announcementClasses = await prisma.class.findMany({
          select: {
            id: true,
            name: true,
          },
        });
        relatedData = { classes: announcementClasses };
        break;
      case "event":
        const eventClasses = await prisma.class.findMany({
          select: {
            id: true,
            name: true,
          },
        });
        relatedData = { classes: eventClasses };
        break;
      case "lesson":
        const lessonClasses = await prisma.class.findMany({
          select: {
            id: true,
            name: true,
          },
        });
        const lessonSubjects = await prisma.subject.findMany({
          select: {
            id: true,
            name: true,
          },
        });
        const lessonTeachers = await prisma.teacher.findMany({
          select: {
            id: true,
            name: true,
          },
        });
        relatedData = {
          classes: lessonClasses,
          subjects: lessonSubjects,
          teachers: lessonTeachers,
        };
        break;
      default:
        break;
    }
  }

  return relatedData;
};
