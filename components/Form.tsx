type Props = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  id?: number;
};

const Form = ({ type, id, table }: Props) => {
  return type === "delete" && id ? (
    <form action="" className="p-4 flex flex-col gap-4">
      <span className="text-center font-medium">
        Los datos se perderán. ¿Estás seguro que quieres borrar esta {table}?
      </span>
      <button className="bg-red-700 text-white py-2 px-4 rounded-md border-md w-max self-center">
        Eliminar
      </button>
    </form>
  ) : (
    "Formulario de creación/actualización"
  );
};

export default Form;
