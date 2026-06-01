import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { getSessionObj } from "@/lib/queries/getSession";
import { getParentsAndCount, ParentList } from "@/lib/queries/parentQueries";

import Image from "next/image";

const ParentsListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page, ...queryParams } = await searchParams;
  const p: number = page ? parseInt(page) : 1;

  const { data: parentsData, count } = await getParentsAndCount(p, queryParams);

  const { role } = await getSessionObj();

  const columns = [
    {
      header: "Información",
      accessor: "info",
    },
    {
      header: "Nombre(s) estudiante(s)",
      accessor: "students",
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

  const renderRow = (obj: ParentList) => {
    return (
      <tr
        key={obj.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-light"
      >
        <td className="flex items-center gap-4 p-4">
          <div className="flex flex-col">
            <h3 className="font-semibold">{obj.name}</h3>
            <p className="text-xs text-gray-500">{obj.email}</p>
          </div>
        </td>
        <td className="hidden md:table-cell">
          {obj.students
            .map((student) => {
              return student.name;
            })
            .join(", ")}
        </td>
        <td className="hidden md:table-cell">{obj.phone}</td>
        <td className="hidden md:table-cell">{obj.address}</td>
        <td>
          <div className="flex items-center gap-2">
            <FormModal type="update" table="parent" data={obj} />
            {role === "admin" && (
              <FormModal type="delete" table="parent" id={obj.id} />
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
        <h1 className="hidden md:block text-lg font-semibold">Padres</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-regular">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-regular">
              <Image src="/sort.png" alt="filter" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal type="create" table="parent" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={parentsData} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </section>
  );
};

export default ParentsListPage;
