import { prisma } from "../prisma";
import { attendanceMap, daysOfWeek } from "@/lib/constants";

type RoleTypes = "admin" | "teacher" | "student" | "parent";

export const getCardsData = async (role: RoleTypes) => {
  const modelType: Record<RoleTypes, { count: () => Promise<number> }> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };
  const count = await modelType[role].count();
  return count;
};

export const getBoysAndGirlsCount = async () => {
  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });

  const boys = data.find((b) => b.sex === "MALE")?._count || 0;
  const girls = data.find((b) => b.sex === "FEMALE")?._count || 0;

  return {
    boys,
    girls,
    total: boys + girls,
  };
};

export const getAttendance = async () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysSinceMonday);

  const attendanceData = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastMonday,
      },
    },
    select: {
      date: true,
      present: true,
    },
  });

  attendanceData.forEach((record) => {
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const dayName = daysOfWeek[dayOfWeek - 1];

      if (record.present) {
        attendanceMap[dayName].present += 1;
      } else {
        attendanceMap[dayName].absent += 1;
      }
    }
  });

  const formattedData = daysOfWeek.map((day) => ({
    name: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }));

  return formattedData;
};

export const getCalendarEvents = async (date: Date) => {
  const dataEvents = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lt: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });

  return dataEvents;
};
