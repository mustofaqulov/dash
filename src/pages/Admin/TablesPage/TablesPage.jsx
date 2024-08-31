import {
  Input,
  Pagination,
  StudentTable,
} from "../../../components";
import { useState, useEffect } from "react";
import { userTableHeadData } from "../../../utils/mock/userTableHeadData.mock";
import { HiSearch } from "react-icons/hi";
import { apiClients } from "../../../services/APIClients";
export function TablesPage() {
  const { getFetch } = apiClients;
  const [searchStudent, setSearchStudent] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [filterStudentData, setFilterStudentData] = useState(null);
  const [startSlice, setStartSlice] = useState(0);
  const [endSlice, setEndSlice] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  useEffect(() => {
    setFilterStudentData(
      studentData?.filter((data) => {
        if (
          data.full_name.toLowerCase().includes(searchStudent.toLowerCase())
        ) {
          return data;
        } else {
          return null;
        }
      })
    );
  }, [searchStudent]);
  const previousPage = () => {
    if (endSlice <= 10) {
      setStartSlice(0);
      setEndSlice(10);
      setPageCount(1);
    } else {
      setStartSlice(startSlice - 10);
      setEndSlice(endSlice - 10);
      setPageCount(pageCount - 1);
    }
  };
  const nextPage = () => {
    if (endSlice >= filterStudentData.length) {
      setStartSlice(filterStudentData.length - 10);
      setEndSlice(filterStudentData.length);
      setPageCount(Math.ceil(filterStudentData.length / 10));
    } else {
      setStartSlice(startSlice + 10);
      setEndSlice(endSlice + 10);
      setPageCount(pageCount + 1);
    }
  };

  const gotoPrevPage = () => {
    setStartSlice(0);
    setEndSlice(10);
    setPageCount(1);
  };
  const gotoNextPage = () => {
    setStartSlice(filterStudentData.length - 10);
    setEndSlice(filterStudentData.length);
    setPageCount(Math.ceil(filterStudentData.length / 10));
  };

  useEffect(() => {
    getFetch("studentApi", {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    })
      .then((res) => {
        setStudentData(res.reverse());
        setFilterStudentData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="flex flex-col gap-y-6">
      <h1 className="text-4xl text-white font-bold">O&apos;quvchilar</h1>
      <div className="inline-block min-w-full overflow-hidden rounded-lg shadow bg-gray-800 flex flex-col gap-y-2 items-center">
        <div className="flex justify-between w-full">
          <div className=" w-[440px] flex items-center pl-4  gap-x-2">
            <HiSearch className="text-slate-500 text-2xl mt-3" />
            <Input
              type="search"
              classNames="bg-transparent outline-none focus:outline-none w-full text-white pt-2 pb-2"
              placeholder="Search by full name or role"
              onChange={(e) => setSearchStudent(e.target.value)}
            />
          </div>
        </div>
        <StudentTable
          studentTableHead={userTableHeadData}
          studentTableData={filterStudentData}
          startSlice={startSlice}
          endSlice={endSlice}
        />
        <Pagination
          gotoNextPage={gotoNextPage}
          gotoPrevPage={gotoPrevPage}
          nextPage={nextPage}
          previousPage={previousPage}
          pageCount={pageCount}
          pageOptions={filterStudentData}
          pageOptionCount={10}
        />
      </div>
    </div>
  );
}
