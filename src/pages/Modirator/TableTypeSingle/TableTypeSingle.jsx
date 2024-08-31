import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PromoComponent, Button, Input, ItemCard } from "../../../components";
import { apiClients } from "../../../services/APIClients";
import { HiX, HiPlus } from "react-icons/hi";
import { MdDelete, MdEdit } from "react-icons/md";
export function TableTypeSingle() {
  const navigate = useNavigate();
  const { getFetch, postFetch, deleteFetch, putFetch } = apiClients;

  const [tableTypeData, setTableTypeData] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [typeData, setTypeData] = useState(null);
  const [id, setId] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [refreshCount, setRefreshCount] = useState(0);

  const {
    register: registerTable,
    handleSubmit: handleSubmitTable,
    reset,
  } = useForm();
  const {
    register: editRegister,
    handleSubmit: editHandleSubmit,
    reset: editReset,
  } = useForm();

  const onSubmitTable = (data) => {
    postFetch("table/", data, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((data) => {
      if (data) {
        setRefreshCount(refreshCount + 1);
      }
    });
    reset();
    setIsOpen(false);
  };

  const editTable = (tableId) => {
    setIsEditOpen(true);
    setId(tableId);
  };
  const editOpenModal = (data) => {
    putFetch("table", id, data, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((data) => {
      if (data) {
        setRefreshCount(refreshCount + id);
      }
    });

    editReset();
    setIsEditOpen(false);
  };

  const deleteTableModal = (id) => {
    setId(id);
    setIsOpenDeleteModal(true);
  };
  const deleteTable = () => {
    deleteFetch("table", id, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((data) => {
      if (data.status === 204) {
        setRefreshCount(refreshCount + id);
      }
    });
    setIsOpenDeleteModal(false);
  };

  useEffect(() => {
    getFetch("table", {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((data) => {
      setTableTypeData(data.results.reverse());
    });
    getFetch("room", {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((data) => {
      setRoomData(data.results.reverse());
    });
    getFetch("tableType", {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((data) => {
      setTypeData(data.results.reverse());
    });
  }, [refreshCount]);
  return (
    <>
      <button
        className="px-2 rounded-lg bg-slate-400 mb-3"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <h1 className="text-4xl text-white font-bold mb-8 mt-3">Xonalar</h1>

      <div className="flex flex-col gap-y-10">
        <PromoComponent
          title="TableType"
          buttonTitle="table"
          onClick={() => setIsOpen(true)}
        />
        <div className="grid grid-cols-2 gap-4">
          {tableTypeData?.map((data) => {
            return (
              <div
                className="w-full bg-gray-800 py-6 px-4 flex justify-between rounded-lg "
                key={data.id}
              >
                <h4 className="text-white text-2xl font-medium capitalize max-[640px]:text-[18px]">
                  {`${data.start_time.slice(0, 5)} - ${data.end_time.slice(
                    0,
                    5
                  )}`}
                </h4>
                {/* <p>{roomName(data.room)}</p> */}
                <div className="flex items-center gap-x-2">
                  <Button
                    icon={<MdEdit />}
                    classNames="bg-blue-600 h-[30px] w-[30px] flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition"
                    onClick={() => editTable(data.id)}
                  />
                  <Button
                    onClick={() => deleteTableModal(data.id)}
                    icon={<MdDelete size={20} />}
                    classNames="bg-red-600 hover:bg-white hover:text-red-600 text-white transition h-[30px] w-[30px] flex items-center justify-center"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-gray-800 w-[50%] p-4 overflow-y-auto scroll-none h-max">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold capitalize text-white">
                Table qo&apos;shish
              </h1>
              <HiX
                className="cursor-pointer text-white hover:text-red-500 transition"
                fontSize="28px"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <form
              action=""
              onSubmit={handleSubmitTable(onSubmitTable)}
              className="w-full flex flex-col gap-y-6"
            >
              <Input
                register={{
                  ...registerTable("start_time", { required: true }),
                }}
                labelTitle="Boshlanish vaqti"
                type="time"
                placeholder="ex. "
                labelClassName="text-lg text-gray-400 font-medium capitalize"
                classNames=" py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
                widthContainer="[350px]"
              />
              <Input
                register={{ ...registerTable("end_time", { required: true }) }}
                labelTitle="tugash vaqti"
                type="time"
                placeholder="ex. description"
                labelClassName="text-lg text-gray-400 font-medium capitalize"
                classNames=" py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
                widthContainer="[350px]"
              />
              <div className="flex flex-col gap-y-3 w-[350px]">
                <label
                  htmlFor=""
                  className="text-lg text-gray-400 font-medium capitalize"
                >
                  Xonani tanlang
                </label>
                <select
                  {...registerTable("room")}
                  id=""
                  className="py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-gray-400"
                >
                  {roomData?.map((room) => {
                    const { id, title } = room;
                    // console.log(room);
                    return (
                      <option value={id} key={id}>
                        {title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-col gap-y-3 w-[350px]">
                <label
                  htmlFor=""
                  className="text-lg text-gray-400 font-medium capitalize"
                >
                  Typeni tanlang
                </label>
                <select
                  {...registerTable("type")}
                  id=""
                  className="py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-gray-400"
                >
                  {typeData?.map((type) => {
                    // console.log(type);
                    const { id, title } = type;
                    return (
                      <option value={id} key={id}>
                        {title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <Button
                title="Qo'shish"
                classNames="flex items-center justify-center gap-x-2 w-36 py-2 transition rounded-xl capitalize font-regular bg-blue-400 text-white hover:bg-green-400 hover:text-black"
                type="submit"
                icon={<HiPlus />}
              />
            </form>
          </div>
        </div>
      ) : null}
      {isEditOpen ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-gray-800 w-[50%] p-4 overflow-y-auto scroll-none h-max">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold capitalize text-white">
                Vaqtni tahrirlash
              </h1>
              <HiX
                className="cursor-pointer text-white hover:text-red-500 transition"
                fontSize="28px"
                onClick={() => setIsEditOpen(false)}
              />
            </div>
            <form
              action=""
              onSubmit={editHandleSubmit(editOpenModal)}
              className="w-full flex flex-col gap-y-6"
            >
              <Input
                register={{
                  ...editRegister("start_time", { required: true }),
                }}
                labelTitle="Boshlanish vaqti"
                type="time"
                placeholder="ex. "
                labelClassName="text-lg text-gray-400 font-medium capitalize"
                classNames=" py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
                widthContainer="[350px]"
              />
              <Input
                register={{ ...editRegister("end_time", { required: true }) }}
                labelTitle="tugash vaqti"
                type="time"
                placeholder="ex. description"
                labelClassName="text-lg text-gray-400 font-medium capitalize"
                classNames=" py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
                widthContainer="[350px]"
              />
              <div className="flex flex-col gap-y-3 w-[350px]">
                <label
                  htmlFor=""
                  className="text-lg text-gray-400 font-medium capitalize"
                >
                  Xonani tanlang
                </label>
                <select
                  {...editRegister("room")}
                  id=""
                  className="py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-gray-400"
                >
                  {roomData?.map((room) => {
                    const { id, title } = room;
                    // console.log(room);
                    return (
                      <option value={id} key={id}>
                        {title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-col gap-y-3 w-[350px]">
                <label
                  htmlFor=""
                  className="text-lg text-gray-400 font-medium capitalize"
                >
                  Typeni tanlang
                </label>
                <select
                  {...editRegister("type")}
                  id=""
                  className="py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-gray-400"
                >
                  {typeData?.map((type) => {
                    // console.log(type);
                    const { id, title } = type;
                    return (
                      <option value={id} key={id}>
                        {title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <Button
                title="Tahrirlash"
                classNames="flex items-center justify-center gap-x-2 w-36 py-2 transition rounded-xl capitalize font-regular bg-blue-400 text-white hover:bg-green-400 hover:text-black"
                type="submit"
                icon={<HiPlus />}
              />
            </form>
          </div>
        </div>
      ) : (
        []
      )}
      {isOpenDeleteModal ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-gray-700 p-4 rounded-lg flex flex-col gap-y-6">
            <h2 className="text-white text-2xl">
              Siz haqiqatdan ham vaqtni o&apos;chirmoqchimisiz?
            </h2>
            <div className="flex gap-4">
              <Button
                title="Ha"
                classNames="bg-red-600 text-white py-2 w-[80px] rounded-lg hover:bg-white hover:text-red-600 transition"
                onClick={deleteTable}
              />
              <Button
                title="Yo'q"
                classNames="bg-blue-600 text-white py-2 w-[80px] rounded-lg hover:bg-white hover:text-blue-600 transition"
                onClick={() => setIsOpenDeleteModal(false)}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
