import { useEffect, useState } from "react";
import { Button, Input } from "../../../components";
import { apiClients } from "../../../services/APIClients";
import { useForm } from "react-hook-form";
export function StaffCreate() {
  const { getFetch, postFetch } = apiClients;
  const [organizationData, setOrganizationData] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    postFetch("kadr/", data, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    });
    reset();
  };

  useEffect(() => {
    getFetch("organization", {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((data) => {
      setOrganizationData(data.results.reverse());
    });
  }, []);
  return (
    <>
      <h1 className="text-4xl text-white font-bold mb-8">
        Kadr uchun profil yaratish
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex flex-col gap-y-4"
      >
        <div className="flex gap-6 flex-wrap">
          <div className="flex flex-col gap-y-4">
            <label
              className="text-lg text-gray-400 font-medium capitalize"
              htmlFor=""
            >
              Tashkilotni tanglang
            </label>
            <select
              {...register("organization.organization", { required: true })}
              id=""
              className="py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent w-[350px]"
            >
              {organizationData?.map((organization) => {
                return (
                  <option key={organization.id} value={organization.id}>
                    {organization.title}
                  </option>
                );
              })}
            </select>
          </div>
          <Input
            labelTitle="Telefon raqam"
            placeholder="+998 90 123 45 67"
            register={{ ...register("organization.phone", { required: true }) }}
            type="number"
            labelClassName="text-lg text-gray-400 font-medium capitalize"
            classNames="py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
            widthContainer="[350px]"
          />
          <Input
            labelTitle="Ozgina ma'lumot"
            placeholder="Description"
            register={{
              ...register("organization.descriptions", { required: true }),
            }}
            type="text"
            labelClassName="text-lg text-gray-400 font-medium capitalize"
            classNames="py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
            widthContainer="[350px]"
          />
        </div>
        <div className="flex gap-6 flex-wrap">
          <Input
            labelTitle="Full Name"
            placeholder="Full Name"
            register={{ ...register("user.full_name") }}
            type="text"
            labelClassName="text-lg text-gray-400 font-medium capitalize"
            classNames="py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
            widthContainer="[350px]"
          />
          <Input
            labelTitle="User Name"
            placeholder="User Name"
            register={{ ...register("user.username") }}
            type="text"
            labelClassName="text-lg text-gray-400 font-medium capitalize"
            classNames="py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
            widthContainer="[350px]"
          />
          <Input
            labelTitle="email"
            placeholder="Email"
            register={{ ...register("user.email") }}
            type="email"
            labelClassName="text-lg text-gray-400 font-medium capitalize"
            classNames=" py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
            widthContainer="[350px]"
          />
          <Input
            labelTitle="password"
            placeholder="Password"
            register={{ ...register("user.password") }}
            type="text"
            labelClassName="text-lg text-gray-400 font-medium capitalize"
            classNames=" py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
            widthContainer="[350px]"
          />
        </div>
        <div className="flex gap-x-6">
          <Input
            labelTitle="Admin"
            register={{ ...register("user.is_admin") }}
            type="checkbox"
            labelClassName="text-lg text-gray-400 font-medium capitalize"
            widthContainer="100px"
          />
          <Input
            labelTitle="Kadr"
            register={{ ...register("user.is_staff") }}
            type="checkbox"
            labelClassName="text-lg text-gray-400 font-medium capitalize"
            widthContainer="100px"
          />
          <Input
            labelTitle="Modirator"
            register={{ ...register("user.is_manager") }}
            type="checkbox"
            labelClassName="text-lg text-gray-400 font-medium capitalize"
            widthContainer="100px"
          />
        </div>
        <Button
          type="submit"
          title="Submit"
          classNames="w-[150px] py-2 bg-green-400"
        />
      </form>
    </>
  );
}
