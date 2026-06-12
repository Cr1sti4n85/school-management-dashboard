import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BigCalendar from "@/components/BigCalendar";
import Performance from "@/components/Performance";
import Announcements from "@/components/Announcements";
import { getTeacherById } from "@/lib/queries/teacherQueries";
import FormContainer from "@/components/FormContainer";
import { getSessionObj } from "@/lib/queries/getSession";

const SingleTeacherPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { role } = await getSessionObj();
  const teacher = await getTeacherById(id);

  if (!teacher) return notFound();

  return (
    <section className="flex flex-1 p-4 flex-col xl:flex-row gap-4">
      {/* LEFT  */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="bg-sky-light py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                className="w-36 h-36 rounded-full object-cover"
                src={teacher.img || "/noAvatar.png"}
                alt=""
                width={144}
                height={144}
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">
                  {teacher.name} {teacher.surname}
                </h1>
                {role === "admin" && (
                  <FormContainer table="teacher" type="update" data={teacher} />
                )}
              </div>
              {/* <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam
                excepturi deleniti{" "}
              </p> */}
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image
                    src="/blood.png"
                    alt="droplet icon"
                    width={14}
                    height={14}
                  />
                  <span>{teacher.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image
                    src="/date.png"
                    alt="calendar icon"
                    width={14}
                    height={14}
                  />
                  <span>{teacher.birthday.toLocaleDateString()}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3  flex items-center gap-2">
                  <Image
                    src="/mail.png"
                    alt="mail icon"
                    width={14}
                    height={14}
                  />
                  <span>{teacher.email || "-"}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image
                    src="/phone.png"
                    alt="phone icon"
                    width={14}
                    height={14}
                  />
                  <span>{teacher.phone || "-"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* CARDS */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleAttendance.png"
                alt="calendar icon"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h2 className="text-xl font-semibold">90%</h2>
                <span className="text-sm text-gray-400">Asistencia</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleBranch.png"
                alt="file icon"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  {teacher._count.subjects || 0}
                </h2>
                <span className="text-sm text-gray-400">Materia(s)</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleLesson.png"
                alt="book icon"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  {teacher._count.lessons || 0}
                </h2>
                <span className="text-sm text-gray-400">Clases</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleClass.png"
                alt="blackboard icon"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  {teacher._count.classes || 0}
                </h2>
                <span className="text-sm text-gray-400">Salones</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM  */}
        <div className="mt-4 bg-white rounded-md p-4 h-200">
          <h2>Calendario del profesor</h2>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h2 className="text-xl font-semibold">Links</h2>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              className="p-3 rounded-md bg-sky-light"
              href={`/list/classes?supervisorId=${"teacher2"}`}
            >
              Salones
            </Link>
            <Link
              className="p-3 rounded-md bg-purple-light"
              href={`/list/students?teacherId=${"teacher2"}`}
            >
              Estudiantes
            </Link>
            <Link
              className="p-3 rounded-md bg-yellow-light"
              href={`/list/lessons?teacherId=${"teacher2"}`}
            >
              Clases
            </Link>
            <Link
              className="p-3 rounded-md bg-pink-50"
              href={`/list/exams?teacherId=${"teacher2"}`}
            >
              Exámenes
            </Link>
            <Link
              className="p-3 rounded-md bg-sky-pale"
              href={`/list/assignments?teacherId=${"teacher2"}`}
            >
              Tareas
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </section>
  );
};

export default SingleTeacherPage;
