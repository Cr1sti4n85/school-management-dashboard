import Image from "next/image";
import CountChart from "./CountChart";
import { getBoysAndGirlsCount } from "@/lib/queries/adminHomeQueries";

const CountChartContainer = async () => {
  const data = await getBoysAndGirlsCount();
  const boysPercentage = ((data.boys * 100) / data.total).toFixed(1);
  const girlsPercentage = ((data.girls * 100) / data.total).toFixed(1);
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Estudiantes</h1>
        <Image src="/moreDark.png" alt="more" width={20} height={20} />
      </div>
      <CountChart boys={data.boys} girls={data.girls} />
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-sky-light rounded-full" />
          <h1 className="font-bold">{data.boys}</h1>
          <h2 className="text-xs text-gray-300">Niños ({boysPercentage}%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-yellow-regular rounded-full" />
          <h1 className="font-bold">{data.girls}</h1>
          <h2 className="text-xs text-gray-300">Niñas ({girlsPercentage}%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChartContainer;
