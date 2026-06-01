import Announcements from "@/components/Announcements";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import CountChartContainer from "@/components/CountChartContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";

const AdminPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;
  return (
    <section className="p-4 flex gap-4 flex-col md:flex-row">
      {/*LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="admin" />
          <UserCard type="teacher" />
          <UserCard type="student" />
          <UserCard type="parent" />
        </div>
        {/*middle charts */}
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-112.5">
            <CountChartContainer />
          </div>
          <div className="w-full lg:w-2/3 h-112.5">
            <AttendanceChartContainer />
          </div>
        </div>
        {/*bottom chart */}
        <div className="w-full h-125">
          <FinanceChart />
        </div>
      </div>
      {/*RIGHT panel*/}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendarContainer searchParams={params} />
        <Announcements />
      </div>
    </section>
  );
};

export default AdminPage;
