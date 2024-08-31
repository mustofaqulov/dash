import { useEffect, useState } from "react";
import { Button, Input } from "../../../components";
import { apiClients } from "../../../services/APIClients";
import { useForm } from "react-hook-form";
export function AccountRegister() {
  const { postFetch } = apiClients;

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    postFetch(
      "userRegister/",
      { ...data, is_active: true },
      {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }
    ).then((res) => {
      if (res) {
        reset();
      }
    });
  };

  return (
    <>
      <h1 className="text-4xl text-white font-bold mb-8">
        Admin va Modirator uchun profil yaratish
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex flex-col gap-y-4"
      >
        <div className="flex gap-6 flex-wrap">
          <Input
            labelTitle="Full Name"
            placeholder="Full Name"
            register={{ ...register("full_name") }}
            type="text"
            labelClassName="text-lg text-gray-400 font-medium capitalize"
            classNames="py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
            widthContainer="[350px]"
          />
          <Input
            labelTitle="User Name"
            placeholder="User Name"
            register={{ ...register("username") }}
            type="text"
            labelClassName="text-lg text-gray-400 font-medium capitalize"
            classNames="py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
            widthContainer="[350px]"
          />
          <Input
            labelTitle="email"
            placeholder="Email"
            register={{ ...register("email") }}
            type="email"
            labelClassName="text-lg text-gray-400 font-medium capitalize"
            classNames=" py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
            widthContainer="[350px]"
          />
          <Input
            labelTitle="password"
            placeholder="Password"
            register={{ ...register("password") }}
            type="text"
            labelClassName="text-lg text-gray-400 font-medium capitalize"
            classNames=" py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
            widthContainer="[350px]"
          />
        </div>
        <div className="flex gap-x-6">
          <Input
            labelTitle="Admin"
            register={{ ...register("is_admin") }}
            type="checkbox"
            labelClassName="text-lg text-gray-400 font-medium capitalize"
            widthContainer="100px"
          />
          <Input
            labelTitle="Modirator"
            register={{ ...register("is_manager") }}
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
