"use client";
import { Calendar, dayjsLocalizer, View, Views } from "react-big-calendar";
import dayjs from "dayjs";
import "dayjs/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

dayjs.locale("es");
const localizer = dayjsLocalizer(dayjs);

type Props = {
  lessonsData: { title: string; start: Date; end: Date }[];
};

const BigCalendar = ({ lessonsData }: Props) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleViewChange = (selectedView: View) => {
    setView(selectedView);
  };
  return (
    <Calendar
      localizer={localizer}
      events={lessonsData}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "98%" }}
      messages={{
        next: "Sig",
        previous: "Ant",
        today: "Hoy",
        work_week: "Semana Laboral",
        day: "Día",
      }}
      views={["work_week", "day"]}
      view={view}
      onView={handleViewChange}
      min={new Date(2026, 1, 0, 8, 0, 0)}
      max={new Date(2026, 1, 0, 19, 0, 0)}
    />
  );
};

export default BigCalendar;
