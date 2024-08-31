import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, PromoComponent, Button } from "../../../components";
import { aboutInpData } from "../../../utils";
import { apiClients } from "../../../services/APIClients";
import { HiPlus } from "react-icons/hi";
import { MdEdit, MdDelete } from "react-icons/md";

export function AboutUsPage() {
  const { postFetch, deleteFetch, putFetch } = apiClients;

  const [isOpen, setIsOpen] = useState(false);
  const [aboutData, setAboutData] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [id, setId] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);

  const { handleSubmit, register, reset } = useForm();
  const {
    handleSubmit: editSubmit,
    register: editRegister,
    reset: editReset,
  } = useForm();
  const onSubmit = (data) => {
    postFetch("about/", data, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((res) => {
      if (res) {
        setRefreshCount(refreshCount + 1);
      }
    });
    setIsOpen(false);
    reset();
  };
  const editCourse = (id) => {
    setIsEditOpen(true);
    setId(id);
  };
  const deleteCourse = (id) => {
    deleteFetch("about", id, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((res) => {
      if (res.status === 204) {
        setRefreshCount(refreshCount + id);
      }
    });
  };
  const editOpenModal = (data) => {
    putFetch("about", id, data, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((res) => {
      if (res) {
        setRefreshCount(refreshCount + id);
      }
    });

    editReset();
    setIsEditOpen(false);
  };
  useEffect(() => {
    apiClients
      .getFetch("about", {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      })
      .then((res) => {
        setAboutData(res.results.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshCount]);
  return (
    <>
      <h1 className="text-4xl text-white font-bold mb-8">About us</h1>
      <div className="flex flex-col gap-y-10">
        <PromoComponent
          title="About us"
          onClick={() => setIsOpen(true)}
          buttonTitle="about us"
        />
        <div className="flex flex-col gap-y-4">
          {aboutData?.map((data) => {
            const { id, title } = data;
            return (
              <div
                key={id}
                className="w-full bg-gray-800 py-6 px-4 flex justify-between rounded-lg "
              >
                <h4 className="text-white text-2xl font-medium capitalize">
                  {title}
                </h4>
                <div className="flex items-center gap-x-2">
                  <Button
                    icon={<MdEdit />}
                    classNames="bg-blue-600 h-[30px] w-[30px] flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition"
                    onClick={() => editCourse(id)}
                  />
                  <Button
                    onClick={() => deleteCourse(id)}
                    icon={<MdDelete size={20} />}
                    classNames="bg-red-600 hover:bg-white hover:text-red-600 text-white transition h-[30px] w-[30px] flex items-center justify-center"
                  />
                </div>
              </div>
            );
          })}
        </div>
        {isOpen ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <Modal
              setIsOpen={setIsOpen}
              handleSubmit={handleSubmit}
              register={register}
              onSubmit={onSubmit}
              inputData={aboutInpData}
              buttonTitle="qo'shish"
              buttonIcon={<HiPlus />}
              promoHeaderTitle="About us"
            />
          </div>
        ) : null}
        {isEditOpen ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <Modal
              handleSubmit={editSubmit}
              register={editRegister}
              onSubmit={editOpenModal}
              setIsOpen={setIsEditOpen}
              inputData={aboutInpData}
              buttonTitle="Tahrirlash"
              buttonIcon={<HiPlus />}
              promoHeaderTitle="tahrirlash"
            />
          </div>
        ) : (
          []
        )}
      </div>
    </>
  );
}
