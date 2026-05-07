import { z } from "zod";

export const teacherSchema = z.object({
  username: z
    .string()
    .min(2, { error: "Debe contar con al menos 2 caracteres" })
    .max(15, {
      error: "El nombre de usuario debe tener un máximo de 15 caracteres",
    }),
  email: z.email({ error: "Correo electrónico no válido" }),
  password: z
    .string()
    .min(8, { error: "La contraseña debe tener al menos 8 caracteres" })
    .max(20, { error: "La contraseña debe tener menos de 20 caracteres" })
    .regex(/[0-9]/, { error: "Debe contener al menos un número" })
    .regex(/[A-Z]/, { error: "Debe contener al menos una letra mayúscula" })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Debe contener al menos un carácter especial",
    }),
  firstName: z.string().min(1, { error: "El nombre es obligatorio" }),
  lastName: z.string().min(1, { error: "El apellido es obligatorio" }),
  phone: z.string().regex(/^\d{9}$/, { error: "Número de teléfono no válido" }),
  address: z.string().min(5, { error: "Número de teléfono no válido" }),
  bloodType: z.string().min(1, { error: "Campo obligatorio" }),
  birthday: z.date({ error: "Fecha de nacimiento obligaotoria" }),
  img: z.instanceof(File, { error: "Debe subir una imagen" }),
});
