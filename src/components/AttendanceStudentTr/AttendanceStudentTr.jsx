import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AttendanceStudentTd } from "./AttendanceStudentTd";
export function AttendanceStudentTr({
  studentData,
  level,
  onSubmitLevel,
  dates,
  startSliceNum,
  endSliceNum,
  setStudentId,
}) {
  return (
    <tr
      key={studentData.id}
      className="border border-x-0 border-slate-500 relative"
    >
      <td className="p-2">
        <Link to={`/manager/students/${studentData.id}`}>
          {studentData.full_name}
        </Link>
      </td>
      {dates?.slice(startSliceNum, endSliceNum).map((item) => {
        return (
          <AttendanceStudentTd
            key={item.id}
            onSubmitLevel={onSubmitLevel}
            studentData={studentData}
            level={level}
            date={item}
            setStudentId={setStudentId}
          />
        );
      })}
    </tr>
  );
}

AttendanceStudentTr.propTypes = {
  studentData: PropTypes.object,
  level: PropTypes.array,
  onSubmitLevel: PropTypes.func,
  dates: PropTypes.array,
  startSliceNum: PropTypes.number,
  endSliceNum: PropTypes.number,
};
