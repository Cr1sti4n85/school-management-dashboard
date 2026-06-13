import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Announcements from "@/components/Announcements";
import Performance from "@/components/Performance";
import { getStudentById } from "@/lib/queries/studentQueries";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import StudentAttendanceCard from "@/components/StudentAttendanceCard";
import { Suspense } from "react";
import FormContainer from "@/components/FormContainer";
import { getSessionObj } from "@/lib/queries/getSession";

const SingleStudentPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const student = await getStudentById(id);
  const { role } = await getSessionObj();

  if (!student) return notFound();
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
                src={student.img || "/noAvatar.png"}
                alt="student avatar"
                width={144}
                height={144}
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">
                  {student.name} {student.lastName}
                </h1>
                {role === "admin" && (
                  <FormContainer table="student" type="update" data={student} />
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
                  <span>{student.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image
                    src="/date.png"
                    alt="calendar icon"
                    width={14}
                    height={14}
                  />
                  <span>{student.birthday.toLocaleDateString()}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3  flex items-center gap-2">
                  <Image
                    src="/mail.png"
                    alt="mail icon"
                    width={14}
                    height={14}
                  />
                  <span>{student.email || "-"}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image
                    src="/phone.png"
                    alt="phone icon"
                    width={14}
                    height={14}
                  />
                  <span>{student.phone || "-"}</span>
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
              <Suspense fallback="Cargando...">
                <StudentAttendanceCard id={student.id} />
              </Suspense>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleBranch.png"
                alt="branch icon"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  {`${student.class.name.charAt(0)}°`}
                </h2>
                <span className="text-sm text-gray-400">Nivel</span>
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
                  {student.class._count.lessons}
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
                <h2 className="text-xl font-semibold">{student.class.name}</h2>
                <span className="text-sm text-gray-400">Salón</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM  */}
        <div className="mt-4 bg-white rounded-md p-4 h-200">
          <h2>Calendario del estudiante</h2>
          {student.class && (
            <BigCalendarContainer type={"classId"} id={student.class.id} />
          )}
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h2 className="text-xl font-semibold">Links</h2>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              className="p-3 rounded-md bg-sky-light"
              href={`/list/lessons?classId=${2}`}
            >
              Clases
            </Link>
            <Link
              className="p-3 rounded-md bg-purple-light"
              href={`/list/teachers?classId=${2}`}
            >
              Maestros
            </Link>
            <Link
              className="p-3 rounded-md bg-yellow-light"
              href={`/list/assignments?classId=${2}`}
            >
              Tareas
            </Link>
            <Link
              className="p-3 rounded-md bg-pink-50"
              href={`/list/exams?classId=${2}`}
            >
              Exámenes
            </Link>
            <Link
              className="p-3 rounded-md bg-sky-pale"
              href={`/list/results?studentId=${"student2"}`}
            >
              Resultados
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </section>
  );
};

export default SingleStudentPage;
