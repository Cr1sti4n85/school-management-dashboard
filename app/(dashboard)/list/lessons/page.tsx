import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { lessonsData, role } from "@/lib/data";

import Image from "next/image";
import Link from "next/link";

type Lesson = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
};

const columns = [
  {
    header: "Materia",
    accessor: "name",
  },
  {
    header: "Salón",
    accessor: "class",
  },
  {
    header: "Maestro",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },

  {
    header: "Acciones",
    accessor: "actions",
  },
];

const LessonsListPage = () => {
  const renderRow = (obj: Lesson) => {
    return (
      <tr
        key={obj.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-light"
      >
        <td className="flex items-center gap-4 p-4">{obj.subject}</td>
        <td>{obj.class}</td>
        <td className="hidden md:table-cell">{obj.teacher}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link href={`/teachers/${obj.id}`}>
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-sky-light">
                <Image src="/edit.png" alt="view" width={16} height={16} />
              </button>
            </Link>
            {role === "admin" && (
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-purple-regular">
                <Image
                  src="/delete.png"
                  alt="trash-can"
                  width={16}
                  height={16}
                />
              </button>
            )}
          </div>
        </td>
      </tr>
    );
  };
  return (
    <section className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Clases</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-regular">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-regular">
              <Image src="/sort.png" alt="filter" width={14} height={14} />
            </button>
            {role === "admin" && (
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-regular">
                <Image src="/plus.png" alt="filter" width={14} height={14} />
              </button>
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={lessonsData} />
      {/* PAGINATION */}
      <Pagination />
    </section>
  );
};

export default LessonsListPage;
