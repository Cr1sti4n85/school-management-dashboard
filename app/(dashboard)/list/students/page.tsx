import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { getSessionObj } from "@/lib/queries/getSession";
import {
  getStudentsAndCount,
  StudentsList,
} from "@/lib/queries/studentQueries";

import Image from "next/image";
import Link from "next/link";

const StudentsListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page, ...queryParams } = await searchParams;
  const p: number = page ? parseInt(page) : 1;

  const { data: studentsData, count } = await getStudentsAndCount(
    p,
    queryParams,
  );
  const { role } = await getSessionObj();

  const columns = [
    {
      header: "Información",
      accessor: "info",
    },
    {
      header: "ID estudiante",
      accessor: "studentId",
      className: "hidden md:table-cell",
    },
    {
      header: "Nivel",
      accessor: "grade",
      className: "hidden md:table-cell",
    },
    {
      header: "Teléfono",
      accessor: "phone",
      className: "hidden lg:table-cell",
    },
    {
      header: "Dirección",
      accessor: "address",
      className: "hidden lg:table-cell",
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

  const renderRow = (obj: StudentsList) => {
    return (
      <tr
        key={obj.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-light"
      >
        <td className="flex items-center gap-4 p-4">
          <Image
            className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
            src={obj.img || "/noAvatar.png"}
            alt="photo"
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <h3 className="font-semibold">{obj.name}</h3>
            <p className="text-xs text-gray-500">{obj.class.name}</p>
          </div>
        </td>
        <td className="hidden md:table-cell">{obj.username}</td>
        <td className="hidden md:table-cell">{obj.class.name}</td>
        <td className="hidden md:table-cell">{obj.phone}</td>
        <td className="hidden md:table-cell">{obj.address}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link href={`/list/students/${obj.id}`}>
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-sky-light">
                <Image src="/view.png" alt="view" width={16} height={16} />
              </button>
            </Link>
            {role === "admin" && (
              <FormModal type="delete" table="student" id={obj.id} />
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
        <h1 className="hidden md:block text-lg font-semibold">Estudiantes</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-regular">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-regular">
              <Image src="/sort.png" alt="filter" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal type="create" table="student" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={studentsData} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </section>
  );
};

export default StudentsListPage;
