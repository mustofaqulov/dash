import PropTypes from "prop-types";
import {
  HiChevronRight,
  HiChevronLeft,
  HiChevronDoubleRight,
  HiChevronDoubleLeft,
} from "react-icons/hi";

export function Pagination({
  gotoNextPage,
  gotoPrevPage,
  pageCount,
  pageOptions,
  nextPage,
  previousPage,
  pageOptionCount,
}) {
  return (
    <div className="w-[320px] flex items-center justify-between text-slate-400 text-xl my-3">
      <button
        className=" w-12 p-2 cursor-pointer flex justify-center items-center border grow border-slate-400"
        onClick={() => gotoPrevPage()}
      >
        <HiChevronDoubleLeft />
      </button>{" "}
      <button
        className="w-12 p-2 cursor-pointer flex justify-center items-center border grow border-slate-400"
        onClick={() => previousPage()}
      >
        <HiChevronLeft />
      </button>{" "}
      <span className="w-28 block py-1 border border-slate-400 text-center">
        <strong className="text-zinc-300">
          {pageCount} of{" "}
          {isNaN(Math.ceil(pageOptions?.length / pageOptionCount))
            ? 0
            : Math.ceil(pageOptions?.length / pageOptionCount)}
        </strong>{" "}
      </span>
      <button
        className=" w-12 p-2 cursor-pointer flex justify-center items-center border grow border-slate-400"
        onClick={() => nextPage()}
      >
        <HiChevronRight />
      </button>{" "}
      <button
        className=" w-12 p-2 cursor-pointer flex justify-center items-center border grow border-slate-400"
        onClick={() => gotoNextPage()}
      >
        <HiChevronDoubleRight />
      </button>{" "}
    </div>
  );
}

Pagination.propTypes = {
  gotoNextPage: PropTypes.func,
  previousPage: PropTypes.func,
  nextPage: PropTypes.func,
  gotoPrevPage: PropTypes.func,
  pageOptions: PropTypes.array,
  pageCount: PropTypes.number,
  pageOptionCount: PropTypes.number,
};
