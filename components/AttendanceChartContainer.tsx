import Image from "next/image";
import AttendanceChart from "./AttendanceChart";
import { getAttendance } from "@/lib/queries/adminHomeQueries";

const AttendanceChartContainer = async () => {
  const attendanceData = await getAttendance();
  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Asistencia</h1>
        <Image src="/moreDark.png" alt="more" width={20} height={20} />
      </div>
      <AttendanceChart attendanceData={attendanceData} />
    </div>
  );
};

export default AttendanceChartContainer;
