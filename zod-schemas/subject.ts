import { z } from "zod";

export const subjectSchema = z.object({
  id: z.preprocess((val) => Number(val), z.number().optional()),
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
});
