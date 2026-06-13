import { getAttendancePercentage } from "@/lib/queries/studentQueries";

const StudentAttendanceCard = async ({ id }: { id: string }) => {
  const attendance = await getAttendancePercentage(id);

  return (
    <div>
      <h2 className="text-xl font-semibold">{attendance}%</h2>
      <span className="text-sm text-gray-400">Asistencia</span>
    </div>
  );
};

export default StudentAttendanceCard;
