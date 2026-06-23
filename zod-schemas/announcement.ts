import { z } from "zod";

export const announcementSchema = z.object({
  id: z.preprocess((val) => Number(val), z.number().optional()),
  title: z.string().min(1, { message: "El nombre es obligatorio" }),
  description: z.string().min(1, { message: "La descripción es obligatoria" }),
  date: z.coerce.date({ message: "Fecha de inicio obligatoria" }),
  classId: z.coerce.number().min(1, { message: "Campo obligatorio" }),
});
