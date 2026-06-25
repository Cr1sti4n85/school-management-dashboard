import { z } from "zod";

export const lessonSchema = z.object({
  id: z.preprocess((val) => Number(val), z.number().optional()),
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  day: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"], {
    message: "Campo obligatorio",
  }),
  startTime: z.coerce.date({ message: "Horario de inicio obligatorio" }),
  endTime: z.coerce.date({ message: "Horario de término obligatorio" }),
  subjectId: z.coerce.number().min(1, { message: "Campo obligatorio" }),
  classId: z.coerce.number().min(1, { message: "Campo obligatorio" }),
  teacherId: z.coerce.string().min(1, { message: "Campo obligatorio" }),
});
