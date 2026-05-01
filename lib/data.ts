export const menuItems = [
  {
    title: "Menú",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "maestro", "estudiante", "padre"],
      },
      {
        icon: "/teacher.png",
        label: "Maestros",
        href: "/list/teachers",
        visible: ["admin", "maestro"],
      },
      {
        icon: "/student.png",
        label: "Estudiantes",
        href: "/list/students",
        visible: ["admin", "maestro"],
      },
      {
        icon: "/parent.png",
        label: "Padres",
        href: "/list/parents",
        visible: ["admin", "maestro"],
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
        visible: ["admin", "maestro"],
      },
      {
        icon: "/lesson.png",
        label: "Lecciones",
        href: "/list/lessons",
        visible: ["admin", "maestro"],
      },
      {
        icon: "/exam.png",
        label: "Exámanes",
        href: "/list/exams",
        visible: ["admin", "maestro", "estudiante", "padre"],
      },
      {
        icon: "/assignment.png",
        label: "Tareas",
        href: "/list/assignments",
        visible: ["admin", "maestro", "estudiante", "padre"],
      },
      {
        icon: "/result.png",
        label: "Resultados",
        href: "/list/results",
        visible: ["admin", "maestro", "estudiante", "padre"],
      },
      {
        icon: "/attendance.png",
        label: "Asistencia",
        href: "/list/attendance",
        visible: ["admin", "maestro", "estudiante", "padre"],
      },
      {
        icon: "/calendar.png",
        label: "Eventos",
        href: "/list/events",
        visible: ["admin", "maestro", "estudiante", "padre"],
      },
      {
        icon: "/message.png",
        label: "Mensajes",
        href: "/list/messages",
        visible: ["admin", "maestro", "estudiante", "padre"],
      },
      {
        icon: "/announcement.png",
        label: "Anuncios",
        href: "/list/announcements",
        visible: ["admin", "maestro", "estudiante", "padre"],
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
        visible: ["admin", "maestro", "estudiante", "padre"],
      },
      {
        icon: "/setting.png",
        label: "Configuración",
        href: "/settings",
        visible: ["admin", "maestro", "estudiante", "padre"],
      },
      {
        icon: "/logout.png",
        label: "Cerrar sesión",
        href: "/logout",
        visible: ["admin", "maestro", "estudiante", "padre"],
      },
    ],
  },
];
