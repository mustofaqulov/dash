import { useEffect, useState } from "react";
import { PromoComponent, Button, Input } from "../../../components";
import { HiX, HiPlus } from "react-icons/hi";
import { apiClients } from "../../../services/APIClients";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export function Groups() {
  const { getFetch, postFetch } = apiClients;

  const [isOpen, setIsOpen] = useState(false);
  const [teacherData, setTeacherData] = useState(null);
  const [coursesData, setCoursesData] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [groupData, setGroupData] = useState(null);

  const [refreshCount, setRefreshCount] = useState(0);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    postFetch("group/", data, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((data) => {
      if (data) {
        setRefreshCount(refreshCount + 1);
      }
    });

    reset();
    setIsOpen(false);
  };

  const showModal = () => {
    getFetch("teacher", {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    })
      .then((data) => {
        setTeacherData(data.results);
      })
      .catch((err) => console.log(err));

    getFetch("course", {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    })
      .then((data) => {
        setCoursesData(data.results);
      })
      .catch((err) => console.log(err));

    getFetch("table", {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    })
      .then((data) => {
        setTableData(data.results);
      })
      .catch((err) => console.log(err));

    setIsOpen(true);
  };
  useEffect(() => {
    getFetch("group", {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    })
      .then((data) => {
        setGroupData(data.results.reverse());
      })
      .catch((err) => console.log(err));
  }, [refreshCount]);

  return (
    <>
      <h1 className="text-4xl text-white font-bold mb-8">Guruhlar</h1>
      <div className="flex flex-col gap-y-10">
        <PromoComponent
          title="Guruhlar"
          buttonTitle="groups"
          onClick={showModal}
        />
        <div className="grid grid-cols-2 gap-4">
          {groupData?.map((group) => {
            const { id, title } = group;
            return (
              <Link
                to={`/dashboard/groups/${id}`}
                key={id}
                className="w-full bg-gray-800 py-6 px-4 flex justify-between rounded-lg cursor-pointer
              hover:scale-[1.007] transition"
              >
                <h4 className="text-white text-2xl font-medium capitalize max-[640px]:text-[18px]">
                  {title}
                </h4>
                <div className="flex items-center gap-x-2"></div>
              </Link>
            );
          })}
        </div>
      </div>
      {isOpen ? (
        <div className="fixed inset-0 flex justify-center pt-10 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="bg-gray-800 w-[50%] p-4 overflow-y-auto scroll-none h-max">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold capitalize text-white">
                Guruh yaratish
              </h1>
              <HiX
                className="cursor-pointer text-white hover:text-red-500 transition"
                fontSize="28px"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <form
              action=""
              className="w-full flex flex-wrap justify-between gap-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                labelTitle="Guruh nomi"
                placeholder="ex. 1-guruh"
                type="text"
                labelClassName="text-lg text-gray-400 font-medium capitalize"
                classNames=" py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
                widthContainer="[350px]"
                register={{ ...register("title") }}
              />
              <div className="flex flex-col w-[350px] gap-y-3">
                <label
                  htmlFor=""
                  className="text-lg text-gray-400 font-medium capitalize"
                >
                  Kursni tanlang
                </label>
                <select
                  {...register("course")}
                  id=""
                  className="py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-gray-400"
                >
                  {coursesData?.map((course) => {
                    return (
                      <option value={course.id} key={course.id}>
                        {course.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-col w-[350px] gap-y-3">
                <label
                  htmlFor=""
                  className="text-lg text-gray-400 font-medium capitalize"
                >
                  O&apos;qituvchini tanlang
                </label>
                <select
                  {...register("teacher[0]")}
                  id=""
                  className="py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-gray-400"
                >
                  {teacherData?.map((teacher) => {
                    return (
                      <option value={teacher.id} key={teacher.id}>
                        {teacher.full_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-col w-[350px] gap-y-3">
                <label
                  htmlFor=""
                  className="text-lg text-gray-400 font-medium capitalize"
                >
                  Vaqtini tanlang
                </label>
                <select
                  {...register("table")}
                  id=""
                  className="py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-gray-400"
                >
                  {tableData?.map((table) => {
                    return (
                      <option value={table.id} key={table.id}>
                        {table.start_time} {table.end_time}
                      </option>
                    );
                  })}
                </select>
              </div>
              <Input
                labelTitle="Boshlanish vaqti"
                // placeholder="ex. 1-guruh"
                type="date"
                labelClassName="text-lg text-gray-400 font-medium capitalize"
                classNames=" py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
                widthContainer="[350px]"
                register={{ ...register("start_date") }}
              />
              <Input
                labelTitle="Tugash vaqti"
                // placeholder="ex. 1-guruh"
                type="date"
                labelClassName="text-lg text-gray-400 font-medium capitalize"
                classNames=" py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
                widthContainer="[350px]"
                register={{ ...register("end_date") }}
              />
              <Input
                labelTitle="Narxi"
                placeholder="ex. 600 000 so'm"
                type="text"
                labelClassName="text-lg text-gray-400 font-medium capitalize"
                classNames=" py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
                widthContainer="[350px]"
                register={{ ...register("price") }}
              />
              <Input
                labelTitle="Description"
                // placeholder=""
                type="text"
                labelClassName="text-lg text-gray-400 font-medium capitalize"
                classNames=" py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
                widthContainer="[350px]"
                register={{ ...register("descriptions") }}
              />
              <Button
                type="submit"
                title="Qo'shish"
                classNames="flex items-center justify-center gap-x-2 w-36 py-2 transition rounded-xl capitalize font-regular bg-blue-400 text-white hover:bg-green-400 hover:text-black"
                icon={<HiPlus />}
              />
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
