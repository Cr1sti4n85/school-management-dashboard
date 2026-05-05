"use client";
import Image from "next/image";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

// #region Sample data
const data = [
  { name: "Group A", value: 92, fill: "#C3EBFA" },
  { name: "Group B", value: 8, fill: "#FAE27C" },
];

const Performance = () => {
  return (
    <div className="bg-white p-4 rounded-md h-80 relative">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Desempeño</h2>
        <Image
          src="/moreDark.png"
          alt="more icon"
          width={16}
          height={16}
          className="w-6 h-6"
        />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            fill="#8884d8"
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h3 className="text-3xl font-bold">9.2</h3>
        <p className="text-xs text-gray-300">de 10 máx.</p>
      </div>
      <h4 className="absolute font-medium bottom-16 left-0 right-0 m-auto text-center">
        1er semestre - 2do semestre
      </h4>
    </div>
  );
};

export default Performance;
