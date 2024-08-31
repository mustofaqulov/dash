import { Button, Modal, PromoComponent } from "../../../components";
import { HiPlus, HiTrash } from "react-icons/hi";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useFullData = [
  {
    id: 1,
    title: "Qashqadaryo rasmiy veb sayti",
    link: "qashqadaryo.uz",
  },
  {
    id: 2,
    title: "Yagona interaktiv xizmatlar portali",
    link: "my.gov.uz",
  },
];
const useFullInpData = [
  {
    id: 1,
    labelTitle: "Foydali manba nomi",
    placeholder: "ex. qashqadaryo sayti",
    type: "text",
    registerName: "title",
  },
  {
    id: 2,
    labelTitle: "Manba linki",
    placeholder: "ex. qashqadaryo.uz",
    type: "text",
    registerName: "link",
  },
];
export function UsefulResourcePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [filterUseFullData, setFilterUseFullData] = useState(useFullData);
  const { register, handleSubmit, reset } = useForm();
  const handleDelete = (id) => {
    setFilterUseFullData((prev) => prev.filter((data) => data.id !== id));
    console.log(id);
  };
  const onSubmit = (data) => {
    setFilterUseFullData([...filterUseFullData, data]);
    setIsOpen(false);
    reset();
  };
  const toggleModal = () => {
    setIsOpen(true);
  };
  return (
    <>
      <h1 className="text-4xl text-white font-bold mb-8">Useful Resource</h1>
      <PromoComponent
        title="Foydali manbalar"
        buttonTitle="useful resource"
        onClick={toggleModal}
      />
      <div className="w-full mt-8">
        <table className="w-full">
          <thead className="bg-indigo-400">
            <tr className="text-gray-600">
              <th className="border w-[50px] p-2 border-indigo-600">id</th>
              <th className="border border-indigo-600">UseFull title</th>
              <th className="border w-[100px] border-indigo-600"></th>
            </tr>
          </thead>
          <tbody className="bg-indigo-300">
            {filterUseFullData.map((data) => {
              const { id, title, link } = data;
              return (
                <tr key={id} className="text-black border  text-center">
                  <td className="border border-slate-500 py-1">{id}</td>
                  <td className="border border-slate-500 text-left pl-3">
                    <a
                      className="hover:text-blue-600 transition"
                      target="_blank"
                      rel="noreferrer"
                      href={`https://${link}`}
                    >
                      {title}
                    </a>
                  </td>
                  <td className="border border-slate-500">
                    <Button
                      icon={<HiTrash />}
                      classNames="hover:text-red-600 transition hover:text-lg"
                      onClick={() => handleDelete(id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <Modal
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            setIsOpen={setIsOpen}
            buttonTitle="qo'shish"
            buttonIcon={<HiPlus />}
            promoHeaderTitle="Foydali manba qo'shish"
            inputData={useFullInpData}
          />
        </div>
      ) : (
        []
      )}
    </>
  );
}
