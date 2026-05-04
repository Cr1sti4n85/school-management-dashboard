import React from "react";

type Props<T> = {
  columns: {
    header: string;
    accessor: string;
    className?: string;
  }[];
  renderRow: (obj: T) => React.ReactNode;
  data: T[];
};

const Table = <T,>({ columns, renderRow, data }: Props<T>) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left text-gray-500 text-sm">
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((obj) => renderRow(obj))}</tbody>
    </table>
  );
};

export default Table;
