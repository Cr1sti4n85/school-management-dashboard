export const role = "admin";

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

export const teachersData = [
  {
    id: 1,
    teacherId: "7894561230",
    name: "Carlos Mendoza",
    email: "carlos.mendoza@gmail.com",
    photo:
      "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200",
    phone: "6121234567",
    subjects: ["Matemáticas", "Geometría"],
    classes: ["1B", "2A", "3C"],
    address: "Av. Insurgentes 123, Ciudad de México, México",
  },
  {
    id: 2,
    teacherId: "4561237890",
    name: "María Fernanda López",
    email: "maria.lopez@gmail.com",
    photo:
      "https://images.pexels.com/photos/936126/pexels-photo-936126.jpeg?auto=compress&cs=tinysrgb&w=1200",
    phone: "5512345678",
    subjects: ["Física", "Química"],
    classes: ["5A", "4B", "3C"],
    address: "Calle 45 #210, Ciudad de México, México",
  },
  {
    id: 3,
    teacherId: "3216549870",
    name: "José Ramírez",
    email: "jose.ramirez@gmail.com",
    photo:
      "https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1200",
    phone: "9987654321",
    subjects: ["Biología"],
    classes: ["5A", "4B", "3C"],
    address: "Av. Siempre Viva 742, Ciudad de México, México",
  },
  {
    id: 4,
    teacherId: "1597534862",
    name: "Luis Herrera",
    email: "luis.herrera@gmail.com",
    photo:
      "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200",
    phone: "3412345678",
    subjects: ["Historia"],
    classes: ["5A", "4B", "3C"],
    address: "Calle San Martín 456, Ciudad de México, México",
  },
  {
    id: 5,
    teacherId: "8523697410",
    name: "Ana Torres",
    email: "ana.torres@gmail.com",
    photo:
      "https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=1200",
    phone: "2223456789",
    subjects: ["Música", "Historia"],
    classes: ["5A", "4B", "3C"],
    address: "Av. Reforma 789, Ciudad de México, México",
  },
  {
    id: 6,
    teacherId: "9632587410",
    name: "Sofía Castillo",
    email: "sofia.castillo@gmail.com",
    photo:
      "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1200",
    phone: "8091234567",
    subjects: ["Física"],
    classes: ["5A", "4B", "3C"],
    address: "Calle Duarte 321, Ciudad de México, México",
  },
  {
    id: 7,
    teacherId: "1472583690",
    name: "Diego Morales",
    email: "diego.morales@gmail.com",
    photo:
      "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1200",
    phone: "50312345678",
    subjects: ["Inglés", "Español"],
    classes: ["5A", "4B", "3C"],
    address: "Colonia Escalón, Ciudad de México, México",
  },
  {
    id: 8,
    teacherId: "3692581470",
    name: "Valentina Rojas",
    email: "valentina.rojas@gmail.com",
    photo:
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1200",
    phone: "56912345678",
    subjects: ["Matemáticas", "Geometría"],
    classes: ["5A", "4B", "3C"],
    address: "Av. Providencia 1234, Ciudad de México, México",
  },
  {
    id: 9,
    teacherId: "2581473690",
    name: "Ricardo Gómez",
    email: "ricardo.gomez@gmail.com",
    photo:
      "https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg?auto=compress&cs=tinysrgb&w=1200",
    phone: "50498765432",
    subjects: ["Literatura", "Inglés"],
    classes: ["5A", "4B", "3C"],
    address: "Colonia Palmira, Ciudad de México, México",
  },
  {
    id: 10,
    teacherId: "7412589630",
    name: "Andrés Paredes",
    email: "andres.paredes@gmail.com",
    photo:
      "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1200",
    phone: "593987654321",
    subjects: ["Biología"],
    classes: ["5A", "4B", "3C"],
    address: "Av. Amazonas 456, Ciudad de México, México",
  },
];
