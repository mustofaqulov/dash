import { Link } from "react-router-dom";
import PropTypes from "prop-types";
export function PromoHeader({ title, link }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-white text-2xl font-bold capitalize">{title}</h3>
      <Link to={link} className="text-blue-500 text-lg font-medium hover:text-white transition">
        <span>See all</span>
      </Link>
    </div>
  );
}

PromoHeader.defaultProp = {
  title: "",
  link: "",
};

PromoHeader.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
};
