import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { resultsData, role } from "@/lib/data";

import Image from "next/image";
import Link from "next/link";

type Result = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  student: string;
  type: "exam" | "assignment";
  date: string;
  score: number;
};

const columns = [
  {
    header: "Materia",
    accessor: "name",
  },
  {
    header: "Estudiante",
    accessor: "student",
  },
  {
    header: "Puntaje",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  {
    header: "Maestro",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Salón",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Fecha",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Acciones",
    accessor: "actions",
  },
];

const ResultsListPage = () => {
  const renderRow = (obj: Result) => {
    return (
      <tr
        key={obj.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-light"
      >
        <td className="flex items-center gap-4 p-4">{obj.subject}</td>
        <td>{obj.student}</td>
        <td className="hidden md:table-cell">{obj.score}</td>
        <td className="hidden md:table-cell">{obj.teacher}</td>
        <td className="hidden md:table-cell">{obj.class}</td>
        <td className="hidden md:table-cell">{obj.date}</td>
        <td>
          <div className="flex items-center gap-2">
            {role === "admin" && (
              <>
                <FormModal type="update" table="assignment" data={obj} />
                <FormModal type="delete" table="assignment" id={obj.id} />
              </>
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
        <h1 className="hidden md:block text-lg font-semibold">Resultados</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-regular">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-regular">
              <Image src="/sort.png" alt="filter" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal type="create" table="result" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={resultsData} />
      {/* PAGINATION */}
      <Pagination />
    </section>
  );
};

export default ResultsListPage;
