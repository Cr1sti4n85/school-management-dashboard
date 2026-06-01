"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = {
  attendanceData: {
    name: string;
    present: number;
    absent: number;
  }[];
};

const AttendanceChart = ({ attendanceData }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart responsive data={attendanceData} barSize={20}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
        <XAxis
          tickLine={false}
          dataKey="name"
          axisLine={false}
          tick={{ fill: "#d1d5db" }}
        />
        <YAxis
          width="auto"
          axisLine={false}
          tick={{ fill: "#d1d5db" }}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
        />
        <Legend
          align="left"
          verticalAlign="top"
          wrapperStyle={{ paddingTop: "10px", paddingBottom: "20px" }}
        />
        <Bar
          legendType="circle"
          dataKey="present"
          fill="#fae27c"
          radius={[10, 10, 0, 0]}
        />

        <Bar
          legendType="circle"
          dataKey="absent"
          fill="#c3ebfa"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AttendanceChart;
