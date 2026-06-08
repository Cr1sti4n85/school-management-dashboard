import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { getSessionObj } from "@/lib/queries/getSession";
import { getSubjectsAndCount, SubjectList } from "@/lib/queries/subjectQueries";

import Image from "next/image";

const SubjectsListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page, ...queryParams } = await searchParams;
  const p: number = page ? parseInt(page) : 1;

  const { data: subjectsData, count } = await getSubjectsAndCount(
    p,
    queryParams,
  );
  const { role } = await getSessionObj();

  const columns = [
    {
      header: "Nombre materia",
      accessor: "name",
    },
    {
      header: "Maestros",
      accessor: "teachers",
      className: "hidden md:table-cell",
    },
    {
      header: "Acciones",
      accessor: "actions",
    },
  ];

  const renderRow = (obj: SubjectList) => {
    return (
      <tr
        key={obj.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-light"
      >
        <td className="flex items-center gap-4 p-4">{obj.name}</td>
        <td className="hidden md:table-cell">
          {obj.teachers.map((teacher) => teacher.name).join(", ")}
        </td>
        <td>
          <div className="flex items-center gap-2">
            {role === "admin" && (
              <>
                <FormModal type="update" table="subject" data={obj} />
                <FormModal type="delete" table="subject" id={obj.id} />
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
        <h1 className="hidden md:block text-lg font-semibold">Materias</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-regular">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-regular">
              <Image src="/sort.png" alt="filter" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal type="create" table="subject" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={subjectsData} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </section>
  );
};

export default SubjectsListPage;
