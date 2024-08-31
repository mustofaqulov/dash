import PropTypes from "prop-types";

import { Link } from "react-router-dom";
export function StudentTables({
  studentTableHead,
  studentTableData,
  startSlice,
  endSlice,
}) {
  return (
    <table className="w-full text-center text-white">
      <thead>
        <tr>
          {studentTableHead.map((header) => {
            const { Header, accessor } = header;
            return (
              <th
                key={accessor}
                scope="col"
                className="border-y border-slate-500 pt-4 pb-4 pl-2 capitalize"
              >
                {Header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {studentTableData?.slice(startSlice, endSlice).map((body) => {
          const { id, full_name, group, organization, phone } = body;
          // setSelectOption(group);
          return (
            <tr key={id}>
              <td className="w-[5%] border border-slate-500 pt-4 pb-4">{id}</td>
              <td className="border border-slate-500 pt-4 pb-4">
                <Link to={`/manager/students/${id}`}>{full_name}</Link>
              </td>
              <td className="w-[15%] border border-slate-500 pt-4 pb-4">
                {organization}
              </td>
              <td className="w-[15%] border border-slate-500 pt-4 pb-4">
                {group}
              </td>
              <td className="w-[20%] border border-slate-500 pt-4 pb-4">
                {phone}
                {/* <select
                  onChange={(e) => console.log(e.target.value)}
                  name="attendanceLevel"
                  className="text-black"
                >
                  <option value="0">Yo&apos;qlama</option>
                  {selectOption
                    ? selectOption.reverse().map((option) => {
                        return (
                          <option key={option.id} value={option.id}>
                            {option.title}
                          </option>
                        );
                      })
                    : null}
                </select> */}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

StudentTables.propTypes = {
  studentTableHead: PropTypes.array,
  studentTableData: PropTypes.array,
  startSlice: PropTypes.number,
  endSlice: PropTypes.number,
};
