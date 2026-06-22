import { z } from "zod";

export const assignmentSchema = z.object({
  id: z.preprocess((val) => Number(val), z.number().optional()),
  title: z.string().min(1, { message: "El nombre es obligatorio" }),
  startDate: z.coerce.date({ message: "Fecha de inicio obligatoria" }),
  dueDate: z.coerce.date({ message: "Plazo de entrega obligatoria" }),
  lessonId: z.coerce.number().min(1, { message: "Campo obligatorio" }),
});
