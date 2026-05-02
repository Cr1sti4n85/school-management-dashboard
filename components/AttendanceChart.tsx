"use client";

import Image from "next/image";
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

const data = [
  {
    name: "Lun",
    presente: 80,
    ausente: 20,
  },
  {
    name: "Mar",
    presente: 91,
    ausente: 9,
  },
  {
    name: "Mie",
    presente: 90,
    ausente: 10,
  },
  {
    name: "Jue",
    presente: 65,
    ausente: 35,
  },
  {
    name: "Vie",
    presente: 72,
    ausente: 28,
  },
];

const AttendanceChart = () => {
  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Asistencia</h1>
        <Image src="/moreDark.png" alt="more" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart responsive data={data} barSize={20}>
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
            dataKey="presente"
            fill="#fae27c"
            radius={[10, 10, 0, 0]}
          />

          <Bar
            legendType="circle"
            dataKey="ausente"
            fill="#c3ebfa"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
