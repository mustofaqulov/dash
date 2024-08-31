import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export function Cards({ title, description, img, link, id }) {
  return (
    <article className="flex flex-col items-center w-[350px] border border-slate-500 rounded-lg gap-y-2 drop-shadow-md overflow-hidden pb-4">
      <div className="w-full h-48">
        <img
          src={img}
          alt={title}
          className="w-full h-full bg-white object-cover object-center"
        />
      </div>
      <div className="flex flex-col gap-y-2 py-3 px-3 text-white text-center">
        <h3 className="text-xl font-semibold">
          {title?.length > 40 ? title?.slice(0, 45) + "..." : title}
        </h3>
        <p className=" text-slate-300 min-h-[60px]">
          {description?.length > 60
            ? description?.slice(0, 60) + "..."
            : description}
        </p>
      </div>
      <Link
        to={`/dashboard/${link}/${id}`}
        className="w-24 capitalize border flex items-center justify-center gap-x-2 py-1 text-white rounded-lg hover:bg-white hover:text-black transition"
      >
        <span>more</span>
      </Link>
    </article>
  );
}

export function TeacherCard() {
  return <article></article>;
}

Cards.defaultProp = {
  title: "",
  description: "",
  img: "",
  link: "",
  id: "",
};

Cards.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  img: PropTypes.string,
  link: PropTypes.string,
  id: PropTypes.string,
};
