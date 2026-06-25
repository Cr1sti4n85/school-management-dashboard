export const ITEMS_PER_PAGE = 5;

type RouteAccessMap = {
  [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
  "/admin(.*)": ["admin"],
  "/student(.*)": ["student"],
  "/teacher(.*)": ["teacher"],
  "/parent(.*)": ["parent"],
  "/list/teachers": ["admin", "teacher"],
  "/list/students": ["admin", "teacher"],
  "/list/parents": ["admin", "teacher"],
  "/list/subjects": ["admin"],
  "/list/classes": ["admin", "teacher"],
  "/list/exams": ["admin", "teacher", "student", "parent"],
  "/list/assignments": ["admin", "teacher", "student", "parent"],
  "/list/results": ["admin", "teacher", "student", "parent"],
  "/list/attendance": ["admin", "teacher", "student", "parent"],
  "/list/events": ["admin", "teacher", "student", "parent"],
  "/list/announcements": ["admin", "teacher", "student", "parent"],
};

export const userTypeMap: { [key: string]: string } = {
  admin: "Administradores",
  teacher: "Maestros",
  student: "Estudiantes",
  parent: "Padres",
};

export const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export const attendanceMap: {
  [key: string]: { present: number; absent: number };
} = {
  Mon: { present: 0, absent: 0 },
  Tue: { present: 0, absent: 0 },
  Wed: { present: 0, absent: 0 },
  Thu: { present: 0, absent: 0 },
  Fri: { present: 0, absent: 0 },
};

export const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
