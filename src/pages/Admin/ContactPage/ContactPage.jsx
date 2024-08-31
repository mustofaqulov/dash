import { Button, Input, Modal } from "../../../components";
import { HiPencil, HiRefresh } from "react-icons/hi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactInputData, contactModalInputData } from "../../../utils";

export function ContactPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const inputDefaultClassName =
    "bg-slate-800 text-white border-slate-800 border rounded-lg py-2.5 px-5 outline-none focus:border-green-400 w-[350px]";
  const labelDefaultClassName = "text-lg text-slate-400 font-medium";

  const onSubmit = (data) => {
    if (data) {
      setIsOpen(false);
      reset();
    }
  };
  const editContacts = () => {
    setIsOpen(true);
  };

  return (
    <>
      <h1 className="text-4xl text-white font-bold mb-8">Contact</h1>
      <div className="flex flex-col gap-y-10">
        {contactInputData.map((data) => {
          const { id, title, inputData } = data;
          return (
            <div key={id} className="flex flex-col gap-y-4">
              <h3 className="text-2xl text-white font-bold">{title}</h3>
              <div className="flex flex-wrap justify-between gap-y-6">
                {inputData.map((data) => {
                  const { id, labelTitle, value } = data;
                  return (
                    <Input
                      key={id}
                      labelTitle={labelTitle}
                      classNames={inputDefaultClassName}
                      labelClassName={labelDefaultClassName}
                      value={value}
                      widthContainer="350px"
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <Button
          title="Edit"
          classNames="flex items-center justify-center gap-x-2 bg-blue-600 text-white rounded-lg py-2.5 px-5 w-[100px] mt-10 hover:bg-blue-700 transition"
          icon={<HiPencil />}
          onClick={editContacts}
        />
      </div>
      {isOpen ? (
        <div className="absolute bg-black/50 backdrop-blur-sm top-0 left-0 bottom-0 right-0 flex justify-center scroll-none py-6">
          <Modal
            setIsOpen={setIsOpen}
            handleSubmit={handleSubmit}
            register={register}
            onSubmit={onSubmit}
            inputData={contactModalInputData}
            buttonTitle="Update"
            buttonIcon={<HiRefresh />}
            promoHeaderTitle="Bog'lanish turini o'zgartirish"
          />
        </div>
      ) : (
        []
      )}
    </>
  );
}
