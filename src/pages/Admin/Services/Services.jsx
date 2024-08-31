import { PromoComponent, Modal, Skeleton, Button } from "../../../components";
// import { servicesData } from "../../utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { serviceInputData } from "../../../utils";
import { HiPlus } from "react-icons/hi";
import { apiClients } from "../../../services/APIClients";
import { MdEdit, MdDelete } from "react-icons/md";

export function ServicesPage() {
  const { getFetch, postFetch, deleteFetch, putFetch } = apiClients;

  const [serviceData, setServicesData] = useState(null);
  const [id, setId] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

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
    postFetch("serves/", data, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((res) => {
      if (res) {
        setRefreshCount(refreshCount + 1);
      }
    });
    setIsOpen(false);
    setIsLoading(false);
    reset();
  };
  const editOpenModal = (data) => {
    putFetch("serves", id, data, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((res) => {
      if (res) {
        setEditCount(editCount + id);
      }
    });

    editReset();
    setIsEditOpen(false);
  };

  const editService = (id) => {
    setIsEditOpen(true);
    setId(id);
  };

  const deleteServiceModal = (id) => {
    setId(id);
    setIsOpenDeleteModal(true);
  };
  const deleteService = () => {
    deleteFetch("serves", id, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((res) => {
      if (res.status === 204) {
        setDeleteCount(deleteCount + id);
      }
    });

    setIsOpenDeleteModal(false);
  };

  useEffect(() => {
    getFetch("serves", {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    })
      .then((res) => {
        setServicesData(res.results.reverse());
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshCount, editCount, deleteCount]);
  return (
    <>
      <h1 className="text-4xl text-white font-bold mb-8 ">Xizmatlar</h1>
      <div className="flex flex-col gap-y-10">
        <PromoComponent
          title="Mavjud xizmatlar"
          onClick={() => setIsOpen(true)}
          buttonTitle="xizmat"
        />
        <div className="flex flex-wrap gap-6 bg-gray-700 p-4 rounded-lg">
          {isLoading
            ? [1, 2, 3].map((id) => <Skeleton key={id} />)
            : serviceData?.map((data) => {
                const { id, title } = data;
                return (
                  <div
                    key={id}
                    className="w-full bg-gray-800 py-6 px-4 flex justify-between rounded-lg "
                  >
                    <h4 className="text-white text-2xl font-medium capitalize max-[640px]:text-[18px]">
                      {title}
                    </h4>
                    <div className="flex items-center gap-x-2">
                      <Button
                        icon={<MdEdit />}
                        classNames="bg-blue-600 h-[30px] w-[30px] flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition"
                        onClick={() => editService(id)}
                      />
                      <Button
                        onClick={() => deleteServiceModal(id)}
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
            promoHeaderTitle="xizmat qo'shish"
            inputData={serviceInputData}
            buttonTitle="Qo'shish"
            buttonIcon={<HiPlus />}
          />
        </div>
      ) : (
        []
      )}
      {isEditOpen ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <Modal
            handleSubmit={editSubmit}
            register={editRegister}
            onSubmit={editOpenModal}
            setIsOpen={setIsEditOpen}
            inputData={serviceInputData}
            buttonTitle="Tahrirlash"
            buttonIcon={<HiPlus />}
            promoHeaderTitle="xizmatni tahrirlash"
          />
        </div>
      ) : (
        []
      )}
      {isOpenDeleteModal ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-gray-700 p-4 rounded-lg flex flex-col gap-y-6">
            <h2 className="text-white text-2xl">
              Siz haqiqatdan ham xizmatni o&apos;chirmoqchimisiz?
            </h2>
            <div className="flex gap-4">
              <Button
                title="Ha"
                classNames="bg-red-600 text-white py-2 w-[80px] rounded-lg hover:bg-white hover:text-red-600 transition"
                onClick={deleteService}
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
