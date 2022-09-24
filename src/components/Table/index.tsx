import React from "react";
import { Member } from "../../types";

interface Props {
  data: Member[];
}

const Table: React.FC<Props> = ({ data }: Props): React.ReactElement => {
  return (
    <table className="w-full">
      <thead className="sticky top-0 bg-white">
        <tr className="border-2 border-gray">
          {tableHeaders.map((header) => (
            <th
              className="text-left px-3 py-1 border-r-2 border-gray"
              key={header}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((member: Member) => (
          <tr key={member.ssn} className="border-2 border-gray">
            <td className={tableCellClassName}>{member.firstName}</td>
            <td className={tableCellClassName}>{member.lastName}</td>
            <td className={tableCellClassName}>{member.address}</td>
            <td className={tableCellClassName}>{member.ssn}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

const tableHeaders = ["First Name", "Last Name", "Address", "SSN"];
const tableCellClassName = "px-3 py-1 border-r-2 border-gray text-gray-500";
