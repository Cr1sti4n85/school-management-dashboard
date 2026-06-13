import { z } from "zod";

export const studentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(2, { message: "Debe contar con al menos 2 caracteres" })
    .max(15, {
      message: "El nombre de usuario debe tener un máximo de 15 caracteres",
    }),
  email: z.email({ message: "Correo electrónico no válido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(20, { message: "La contraseña debe tener menos de 20 caracteres" })
    .regex(/[0-9]/, { message: "Debe contener al menos un número" })
    .regex(/[A-Z]/, { message: "Debe contener al menos una letra mayúscula" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Debe contener al menos un carácter especial",
    })
    .or(z.literal("")),
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  lastName: z.string().min(1, { message: "El apellido es obligatorio" }),
  phone: z
    .string()
    .regex(/^\d{9}$/, { message: "Número de teléfono no válido" }),
  address: z.string().min(5, { message: "Número de teléfono no válido" }),
  bloodType: z.string().min(1, { message: "Campo obligatorio" }),
  birthday: z.date({ message: "Fecha de nacimiento obligaotoria" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Campo obligatorio" }),
  img: z.url().optional(),
  gradeId: z.coerce.number().min(1, { message: "Campo obligatorio" }),
  classId: z.coerce.number().min(1, { message: "Campo obligatorio" }),
  parentId: z.coerce.string().min(1, { message: "Id del padre obligatorio" }),
});
