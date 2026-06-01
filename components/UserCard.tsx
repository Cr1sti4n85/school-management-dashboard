import { userTypeMap } from "@/lib/constants";
import { getCardsData } from "@/lib/queries/adminHomeQueries";
import Image from "next/image";

type Props = {
  type: "admin" | "teacher" | "student" | "parent";
};

const UserCard = async ({ type }: Props) => {
  const countPerRole = await getCardsData(type);
  return (
    <div className="flex-1 rounded-2xl bg-purple-regular even:bg-yellow-regular p-4 min-w-32.5">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2026/27
        </span>
        <Image src={"/more.png"} alt="more" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">
        {countPerRole.toLocaleString()}
      </h1>
      <h2 className="capitalize text-sm font-medium text-gray-600">
        {userTypeMap[type]}
      </h2>
    </div>
  );
};

export default UserCard;
