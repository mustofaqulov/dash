import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, ModCard, PromoComponent } from "../../../components";
import { apiClients } from "../../../services/APIClients";
import { HiX, HiPlus } from "react-icons/hi";
export function RoomsPage() {
  const [isOpenLevel, setIsOpenLevel] = useState(false);
  
  const {
    register: registerLevel,
    handleSubmit: handleSubmitLevel,
    reset,
  } = useForm();

  const onSubmitLevel = (data) => {
    apiClients.postFetch("attendanceLevel/", data, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    });
    reset();
    setIsOpenLevel(false);
  };

  return (
    <>
      <div className="flex flex-col gap-y-10">
        <ModCard title="Rooms" endpoint="room-single" link="manager" />
        <ModCard title="Types" endpoint="type-single" link="manager" />
        <ModCard title="Tables" endpoint="table-type-single" link="manager" />

        <PromoComponent
          title="Level"
          buttonTitle="Level"
          onClick={() => setIsOpenLevel(true)}
        />
      </div>

      {isOpenLevel ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-gray-800 w-[50%] p-4 overflow-y-auto scroll-none h-max">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold capitalize text-white">
                Yo'qlama statusi
              </h1>
              <HiX
                className="cursor-pointer text-white hover:text-red-500 transition"
                fontSize="28px"
                onClick={() => setIsOpenLevel(false)}
              />
            </div>
            <form
              action=""
              onSubmit={handleSubmitLevel(onSubmitLevel)}
              className="w-full flex flex-col gap-y-6"
            >
              <Input
                register={{
                  ...registerLevel("title", { required: true }),
                }}
                labelTitle="Level nomi"
                type="text"
                placeholder="ex. Keldi"
                labelClassName="text-lg text-gray-400 font-medium capitalize"
                classNames=" py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
                widthContainer="[350px]"
              />
              <Input
                register={{
                  ...registerLevel("descriptions"),
                }}
                labelTitle="description"
                type="text"
                placeholder="ex. descriptions"
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
    </>
  );
}
