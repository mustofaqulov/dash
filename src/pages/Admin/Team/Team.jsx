import { Button, Modal, PromoComponent, Skeleton } from "../../../components";
import { useState, useEffect } from "react";
import { teacherInputData } from "../../../utils";
import { useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi";
import { apiClients } from "../../../services/APIClients";
import { MdEdit, MdDelete } from "react-icons/md";

export function TeamPage() {
  const { postFetch, getFetch, putFetch, deleteFetch } = apiClients;

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [teamData, setTeamData] = useState(null);
  const [id, setId] = useState(null);

  const [refreshCount, setRefreshCount] = useState(0);
  const [editCount, setEditCount] = useState(0);
  const [deleteCount, setDeleteCount] = useState(0);

  const { handleSubmit, register, reset } = useForm();
  const {
    handleSubmit: editSubmit,
    register: editRegister,
    reset: editReset,
  } = useForm();

  const onSubmit = (data) => {
    postFetch("teacher/", data, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((res) => {
      if (res) {
        setRefreshCount(refreshCount + 1);
      }
    });
    setIsOpen(false);
    reset();
  };
  const onEditSubmit = (data) => {
    putFetch("teacher", id, data, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((res) => {
      if (res) {
        setEditCount(editCount + id);
      }
    });
    editReset();
    setIsOpenEditModal(false);
  };
  const editTeacher = (id) => {
    setId(id);
    setIsOpenEditModal(true);
  };

  const deleteTeacher = () => {
    deleteFetch("teacher", id, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((res) => {
      if (res.status === 204) {
        setDeleteCount(deleteCount + id);
      }
    });
    setIsOpenDeleteModal(false);
  };
  const deleteModalOpen = (id) => {
    setId(id);
    setIsOpenDeleteModal(true);
  };
  useEffect(() => {
    getFetch("teacher", {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    })
      .then((res) => {
        setTeamData(res.results.reverse());
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshCount, editCount, deleteCount]);
  return (
    <>
      <h1 className="text-4xl text-white font-bold mb-8">O&apos;qituvchilar</h1>
      <div className="flex flex-col gap-y-10">
        <PromoComponent
          title="O'qituvchilar"
          buttonTitle="o'qituvchi"
          onClick={() => setIsOpen(true)}
        />
        <div className="flex flex-wrap gap-6 bg-gray-700 p-4 rounded-lg">
          {isLoading
            ? [1, 2, 3].map((data) => <Skeleton key={data} />)
            : teamData?.map((data) => {
                const { id, full_name, descriptions, phone } = data;
                return (
                  <div
                    key={id}
                    className="w-full bg-gray-800 py-6 px-4 flex justify-between rounded-lg "
                  >
                    <div>
                      <h4 className="text-white text-2xl font-medium capitalize">
                        {full_name}
                      </h4>
                      <strong className="text-slate-400 text-lg">
                        {phone}
                      </strong>
                      <p className="text-slate-400 text-md">{descriptions}</p>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <Button
                        icon={<MdEdit />}
                        classNames="bg-blue-600 h-[30px] w-[30px] flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition"
                        onClick={() => editTeacher(id)}
                      />
                      <Button
                        onClick={() => deleteModalOpen(id)}
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
          <Modal
            setIsOpen={setIsOpen}
            handleSubmit={handleSubmit}
            register={register}
            onSubmit={onSubmit}
            inputData={teacherInputData}
            buttonTitle="qo'shish"
            buttonIcon={<HiPlus />}
            promoHeaderTitle="o'qituvchi qo'shish"
          />
        </div>
      ) : (
        []
      )}
      {isOpenEditModal ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <Modal
            setIsOpen={setIsOpenEditModal}
            handleSubmit={editSubmit}
            register={editRegister}
            onSubmit={onEditSubmit}
            inputData={teacherInputData}
            buttonTitle="tahrirlash"
            buttonIcon={<HiPlus />}
            promoHeaderTitle="o'qituvchini tahrirlash"
          />
        </div>
      ) : (
        []
      )}
      {isOpenDeleteModal ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-gray-700 p-4 rounded-lg flex flex-col gap-y-6">
            <h2 className="text-white text-2xl">
              Siz haqiqatdan ham o&apos;qituvchini o&apos;chirmoqchimisiz?
            </h2>
            <div className="flex gap-4">
              <Button
                title="Ha"
                classNames="bg-red-600 text-white py-2 w-[80px] rounded-lg hover:bg-white hover:text-red-600 transition"
                onClick={() => deleteTeacher(id)}
              />
              <Button
                title="Yo'q"
                classNames="bg-blue-600 text-white py-2 w-[80px] rounded-lg hover:bg-white hover:text-blue-600 transition"
                onClick={() => setIsOpenDeleteModal(false)}
              />
            </div>
          </div>
        </div>
      ) : (
        []
      )}
    </>
  );
}
