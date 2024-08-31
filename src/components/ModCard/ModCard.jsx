import { Link } from "react-router-dom";
export function ModCard({ title, link, endpoint }) {
  return (
    <Link
      to={`/${link}/${endpoint}`}
      className="w-full bg-gray-800 py-6 px-4 flex justify-between rounded-lg cursor-pointer
              hover:scale-[1.007] transition"
    >
      <h4 className="text-white text-2xl font-medium capitalize max-[640px]:text-[18px]">
        {title}
      </h4>
      <div className="flex items-center gap-x-2 text-white">Batafsil</div>
    </Link>
  );
}
