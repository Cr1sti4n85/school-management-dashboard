import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import { ClassList, getClassesAndCount } from "@/lib/queries/classQueries";

import Image from "next/image";

const columns = [
  {
    header: "Salón",
    accessor: "name",
  },
  {
    header: "Capacidad",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  {
    header: "Nivel",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Supervisor",
    accessor: "supervisor",
    className: "hidden md:table-cell",
  },
  {
    header: "Acciones",
    accessor: "actions",
  },
];

const renderRow = (obj: ClassList) => {
  return (
    <tr
      key={obj.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-light"
    >
      <td className="flex items-center gap-4 p-4">{obj.name}</td>
      <td className="hidden md:table-cell">{obj.capacity}</td>
      <td className="hidden md:table-cell">{obj.name[0]}</td>
      <td className="hidden md:table-cell">
        {obj.supervisor?.name} {obj.supervisor?.surname}
      </td>
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

const ClassesListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page, ...queryParams } = await searchParams;
  const p: number = page ? parseInt(page) : 1;

  const { data: classesData, count } = await getClassesAndCount(p, queryParams);
  return (
    <section className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Salones</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-regular">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-regular">
              <Image src="/sort.png" alt="filter" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal type="create" table="class" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={classesData} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </section>
  );
};

export default ClassesListPage;
