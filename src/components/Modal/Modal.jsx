import { HiX } from "react-icons/hi";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import PropTypes from "prop-types";
export function Modal({
  setIsOpen,
  handleSubmit,
  register,
  onSubmit,
  inputData,
  buttonTitle,
  buttonIcon,
  promoHeaderTitle,
  organData,
  groupData,
}) {
  return (
    <div className="bg-gray-800 w-[50%] p-4 overflow-y-auto scroll-none h-max">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold capitalize text-white">
          {promoHeaderTitle}
        </h1>
        <HiX
          className="cursor-pointer text-white hover:text-red-500 transition"
          fontSize="28px"
          onClick={() => setIsOpen(false)}
        />
      </div>
      <div>
        <form
          action=""
          className="w-full flex flex-col gap-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full flex flex-wrap gap-y-4 justify-between items-start">
            {inputData.map((data) => {
              const { id, labelTitle, placeholder, type, registerName } = data;
              return (
                <Input
                  key={id}
                  register={{ ...register(registerName) }}
                  labelTitle={labelTitle}
                  type={type}
                  placeholder={placeholder}
                  labelClassName="text-lg text-gray-400 font-medium capitalize"
                  classNames=" py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
                  widthContainer="[350px]"
                />
              );
            })}
            {promoHeaderTitle == "O'quvchi qo'shish" ? (
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-3 w-[350px]">
                  <label
                    htmlFor=""
                    className="text-lg text-gray-400 font-medium capitalize"
                  >
                    Group
                  </label>
                  <select
                    {...register("group[0]")}
                    id=""
                    className="py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-gray-400"
                  >
                    {groupData?.map((group) => {
                      return (
                        <option value={group.id} key={group.id}>
                          {group.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex flex-col gap-y-3 w-[350px]">
                  <label
                    htmlFor=""
                    className="text-lg text-gray-400 font-medium capitalize"
                  >
                    Organization
                  </label>
                  <select
                    {...register("organization")}
                    id=""
                    className="py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-gray-400"
                  >
                    {organData?.map((organ) => {
                      return (
                        <option value={organ.id} key={organ.id}>
                          {organ.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            ) : null}
            {promoHeaderTitle == "Yangilik qo'shish" ? (
              <div className="flex flex-col gap-y-3 w-[350px]">
                <label
                  className="text-lg text-gray-400 font-medium capitalize"
                  htmlFor="textarea"
                >
                  Description
                </label>
                <textarea
                  {...register("description")}
                  id="textarea"
                  cols="30"
                  rows="10"
                  className=" py-2.5 px-5 rounded-lg border-2 border-slate-400 outline-none focus:border-blue-400 bg-transparent text-white"
                ></textarea>
              </div>
            ) : null}
          </div>
          <Button
            title={buttonTitle}
            classNames="flex items-center justify-center gap-x-2 w-36 py-2 transition rounded-xl capitalize font-regular bg-blue-400 text-white hover:bg-green-400 hover:text-black"
            type="submit"
            icon={buttonIcon}
          />
        </form>
      </div>
    </div>
  );
}

Modal.propTypes = {
  setIsOpen: PropTypes.func,
  handleSubmit: PropTypes.func,
  register: PropTypes.func,
  onSubmit: PropTypes.func,
  inputData: PropTypes.array,
  buttonTitle: PropTypes.string,
  promoHeaderTitle: PropTypes.string,
  buttonIcon: PropTypes.node,
  organData: PropTypes.array,
  groupData: PropTypes.array,
};
