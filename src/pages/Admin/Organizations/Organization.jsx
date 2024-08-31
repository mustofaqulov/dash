// import { PromoComponent } from "../../components";
import { useState, useEffect } from "react";
import { apiClients } from "../../../services/APIClients";
import { Button, Input, PromoComponent } from "../../../components";
import { HiX, HiPlus } from "react-icons/hi";
import { useForm } from "react-hook-form";

export function OrganizationPage() {
  const { getFetch, postFetch } = apiClients;
  const [regionData, setRegionData] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [organizationData, setOrganizationData] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    postFetch("organization/", data, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((res) => {
      if (res) {
        setRefresh(refresh + 1);
      }
    });

    reset();
    setIsOpenModal(false);
  };

  useEffect(() => {
    getFetch("organization", {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    })
      .then((res) => {
        setOrganizationData(res.results.reverse());
      })
      .catch((err) => {
        console.log("catch", err);
      });
    getFetch("region", {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    })
      .then((res) => {
        setRegionData(res.results.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);
  return (
    <>
      <h1 className="text-4xl text-white font-bold mb-8">Tashkilotlar</h1>
      <div className="flex flex-col gap-y-10">
        <PromoComponent
          title="Tashkilotlar"
          onClick={() => setIsOpenModal(true)}
          buttonTitle="tashkilot"
        />
        <table className="w-full text-center">
          <thead className="bg-indigo-400">
            <tr className="text-gray-600">
              <th className="py-2">Id</th>
              <th className="py-2">Tashkilot nomi</th>
              <th className="py-2">Tuman raqami (id)</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {organizationData?.map((organization) => {
              return (
                <tr className="border" key={organization.id}>
                  <td className="py-2">{organization.id}</td>
                  <td>{organization.title}</td>
                  <td>{organization.region}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isOpenModal ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-gray-800 w-[50%] p-4 overflow-y-auto scroll-none h-max">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold capitalize text-white">
                Tashkilot qo&apos;shish
              </h1>
              <HiX
                className="cursor-pointer text-white hover:text-red-500 transition"
                fontSize="28px"
                onClick={() => setIsOpenModal(false)}
              />
            </div>
            <form
              action=""
              className="w-full flex flex-col gap-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-y-3">
                <label
                  htmlFor=""
                  className="text-lg text-gray-400 font-medium capitalize"
                >
                  Tuman nomi
                </label>
                <select
                  {...register("region")}
                  id=""
                  className="py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-gray-400"
                >
                  {regionData?.map((region) => {
                    const { id, title } = region;
                    return (
                      <option value={id} key={id}>
                        {title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <Input
                labelTitle="Tashkilot nomi"
                placeholder="ex. hokimlik"
                register={register("title")}
                labelClassName="text-lg text-gray-400 font-medium capitalize"
                classNames=" py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
                // widthContainer="[350px]"
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
