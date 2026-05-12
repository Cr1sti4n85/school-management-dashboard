"use client";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { useRouter } from "next/navigation";

type Props = {
  page: number;
  count: number;
};

const Pagination = ({ page, count }: Props) => {
  const router = useRouter();
  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };
  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => {
          changePage(page - 1);
        }}
        disabled={page === 1}
      >
        Prev
      </button>
      <div className="flex gap-2 text-sm justify-center">
        {Array.from({ length: Math.ceil(count / ITEMS_PER_PAGE) }, (_, idx) => {
          const pageIndex = idx + 1;
          return (
            <button
              key={idx}
              className={`cursor-pointer px-2 rounded-sm ${page === pageIndex ? "bg-sky-light" : ""}`}
              onClick={() => changePage(pageIndex)}
            >
              {pageIndex}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => {
          changePage(page + 1);
        }}
        disabled={page === Math.ceil(count / ITEMS_PER_PAGE)}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
