import { HiPlus } from "react-icons/hi";
import { Button } from "../Button/Button";
import PropTypes from "prop-types";
export function PromoComponent({ title, onClick, buttonTitle }) {
  return (
    <div className="flex justify-between bg-gray-800 p-4 rounded-lg">
      <h2 className="capitalize text-white text-2xl font-medium max-[640px]:text-[18px]">{title}</h2>
      <Button
        title={`${buttonTitle} qo'shish`}
        classNames="px-4 capitalize bg-blue-600 flex items-center justify-center gap-x-2 py-2 text-white rounded-lg hover:scale-105 transition max-[640px]:text-[12px]"
        icon={<HiPlus />}
        onClick={onClick}
      />
    </div>
  );
}

PromoComponent.defaultProps = {
  title: "",
  onClick: () => {},
};

PromoComponent.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  buttonTitle: PropTypes.string,
};
