import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Input } from "../../../components";
import LoginImage from "../../../assets/img/intro.png";
import { authService } from "../../../services/AuthService";

export function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loginData, setLoginData] = useState(null);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (loginData) => {
    if (loginData) {
      authService.login(loginData).then((resData) => {
        console.log(resData.token);
        setLoginData(resData);
        if (resData) {
          if (resData.admin != "") {
            navigate("/dashboard");
            localStorage.setItem("accessToken", resData.token);
            localStorage.setItem("role", "admin");
          } else if (resData.is_staff == "True") {
            navigate("/kadr");
            localStorage.setItem("accessToken", resData.token);
            localStorage.setItem("role", "kadr");
          } else if (resData.is_manager == "True") {
            navigate("/manager");
            localStorage.setItem("accessToken", resData.token);
            localStorage.setItem("role", "modirator");
          } else {
            setErrorMessage("Login yoki parol xato");
          }

          setErrorMessage("");
          reset();
        } else {
          setErrorMessage("Login yoki parol noto'g'ri");
        }
      });
    }
  };
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      if (localStorage.getItem("role") == "admin") {
        navigate("/dashboard");
      } else if (localStorage.getItem("role") == "kadr") {
        navigate("/kadr");
      } else if (localStorage.getItem("role") == "modirator") {
        navigate("/manager");
      }
    }
  });
  return (
    <div className="w-100 bg-cyan-950 height flex items-center justify-center gap-x-7 py-4">
      <div className="flex flex-col items-center gap-y-8 max-[640px]:hidden">
        <h1 className="text-2xl font-bold text-slate-400">
          &quot;Raqamlashtirish markazi&quot; admin paneli
        </h1>
        <img src={LoginImage} alt="" className="w-[540px]" />
      </div>
      <div className="w-[540px] bg-stone-800 rounded-lg h-700 py-4 px-14 flex justify-center flex-col gap-y-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          action="#"
          className="flex flex-col gap-y-6"
        >
          <div className="flex flex-col gap-y-2">
            <Input
              value={"admin@gmail.com"}
              classNames="py-4 px-5 w-full text-white rounded-3xl border-2 border-slate-500 outline-0 bg-transparent"
              labelTitle="Login"
              placeholder="Login kiriting"
              id="login"
              register={{
                ...register("username", { required: true }),
              }}
              labelClassName="text-2xl text-slate-200"
              onChange={() => setErrorMessage("")}
            />
            {errors?.username?.type === "required" && (
              <p className="text-red-500 text-md">To&#39;ldiring</p>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <Input
              value={"шикщршь"}
              type="password"
              classNames="py-4 px-5 w-full text-white rounded-3xl border-2 border-slate-500 outline-0 bg-transparent"
              labelTitle="Parol"
              placeholder="Parol kiriting"
              id="password"
              register={{
                ...register("password", { required: true, minLength: 2 }),
              }}
              labelClassName="text-2xl text-slate-200"
              onChange={() => setErrorMessage("")}
            />
            {errors?.password?.type === "required" && (
              <p className="text-red-500 text-md">To&#39;ldiring</p>
            )}
            {errors?.password?.type === "minLength" && (
              <p className="text-red-500 text-md">
                Parol 6 ta belgidan ko&#39;p bo&#39;lishi kerak
              </p>
            )}
          </div>
          {errorMessage ? (
            <p className="text-red-500 text-xl text-center">{errorMessage}</p>
          ) : (
            ""
          )}
          <Button
            type="submit"
            title="Kirish"
            classNames="text-xl w-full text-white bg-blue-600 py-4 px-5 rounded-3xl"
          />
        </form>
      </div>
    </div>
  );
}
