import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import {
  AssignmentList,
  getAssignmentsAndCount,
} from "@/lib/queries/assignmentQueries";
import { getSessionRole } from "@/lib/queries/getSession";

import Image from "next/image";

const AssignmentsListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page, ...queryParams } = await searchParams;
  const p: number = page ? parseInt(page) : 1;

  const { data: examsData, count } = await getAssignmentsAndCount(
    p,
    queryParams,
  );
  const role = await getSessionRole();
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
      header: "Entrega",
      accessor: "dueDate",
      className: "hidden md:table-cell",
    },
    {
      header: "Acciones",
      accessor: "actions",
    },
  ];
  const renderRow = (obj: AssignmentList) => {
    return (
      <tr
        key={obj.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-light"
      >
        <td className="flex items-center gap-4 p-4">
          {obj.lesson.subject.name}
        </td>
        <td>{obj.lesson.class.name}</td>
        <td className="hidden md:table-cell">
          {obj.lesson.teacher.name} {obj.lesson.teacher.surname}
        </td>
        <td className="hidden md:table-cell">
          {new Intl.DateTimeFormat("es-MX").format(obj.dueDate)}
        </td>
        <td>
          <div className="flex items-center gap-2">
            {(role === "admin" || role === "teacher") && (
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
        <h1 className="hidden md:block text-lg font-semibold">Tareas</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-regular">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-regular">
              <Image src="/sort.png" alt="filter" width={14} height={14} />
            </button>
            {(role === "admin" || role === "teacher") && (
              <FormModal type="create" table="assignment" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={examsData} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </section>
  );
};

export default AssignmentsListPage;
