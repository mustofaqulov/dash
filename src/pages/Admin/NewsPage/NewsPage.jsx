import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { PromoComponent, Button, ModCard, Input } from "../../../components";
import { apiClients } from "../../../services/APIClients";
import { HiPlus, HiX } from "react-icons/hi";
export function NewsPage() {
  const { getFetch, postFetch } = apiClients;

  const [newsData, setNewsData] = useState(null);
  const [newsPhotoData, setNewsPhotoData] = useState(null);
  const [options, setOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPhotoModal, setIsOpenPhotoModal] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  const { register, handleSubmit, reset, control } = useForm();
  const {
    register: registerPhoto,
    handleSubmit: handleSubmitPhoto,
    reset: resetPhoto,
  } = useForm();

  const onSubmit = (data) => {
    data.images = data.images.map((image) => {
      return image.id;
    });

    postFetch(
      "news/",
      { ...data, count: 0 },
      {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }
    ).then((res) => {
      if (res) {
        setRefreshCount(refreshCount + 1);
      }
    });

    setIsOpen(false);
    reset();
  };

  const onSubmitPhoto = (data) => {
    postFetch("fotos/", data, {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((res) => {
      if (res) {
        setRefreshCount(refreshCount + 1);
      }
    });

    setIsOpenPhotoModal(false);
    resetPhoto();
  };

  useEffect(() => {
    getFetch("news", {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((data) => {
      setNewsData(data.results);
    });

    getFetch("fotos", {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }).then((data) => {
      setNewsPhotoData(data.results);
    });
  }, [refreshCount]);

  useEffect(() => {
    if (newsPhotoData) {
      setOptions(() => {
        return newsPhotoData.map((option) => {
          return {
            ["title"]: option["title"],
            ["id"]: option["id"],
          };
        });
      });
    }
  }, [newsPhotoData]);
  return (
    <>
      <h1 className="text-4xl text-white font-bold mb-8">Yangiliklar</h1>
      <div className="flex flex-col gap-y-6 mb-6">
        <PromoComponent
          title="Rasmlar"
          buttonTitle="Rasm"
          onClick={() => setIsOpenPhotoModal(true)}
        />
        <PromoComponent
          title="Yangiliklar"
          buttonTitle="Yangilik"
          onClick={() => setIsOpen(true)}
        />
      </div>
      <div className="flex flex-col gap-y-4">
        {newsData?.map((news) => {
          return (
            <ModCard
              key={news.id}
              title={news.title}
              link="dashboard/news"
              endpoint={news.id}
            />
          );
        })}
      </div>
      {isOpenPhotoModal ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-gray-800 w-[50%] p-4 overflow-y-auto scroll-none h-max">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl text-white font-bold">
                Yangilik rasmlari
              </h1>
              <HiX
                className="cursor-pointer text-white hover:text-red-500 transition"
                fontSize="28px"
                onClick={() => setIsOpenPhotoModal(false)}
              />
            </div>
            <form
              className="w-full flex flex-col gap-y-6"
              onSubmit={handleSubmitPhoto(onSubmitPhoto)}
            >
              <div className="flex flex-col gap-3">
                <label className="text-lg text-gray-400 font-medium capitalize">
                  Rasm nomini kiriting
                </label>
                <input
                  type="text"
                  className="py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
                  placeholder="ex. G'uzor yangilik rasm 1"
                  {...registerPhoto("title", { required: true })}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-lg text-gray-400 font-medium capitalize">
                  Rasm linkini kiriting
                </label>
                <input
                  type="text"
                  className="py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
                  placeholder="Rasm linkini kiriting"
                  {...registerPhoto("image", { required: true })}
                />
              </div>
              <Button
                title="qo'shish"
                classNames="flex items-center justify-center gap-x-2 w-36 py-2 transition rounded-xl capitalize font-regular bg-blue-400 text-white hover:bg-green-400 hover:text-black"
                icon={<HiPlus />}
                type={"submit"}
              />
            </form>
          </div>
        </div>
      ) : null}
      {isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="bg-gray-800 w-[50%] p-4 overflow-y-auto scroll-none h-max">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold capitalize text-white">
                Yangilik qo'shish
              </h1>
              <HiX
                className="cursor-pointer text-white hover:text-red-500 transition"
                fontSize="28px"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <form
              action=""
              className="w-full flex flex-col gap-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full flex flex-wrap gap-y-4 justify-between ">
                <div className="flex flex-col gap-y-3 w-full">
                  <label className="text-lg text-gray-400 font-medium capitalize">
                    Sarlavhani kiriting
                  </label>
                  <input
                    type="text"
                    className="py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
                    placeholder="Yangilik sarlavhasini kiriting..."
                    {...register("title", { required: true })}
                  />
                </div>
                <div className="flex flex-col gap-y-3 w-full">
                  <label
                    className="text-lg text-gray-400 font-medium capitalize"
                    htmlFor="textarea"
                  >
                    Description
                  </label>
                  <textarea
                    {...register("descriptions", { required: true })}
                    id="textarea"
                    cols="30"
                    rows="10"
                    className=" py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
                    placeholder="Yangilik haqida malumot kiriting..."
                  ></textarea>
                </div>
                <Input
                  register={{ ...register("date", { required: true }) }}
                  type={"date"}
                  placeholder="Sanani kiriting"
                  labelTitle="Sanasini kiriting"
                  labelClassName="text-lg text-gray-400 font-medium capitalize"
                  classNames=" py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
                />
                <div className="flex flex-col gap-y-3 w-full">
                  <Controller
                    name="images"
                    control={control}
                    render={({ field }) => {
                      return (
                        <>
                          <label className="text-lg text-gray-400 font-medium capitalize">
                            Rasmlarni tanlang
                          </label>
                          <Select
                            closeMenuOnSelect={false}
                            options={options}
                            getOptionLabel={(option) => option["title"]}
                            getOptionValue={(option) => option["id"]}
                            isMulti
                            {...field}
                          />
                        </>
                      );
                    }}
                  />
                </div>
              </div>
              <Button
                title="qo'shish"
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
