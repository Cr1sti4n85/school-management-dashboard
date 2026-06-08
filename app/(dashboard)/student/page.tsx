import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendar from "@/components/EventCalendar";
import { getClassByStudentId } from "@/lib/queries/classQueries";
import { getSessionObj } from "@/lib/queries/getSession";

const StudentPage = async () => {
  const { userId } = await getSessionObj();
  if (!userId) return null;
  const studentClass = await getClassByStudentId(userId);
  return (
    <section className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w:2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Horario (4A)</h1>
          {studentClass ? (
            <BigCalendarContainer type={"classId"} id={studentClass?.id} />
          ) : null}
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </section>
  );
};

export default StudentPage;
