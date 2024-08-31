import { useState, useEffect } from "react";
import { Input, Pagination, TeacherTable } from "../../../components";
import { teacherTableHeadData } from "../../../utils";
import { HiSearch } from "react-icons/hi";
import { apiClients } from "../../../services/APIClients";
export function TeachersPage() {
  const [searchTeacher, setSearchTeacher] = useState("");
  const [filterTeacherData, setFilterTeacherData] = useState([]);
  const [startSlice, setStartSlice] = useState(0);
  const [endSlice, setEndSlice] = useState(5);
  const [pageCount, setPageCount] = useState(1);
  const [teacherTableData, setTeacherTableData] = useState([]);
  useEffect(() => {
    setFilterTeacherData(
      teacherTableData.filter((data) => {
        if (
          data.full_name.toLowerCase().includes(searchTeacher.toLowerCase())
        ) {
          return data;
        } else {
          return null;
        }
      })
    );
  }, [searchTeacher]);
  const previousPage = () => {
    if (endSlice <= 10) {
      setStartSlice(0);
      setEndSlice(5);
      setPageCount(1);
    } else {
      setStartSlice(startSlice - 5);
      setEndSlice(endSlice - 5);
      setPageCount(pageCount - 1);
    }
  };
  const nextPage = () => {
    if (endSlice >= filterTeacherData.length) {
      setStartSlice(filterTeacherData.length - 5);
      setEndSlice(filterTeacherData.length);
      setPageCount(Math.ceil(filterTeacherData.length / 5));
    } else {
      setStartSlice(startSlice + 5);
      setEndSlice(endSlice + 5);
      setPageCount(pageCount + 1);
    }
  };

  const gotoPrevPage = () => {
    setStartSlice(0);
    setEndSlice(5);
    setPageCount(1);
  };
  const gotoNextPage = () => {
    setStartSlice(filterTeacherData.length - 5);
    setEndSlice(filterTeacherData.length);
    setPageCount(Math.ceil(filterTeacherData.length / 5));
  };

  useEffect(() => {
    apiClients
      .getFetch("teacher", {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      })
      .then((teacher) => {
        setTeacherTableData(teacher.results);
        setFilterTeacherData(teacher.results);
      });
  }, []);
  return (
    <div className="flex flex-col gap-y-6">
      <h1 className="text-4xl text-white font-bold">Teachers</h1>

      <div className="inline-block min-w-full overflow-hidden rounded-lg shadow bg-gray-800 flex flex-col gap-y-2 items-center">
        <div className="flex justify-between w-full">
          <div className=" w-[440px] flex items-center pl-4  gap-x-2">
            <HiSearch className="text-slate-500 text-2xl mt-3" />
            <Input
              type="search"
              classNames="bg-transparent outline-none focus:outline-none w-full text-white pt-2 pb-2"
              placeholder="Search by full name or role"
              onChange={(e) => setSearchTeacher(e.target.value)}
            />
          </div>
        </div>
        <TeacherTable
          {...{ teacherTableHeadData, filterTeacherData }}
          {...{ startSlice, endSlice }}
        />
        <Pagination
          {...{
            gotoNextPage,
            gotoPrevPage,
            pageCount,
            pageOptions: teacherTableData,
            nextPage,
            previousPage,
            pageOptionCount: 5,
          }}
        />
      </div>
    </div>
  );
}
