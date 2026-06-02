import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import { getSessionObj } from "@/lib/queries/getSession";

const TeacherPage = async () => {
  const { userId } = await getSessionObj();
  return (
    <section className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w:2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Horario</h1>
          {userId && <BigCalendarContainer type={"teacherId"} id={userId} />}
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </section>
  );
};

export default TeacherPage;
