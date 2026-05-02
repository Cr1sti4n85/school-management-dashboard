"use client";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Ene",
    ingresos: 4000,
    gastos: 2400,
  },
  {
    name: "Feb",
    ingresos: 3000,
    gastos: 1398,
  },
  {
    name: "Mar",
    ingresos: 2000,
    gastos: 9800,
  },
  {
    name: "Abr",
    ingresos: 2780,
    gastos: 3908,
  },
  {
    name: "May",
    ingresos: 1890,
    gastos: 4800,
  },
  {
    name: "Jun",
    ingresos: 2390,
    gastos: 3800,
  },
  {
    name: "Jul",
    ingresos: 3490,
    gastos: 4300,
  },
  {
    name: "Ago",
    ingresos: 3490,
    gastos: 4300,
  },
  {
    name: "Sep",
    ingresos: 3490,
    gastos: 4300,
  },
  {
    name: "Oct",
    ingresos: 3490,
    gastos: 4300,
  },
  {
    name: "Nov",
    ingresos: 3490,
    gastos: 4300,
  },
  {
    name: "Dic",
    ingresos: 3490,
    gastos: 4300,
  },
];

const FinanceChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Finanzas</h1>
        <Image src="/moreDark.png" alt="more" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          responsive
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#d1d5db" }}
            tickMargin={10}
          />
          <YAxis
            width="auto"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#d1d5db" }}
            tickMargin={20}
          />
          <Tooltip
            cursor={{
              stroke: "var(--color-border-2)",
            }}
            contentStyle={{
              backgroundColor: "var(--color-surface-raised)",
              borderColor: "var(--color-border-2)",
            }}
          />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="ingresos"
            stroke="#c3ebfa"
            strokeWidth={3}
          />
          <Line
            strokeWidth={3}
            type="monotone"
            dataKey="gastos"
            stroke="#cfceff"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
