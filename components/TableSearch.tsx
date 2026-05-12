"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitEvent } from "react";

const TableSearch = () => {
  const router = useRouter();
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const val = (event.currentTarget[0] as HTMLInputElement).value;
    const params = new URLSearchParams(window.location.search);
    params.set("search", val);
    router.push(`${window.location.pathname}?${params}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2"
    >
      <Image src={"/search.png"} alt="seach-box" width={14} height={14} />
      <input
        type="text"
        placeholder="Buscar..."
        className="w-50 p-2 bg-transparent outline-none"
      />
    </form>
  );
};

export default TableSearch;
