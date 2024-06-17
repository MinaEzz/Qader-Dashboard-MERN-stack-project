/* eslint-disable react/jsx-key */
import { useTable } from "react-table/dist/react-table.development";
import Button from "./Button";

const DataTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  showEdit,
  setIsEditModalOpen,
  setIsDeleteModalOpen,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table {...getTableProps()} className="min-w-full bg-white">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-primary-600"
              >
                {column.render("Header")}
              </th>
            ))}
            <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-primary-600">
              Actions
            </th>
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  className="px-4 py-2 border-b border-gray-200 text-sm text-black"
                >
                  {cell.render("Cell")}
                </td>
              ))}
              <td className="px-4 py-2 border-b border-gray-200 text-sm text-black space-y-3">
                {showEdit && (
                  <Button
                    label={"edit"}
                    backgroundColor="bg-slate-700"
                    hoverBgColor="hover:bg-slate-800"
                    activeBgColor="active:bg-slate-900"
                    height={"h-8"}
                    fontSize={"text-sm"}
                    onClick={() => {
                      onEdit(row.original);
                      setIsEditModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                )}
                <Button
                  label={"delete"}
                  backgroundColor="bg-coral-red-700"
                  hoverBgColor="hover:bg-coral-red-800"
                  activeBgColor="active:bg-coral-red-900"
                  height={"h-8"}
                  fontSize={"text-sm"}
                  onClick={() => {
                    onDelete(row.original._id);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
