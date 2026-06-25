import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { getSessionObj } from "@/lib/queries/getSession";
import { getLessonsAndCount, LessonList } from "@/lib/queries/lessonQueries";

import Image from "next/image";

const LessonsListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page, ...queryParams } = await searchParams;
  const p: number = page ? parseInt(page) : 1;

  const { data: classesData, count } = await getLessonsAndCount(p, queryParams);
  const { role } = await getSessionObj();

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

    ...(role === "admin"
      ? [
          {
            header: "Acciones",
            accessor: "actions",
          },
        ]
      : []),
  ];

  const renderRow = (obj: LessonList) => {
    return (
      <tr
        key={obj.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-light"
      >
        <td className="flex items-center gap-4 p-4">{obj.subject.name}</td>
        <td>{obj.class.name}</td>
        <td className="hidden md:table-cell">
          {obj.teacher.name} {obj.teacher.surname}
        </td>
        <td>
          <div className="flex items-center gap-2">
            {role === "admin" && (
              <>
                <FormContainer type="update" table="lesson" data={obj} />
                <FormContainer type="delete" table="lesson" id={obj.id} />
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
            {role === "admin" && <FormContainer type="create" table="lesson" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={classesData} />
      {/* PAGINATION */}
      <Pagination count={count} page={p} />
    </section>
  );
};

export default LessonsListPage;
