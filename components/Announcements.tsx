import { getAnnouncements } from "@/lib/queries/adminHomeQueries";
import { getSessionObj } from "@/lib/queries/getSession";

const Announcements = async () => {
  const { role, userId } = await getSessionObj();
  const announcements = await getAnnouncements(role, userId);
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Anuncios</h1>
        <span className="text-xs text-gray-400">Ver todos</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-sky-pale rounded-md p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-medium">{announcements[0]?.title}</h2>
            <span className="shrink-0 whitespace-nowrap rounded-md px-1 py-1 text-xs text-gray-400 bg-white">
              {new Intl.DateTimeFormat("es-MX").format(announcements[0]?.date)}
            </span>
          </div>
          <p className="text-[0.8rem] text-gray-400 mt-2">
            {announcements[0]?.description}
          </p>
        </div>
        <div className="bg-purple-light rounded-md p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-medium ">{announcements[1]?.title}</h2>
            <span className="shrink-0 whitespace-nowrap rounded-md px-1 py-1 text-xs text-gray-400 bg-white">
              {new Intl.DateTimeFormat("es-MX").format(announcements[1]?.date)}
            </span>
          </div>
          <p className="text-[0.8rem] text-gray-400 mt-2">
            {announcements[1]?.description}
          </p>
        </div>
        <div className="bg-yellow-light rounded-md p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-medium">{announcements[2]?.title}</h2>
            <span className="shrink-0 whitespace-nowrap rounded-md px-1 py-1 text-xs text-gray-400 bg-white">
              {new Intl.DateTimeFormat("es-MX").format(announcements[2]?.date)}
            </span>
          </div>
          <p className="text-[0.8rem] text-gray-400 mt-2">
            {announcements[2]?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
