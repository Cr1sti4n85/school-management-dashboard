import { getTeachersLessons } from "@/lib/queries/lessonQueries";
import BigCalendar from "./BigCalendar";

type Props = {
  type: "teacherId" | "classId";
  id: string | number;
};

const BigCalendarContainer = async ({ type, id }: Props) => {
  const lessonsData = await getTeachersLessons(type, id);
  return (
    <div>
      <BigCalendar lessonsData={lessonsData} />
    </div>
  );
};

export default BigCalendarContainer;
