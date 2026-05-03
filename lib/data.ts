export const menuItems = [
  {
    title: "Menú",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "Maestros",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Estudiantes",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Padres",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Materias",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Cursos",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/lesson.png",
        label: "Lecciones",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Exámanes",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Tareas",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "Resultados",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/attendance.png",
        label: "Asistencia",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "Eventos",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "Mensajes",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Anuncios",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "Otros",
    items: [
      {
        icon: "/profile.png",
        label: "Perfil",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Configuración",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Cerrar sesión",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

export const calendarEvents = [
  {
    title: "Math",
    allDay: false,
    start: new Date(2026, 4, 1, 8, 0),
    end: new Date(2026, 4, 1, 8, 45),
  },
  {
    title: "English",
    allDay: false,
    start: new Date(2026, 4, 1, 9, 0),
    end: new Date(2026, 4, 1, 9, 45),
  },
  {
    title: "Biology",
    allDay: false,
    start: new Date(2026, 4, 1, 10, 0),
    end: new Date(2026, 4, 1, 10, 45),
  },
  {
    title: "Physics",
    allDay: false,
    start: new Date(2026, 4, 5, 11, 0),
    end: new Date(2026, 4, 5, 11, 45),
  },
  {
    title: "Chemistry",
    allDay: false,
    start: new Date(2026, 4, 5, 13, 0),
    end: new Date(2026, 4, 5, 13, 45),
  },
  {
    title: "History",
    allDay: false,
    start: new Date(2026, 4, 5, 14, 0),
    end: new Date(2026, 4, 5, 14, 45),
  },
  {
    title: "English",
    allDay: false,
    start: new Date(2026, 4, 6, 9, 0),
    end: new Date(2026, 4, 6, 9, 45),
  },
  {
    title: "Biology",
    allDay: false,
    start: new Date(2026, 4, 6, 10, 0),
    end: new Date(2026, 4, 6, 10, 45),
  },
  {
    title: "Physics",
    allDay: false,
    start: new Date(2026, 4, 6, 11, 0),
    end: new Date(2026, 4, 6, 11, 45),
  },

  {
    title: "History",
    allDay: false,
    start: new Date(2026, 4, 7, 14, 0),
    end: new Date(2026, 4, 7, 14, 45),
  },
  {
    title: "Math",
    allDay: false,
    start: new Date(2026, 4, 7, 8, 0),
    end: new Date(2026, 4, 7, 8, 45),
  },
  {
    title: "Biology",
    allDay: false,
    start: new Date(2026, 4, 7, 10, 0),
    end: new Date(2026, 4, 7, 10, 45),
  },

  {
    title: "Chemistry",
    allDay: false,
    start: new Date(2026, 4, 7, 13, 0),
    end: new Date(2026, 4, 7, 13, 45),
  },
  {
    title: "History",
    allDay: false,
    start: new Date(2026, 4, 7, 14, 0),
    end: new Date(2026, 4, 7, 14, 45),
  },
  {
    title: "English",
    allDay: false,
    start: new Date(2026, 4, 7, 9, 0),
    end: new Date(2026, 4, 7, 9, 45),
  },
  {
    title: "Biology",
    allDay: false,
    start: new Date(2026, 4, 7, 10, 0),
    end: new Date(2026, 4, 7, 10, 45),
  },
  {
    title: "Physics",
    allDay: false,
    start: new Date(2026, 4, 7, 11, 0),
    end: new Date(2026, 4, 7, 11, 45),
  },

  {
    title: "History",
    allDay: false,
    start: new Date(2026, 4, 8, 14, 0),
    end: new Date(2026, 4, 8, 14, 45),
  },
  {
    title: "Math",
    allDay: false,
    start: new Date(2026, 4, 8, 8, 0),
    end: new Date(2026, 4, 8, 8, 45),
  },
  {
    title: "English",
    allDay: false,
    start: new Date(2026, 4, 8, 9, 0),
    end: new Date(2026, 4, 8, 9, 45),
  },

  {
    title: "Physics",
    allDay: false,
    start: new Date(2026, 4, 8, 11, 0),
    end: new Date(2026, 4, 8, 11, 45),
  },
  {
    title: "Chemistry",
    allDay: false,
    start: new Date(2026, 4, 8, 13, 0),
    end: new Date(2026, 4, 8, 13, 45),
  },
  {
    title: "History",
    allDay: false,
    start: new Date(2026, 4, 8, 14, 0),
    end: new Date(2026, 4, 8, 14, 45),
  },
];
