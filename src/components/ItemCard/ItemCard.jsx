import { MdDelete, MdEdit } from "react-icons/md";
import { Button } from "../Button/Button";
export function ItemCard({ title, id, editItem, deleteItem }) {
  return (
    <>
      <div className="w-full bg-gray-800 py-6 px-4 flex justify-between rounded-lg ">
        <h4 className="text-white text-2xl font-medium capitalize max-[640px]:text-[18px]">
          {title}
        </h4>
        <div className="flex items-center gap-x-2">
          <Button
            icon={<MdEdit />}
            classNames="bg-blue-600 h-[30px] w-[30px] flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition"
            onClick={() => editItem(id)}
          />
          <Button
            onClick={() => deleteItem(id)}
            icon={<MdDelete size={20} />}
            classNames="bg-red-600 hover:bg-white hover:text-red-600 text-white transition h-[30px] w-[30px] flex items-center justify-center"
          />
        </div>
      </div>
    </>
  );
}
