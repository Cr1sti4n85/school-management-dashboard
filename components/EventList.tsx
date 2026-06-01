import { getCalendarEvents } from "@/lib/queries/adminHomeQueries";

type Props = {
  dateParam: string | undefined;
};

const EventList = async ({ dateParam }: Props) => {
  const date = dateParam ? new Date(dateParam) : new Date();
  const dataEvents = await getCalendarEvents(date);
  return dataEvents.map((event) => (
    <div
      className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-sky-light even:border-t-purple-regular"
      key={event.id}
    >
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-gray-600">{event.title}</h1>
        <span className="text-gray-300 text-xs">
          {event.startTime.toLocaleTimeString("es-MX", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </div>
      <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
    </div>
  ));
};

export default EventList;
