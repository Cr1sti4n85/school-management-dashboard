import { z } from "zod";

export const eventSchema = z.object({
  id: z.preprocess((val) => Number(val), z.number().optional()),
  title: z.string().min(1, { message: "El nombre es obligatorio" }),
  description: z.string().min(1, { message: "La descripción es obligatoria" }),
  startTime: z.coerce.date({ message: "Fecha de inicio obligatoria" }),
  endTime: z.coerce.date({ message: "Fecha de término obligatoria" }),
  classId: z.coerce.number().min(1, { message: "Campo obligatorio" }),
});
