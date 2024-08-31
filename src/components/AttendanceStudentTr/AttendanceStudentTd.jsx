import PropTypes from "prop-types";
import { useState } from "react";
export function AttendanceStudentTd({
  studentData,
  onSubmitLevel,
  level,
  date,
  setStudentId,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [levelName, setLevelName] = useState(null);
  // console.log(new Date().);
  return (
    <td
      onClick={() => {
        setIsOpen(!isOpen);
        setStudentId(studentData.id);
        // if (
        //   date == new Date().toLocaleDateString().split(".").reverse().join("-")
        // ) {

        // }
      }}
    >
      <div className="relative capitalize">
        <span className="block cursor-pointer  p-1 hover:bg-slate-300 transition">
          {levelName ? levelName : "Tanlang"}
        </span>
        {isOpen ? (
          <div className="bg-slate-400 absolute left-0 right-0 z-10">
            {level?.map((data) => {
              return (
                <div
                  key={data.id}
                  onClick={() => {
                    setLevelName(data.title);
                    onSubmitLevel(data.id, studentData.id);
                  }}
                  className="p-1 cursor-pointer hover:bg-slate-500"
                >
                  {data.title}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </td>
  );
}

AttendanceStudentTd.propTypes = {
  studentData: PropTypes.object,
  level: PropTypes.array,
  onSubmitLevel: PropTypes.func,
  date: PropTypes.string,
};
