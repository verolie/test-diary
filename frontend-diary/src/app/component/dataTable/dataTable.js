"use client";

import React from "react";

function DataTable({ data, onEdit, onDelete }) {
  if (!data.length)
    return <p className="text-center text-gray-500">No data available</p>;

  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((header) => (
              <th
                key={header}
                className="border border-gray-300 px-4 py-2 text-left"
              >
                {header}
              </th>
            ))}
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {headers.map((header) => (
                <td key={header} className="border border-gray-300 px-4 py-2">
                  {row[header]}
                </td>
              ))}
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => onEdit(row)}
                  className="mr-2 text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(row)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-sm text-gray-600">Total items: {data.length}</p>
    </div>
  );
}

export default DataTable;
