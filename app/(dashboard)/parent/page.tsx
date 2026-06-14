import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import { getSessionObj } from "@/lib/queries/getSession";
import { getStudentsByParent } from "@/lib/queries/studentQueries";

const ParentPage = async () => {
  const { userId } = await getSessionObj();
  if (!userId) return null;
  const students = await getStudentsByParent(userId);
  return (
    <section className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <>
        {students.map((student) => (
          <div key={student.id} className="w-full xl:w:2/3">
            <div className="h-full bg-white p-4 rounded-md">
              <h1 className="text-xl font-semibold">
                Horario ({student.name} {student.lastName})
              </h1>
              <BigCalendarContainer type="classId" id={student.classId} />
            </div>
          </div>
        ))}
      </>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </section>
  );
};

export default ParentPage;
