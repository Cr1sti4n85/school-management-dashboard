const Announcements = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Anuncios</h1>
        <span className="text-xs text-gray-400">Ver todos</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-sky-pale rounded-md p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-medium">
              Lorem ipsum dolor sit amet consec tetur adipis icing elit.
              Voluptatem, ea.
            </h2>
            <span className="shrink-0 whitespace-nowrap rounded-md px-1 py-1 text-xs text-gray-400 bg-white">
              2026-05-20
            </span>
          </div>
          <p className="text-[0.8rem] text-gray-400 mt-2">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit,
            facilis inventore? Sapiente reprehenderit rem, quaerat voluptate
            dignissimos ducimus perferendis atque.
          </p>
        </div>
        <div className="bg-purple-light rounded-md p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-medium ">
              Lorem ipsum dolor sit amet consec tetur adipisicing elit.
              Voluptatem, ea.
            </h2>
            <span className="shrink-0 whitespace-nowrap rounded-md px-1 py-1 text-xs text-gray-400 bg-white">
              2026-05-20
            </span>
          </div>
          <p className="text-[0.8rem] text-gray-400 mt-2">
            Lorem ipsum dolor sit, amet consec tetur adipisicing elit. Fugit,
            facilis inventore? Sapiente reprehenderit rem, quaerat voluptate
            dignissimos ducimus perferendis atque.
          </p>
        </div>
        <div className="bg-yellow-light rounded-md p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-medium">
              Lorem ipsum dolor sit amet consec tetur adipisicing elit.
              Voluptatem, ea.
            </h2>
            <span className="shrink-0 whitespace-nowrap rounded-md px-1 py-1 text-xs text-gray-400 bg-white">
              2026-05-20
            </span>
          </div>
          <p className="text-[0.8rem] text-gray-400 mt-2">
            Lorem ipsum dolor sit, amet consec tetur adipisicing elit. Fugit,
            facilis inventore? Sapiente reprehenderit rem, quaerat voluptate
            dignissimos ducimus perferendis atque.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
