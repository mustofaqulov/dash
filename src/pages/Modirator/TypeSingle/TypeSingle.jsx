import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PromoComponent, Button, Input, ItemCard } from "../../../components";
import { apiClients } from "../../../services/APIClients";
import { HiX, HiPlus } from "react-icons/hi";
export function TypeSingle() {
  const navigate = useNavigate();
  const { getFetch, postFetch, deleteFetch, putFetch } = apiClients;

  const [typeData, setTypeData] = useState(null);
  const [id, setId] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [refreshCount, setRefreshCount] = useState(0);

  const { register, handleSubmit, reset } = useForm();
  const {
    register: editRegister,
    handleSubmit: editHandleSubmit,
    reset: editReset,
  } = useForm();

  const onSubmit = (data) => {
    postFetch("tableType/", data, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((data) => {
      if (data) {
        setRefreshCount(refreshCount + 1);
      }
    });
    reset();
    setIsOpen(false);
  };

  const editType = (id) => {
    setIsEditOpen(true);
    setId(id);
  };
  const editOpenModal = (data) => {
    putFetch("tableType", id, data, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((data) => {
      if (data) {
        setRefreshCount(refreshCount + id);
      }
    });
    editReset();
    setIsEditOpen(false);
  };

  const deleteTypeModal = (id) => {
    setId(id);
    setIsOpenDeleteModal(true);
  };
  const deleteType = () => {
    deleteFetch("tableType", id, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((data) => {
      if (data.status === 204) {
        setRefreshCount(refreshCount + id);
      }
    });
    setIsOpenDeleteModal(false);
  };

  useEffect(() => {
    getFetch("tableType", {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    })
      .then((data) => {
        setTypeData(data.results.reverse());
      })
      .catch((err) => {
        console.log(err);
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
      <h1 className="text-4xl text-white font-bold mb-8 mt-3">Kunlar</h1>

      <div className="flex flex-col gap-y-10">
        <PromoComponent
          title="Kunlar"
          buttonTitle="kun"
          onClick={() => setIsOpen(true)}
        />
        <div className="grid grid-cols-3 gap-4">
          {typeData?.map((data) => {
            return (
              <ItemCard
                key={data.id}
                id={data.id}
                title={data.title}
                deleteItem={deleteTypeModal}
                editItem={editType}
                // link={`/manager/rooms/${data.id}`}
              />
            );
          })}
        </div>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-gray-800 w-[50%] p-4 overflow-y-auto scroll-none h-max">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold capitalize text-white">
                Kun qo'shish
              </h1>
              <HiX
                className="cursor-pointer text-white hover:text-red-500 transition"
                fontSize="28px"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <form
              action=""
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-y-6"
            >
              <Input
                register={{ ...register("title", { required: true }) }}
                labelTitle="kun nomi"
                type="text"
                placeholder="ex. du, se"
                labelClassName="text-lg text-gray-400 font-medium capitalize"
                classNames=" py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
                widthContainer="[350px]"
              />
              <Input
                register={{ ...register("descriptions") }}
                labelTitle="Description"
                type="text"
                placeholder="ex. description"
                labelClassName="text-lg text-gray-400 font-medium capitalize"
                classNames=" py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
                widthContainer="[350px]"
              />
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
                Kunni tahrirlash
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
                register={{ ...editRegister("title", { required: true }) }}
                labelTitle="kun nomi"
                type="text"
                placeholder="ex. du, se"
                labelClassName="text-lg text-gray-400 font-medium capitalize"
                classNames=" py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
                widthContainer="[350px]"
              />
              <Input
                register={{ ...editRegister("descriptions") }}
                labelTitle="Description"
                type="text"
                placeholder="ex. description"
                labelClassName="text-lg text-gray-400 font-medium capitalize"
                classNames=" py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
                widthContainer="[350px]"
              />
              <Button
                title="tahrirlash"
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
              Siz haqiqatdan ham xonani o&apos;chirmoqchimisiz?
            </h2>
            <div className="flex gap-4">
              <Button
                title="Ha"
                classNames="bg-red-600 text-white py-2 w-[80px] rounded-lg hover:bg-white hover:text-red-600 transition"
                onClick={deleteType}
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
