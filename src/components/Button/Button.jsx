import PropTypes from "prop-types";
export function Button({ type, title, classNames, icon, onClick }) {
  return (
    <button type={type || "button"} className={classNames} onClick={onClick}>
      {icon}
      {title}
    </button>
  );
}

Button.defaultProp = {
  type: "",
  title: "",
  classNames: "",
  icon: null,
  onClick: () => {},
};
Button.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  classNames: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func,
};
