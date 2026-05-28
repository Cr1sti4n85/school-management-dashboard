import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import {
  AnnouncementList,
  getAnnouncementsAndCount,
} from "@/lib/queries/announcementQueries";
import { getSessionObj } from "@/lib/queries/getSession";
import Image from "next/image";

const AnnouncementsListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page, ...queryParams } = await searchParams;
  const p: number = page ? parseInt(page) : 1;

  const { data: announcementsData, count } = await getAnnouncementsAndCount(
    p,
    queryParams,
  );
  const { role } = await getSessionObj();

  const columns = [
    {
      header: "Título",
      accessor: "title",
    },
    {
      header: "Salón",
      accessor: "class",
    },

    {
      header: "Fecha",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "Acciones",
            accessor: "action",
          },
        ]
      : []),
  ];
  const renderRow = (obj: AnnouncementList) => {
    return (
      <tr
        key={obj.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-light"
      >
        <td className="flex items-center gap-4 p-4">{obj.title}</td>
        <td>{obj.class?.name || ""}</td>
        <td className="hidden md:table-cell">
          {new Intl.DateTimeFormat("es-MX").format(obj.date)}
        </td>

        <td>
          <div className="flex items-center gap-2">
            {role === "admin" && (
              <>
                <FormModal type="update" table="announcement" data={obj} />
                <FormModal type="delete" table="announcement" id={obj.id} />
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
        <h1 className="hidden md:block text-lg font-semibold">Anuncios</h1>
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
              <FormModal type="create" table="announcement" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={announcementsData} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </section>
  );
};

export default AnnouncementsListPage;
