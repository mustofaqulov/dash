import PropTypes from "prop-types";
export function Input({
  type,
  classNames,
  register,
  placeholder,
  labelTitle,
  onChange,
  labelClassName,
  value,
  widthContainer,
}) {
  return (
    <div className={`w-${widthContainer || "full"} flex flex-col gap-y-3`}>
      <label htmlFor={labelTitle} className={labelClassName}>
        {labelTitle}
      </label>
      <input
        type={type || "text"}
        placeholder={placeholder}
        {...register}
        id={labelTitle}
        className={`${classNames} bg-inherit`}
        onChange={onChange}
        value={value}
        autoComplete="off"
      />
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  classNames: PropTypes.string,
  id: PropTypes.string,
  register: PropTypes.node,
  placeholder: PropTypes.string,
  labelTitle: PropTypes.string,
  onChange: PropTypes.func,
  labelClassName: PropTypes.string,
  value: PropTypes.string,
  widthContainer: PropTypes.string,
};
