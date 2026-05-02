import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import UserCard from "@/components/UserCard";

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/*LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="estudiante" />
          <UserCard type="maestro" />
          <UserCard type="padre" />
          <UserCard type="staff" />
        </div>
        {/*middle charts */}
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-112.5">
            <CountChart />
          </div>
          <div className="w-full lg:w-2/3 h-112.5">
            <AttendanceChart />
          </div>
        </div>
        {/*bottom chart */}
        <div></div>
      </div>
      {/*RIGHT */}
      <div className="w-full lg:w-1/3"></div>
    </div>
  );
};

export default AdminPage;
