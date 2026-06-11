import { z } from "zod";

export const classSchema = z.object({
  id: z.preprocess((val) => Number(val), z.number().optional()),
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  capacity: z.coerce
    .number()
    .min(1, { message: "La capacidad es obligatoria" }),
  gradeId: z.coerce
    .number()
    .min(1, { message: "el id del curso es obligatorio" }),
  supervisorId: z.coerce.string().optional(),
});
