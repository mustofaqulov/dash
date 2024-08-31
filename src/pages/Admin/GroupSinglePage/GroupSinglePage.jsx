import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiClients } from "../../../services/APIClients";
import { HiPlus, HiX, HiTrash } from "react-icons/hi";
import { Button, Input } from "../../../components";
import { useForm } from "react-hook-form";

export function GroupSinglePage() {
  const { groupId } = useParams();
  const { getFetch, putFetch, deleteFetch } = apiClients;

  const [isOpen, setIsOpen] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [typeName, setTypeName] = useState("");
  const [groupData, setGroupData] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [teacherData, setTeacherData] = useState(null);
  const [coursesData, setCoursesData] = useState(null);
  const [tableDataFull, setTableDataFull] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    putFetch("group", groupId, data, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((data) => {
      if (data) {
        setRefreshCount(refreshCount + 1);
      }
    });
    setIsOpen(false);
  };

  const deleteGroup = (id) => {
    deleteFetch("group", id, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((data) => {
      if (data.status === 204) {
        setRefreshCount(refreshCount + id);
      }
    });
  };
  useEffect(() => {
    getFetch(`group/${groupId}`, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    })
      .then((data) => {
        setGroupData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshCount]);

  useEffect(() => {
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
        setTableDataFull(data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getFetch(`course/${groupData?.course}`, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    })
      .then((course) => {
        setCourseName(course.title);
      })
      .catch((err) => {
        console.log(err);
      });

    getFetch(`teacher/${groupData?.teacher[0]}`, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    })
      .then((teacher) => {
        setTeacherName(teacher.full_name);
      })
      .catch((err) => {
        console.log(err);
      });

    getFetch(`table/${groupData?.table}`, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    })
      .then((table) => {
        setTableData(table);
        getFetch(`room/${table.room}`, {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }).then((room) => {
          setRoomName(room.title);
        });
        getFetch(`tableType/${table.type}`, {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }).then((type) => {
          setTypeName(type.title);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [groupData]);

  return (
    <>
      <h1 className="text-4xl text-white font-bold mb-8">
        Guruh haqida umumiy ma&apos;lumotlar
      </h1>
      <div className="flex flex-col gap-y-6">
        <div className="flex gap-x-6">
          <div className="flex flex-col bg-gray-800 w-[20%] p-2 rounded-lg">
            <span className="text-[20px] text-slate-400">Guruh nomi</span>
            <strong className="text-[30px] text-white">
              {groupData?.title}
            </strong>
          </div>

          <div className="flex flex-col bg-gray-800 p-2 rounded-lg w-[40%]">
            <span className="text-[20px] text-slate-400">O&apos;qituvchi</span>
            <strong className="text-[30px] text-slate-300">
              {teacherName}
            </strong>
          </div>
        </div>
        <div className="flex flex-col bg-gray-800 p-2 rounded-lg">
          <span className="text-[20px] text-slate-400">Kurs nomi</span>
          <strong className="text-[30px] text-slate-300">{courseName}</strong>
        </div>
        <div className="grid grid-cols-3 gap-x-8">
          <div className="flex flex-col bg-gray-800 p-2 rounded-lg">
            <span className="text-[20px] text-slate-400">
              Guruh o&apos;qiydigan xona
            </span>
            <strong className="text-[25px] text-slate-300">{roomName}</strong>
          </div>
          <div className="flex flex-col bg-gray-800 p-2 rounded-lg">
            <span className="text-[20px] text-slate-400">
              Guruh o&apos;qiydigan paytlar
            </span>
            <strong className="text-[25px] text-slate-300 capitalize">
              {typeName}
            </strong>
          </div>
          <div className="flex flex-col bg-gray-800 p-2 rounded-lg">
            <span className="text-[20px] text-slate-400">Dars vaqti</span>
            <strong className="text-[25px] text-slate-300">
              {tableData?.start_time?.slice(0, 5)}-
              {tableData?.end_time?.slice(0, 5)}
            </strong>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-8">
          <div className="flex flex-col bg-gray-800 p-2 rounded-lg">
            <span className="text-[20px] text-slate-400">Narxi</span>
            <strong className="text-[25px] text-slate-300">
              {groupData?.price} so&apos;m
            </strong>
          </div>
          <div className="flex flex-col bg-gray-800 p-2 rounded-lg">
            <span className="text-[20px] text-slate-400">
              Guruh ochilgan sana
            </span>
            <strong className="text-[25px] text-slate-300">
              {groupData?.start_date}
            </strong>
          </div>
          <div className="flex flex-col bg-gray-800 p-2 rounded-lg">
            <span className="text-[20px] text-slate-400">
              Guruh yopiladigan sana
            </span>
            <strong className="text-[25px] text-slate-300">
              {groupData?.end_date}
            </strong>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-x-[10px] mt-[50px]">
        <Button
          title="Yangilash"
          icon={<HiPlus />}
          onClick={() => setIsOpen(true)}
          classNames="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg"
        />
        <Button
          title="O'chirish"
          onClick={() => deleteGroup(groupId)}
          classNames="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
          icon={<HiTrash />}
        />
      </div>
      {isOpen ? (
        <div className="fixed inset-0 flex justify-center pt-10 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="bg-gray-800 w-[50%] p-4 overflow-y-auto scroll-none h-max">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold capitalize text-white">
                Guruhni tahrirlash
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
                  {tableDataFull?.map((table) => {
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
                title="Tahrirlash"
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
