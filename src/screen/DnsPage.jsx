import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import TopSourceIPsByNumberOfConnections from "../components/TopSourceIPsByNumberOfConnections";
import { countBy } from "lodash";

export default function DnsPage({ data }) {
  return (
    <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-md p-4">
          <DNSQueryTypesDistribution data={data} />
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-md p-4 md:col-span-1 lg:col-span-2">
          <TopSourceIPsByNumberOfConnections data={data} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md mt-4 max-w-screen-xl overflow-auto">
        <DNSTable data={data} />
      </div>
    </div>
  );
}

const DNSQueryTypesDistribution = ({ data }) => {
  // Count occurrences of each query type
  const queryTypes = countBy(data, (entry) => entry.dns?.type || "Unknown");

  const pieData = {
    labels: Object.keys(queryTypes),
    datasets: [
      {
        data: Object.values(queryTypes),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#8A2BE2",
          "#7FFF00",
        ],
      },
    ],
  };

  return (
    <div className="mb-8 h-[30vh] pb-12">
      <h2 className="text-xl font-semibold mb-2">
        DNS Query Types Distribution
      </h2>
      <Pie data={pieData} />
    </div>
  );
};

const DNSTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">DNS Data Table</h2>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Timestamp
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Source IP
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Destination IP
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((entry, index) => (
            <tr
              key={index}
              className={
                index % 2 === 0
                  ? "bg-white dark:bg-gray-800"
                  : "bg-gray-50 dark:bg-gray-700"
              }
            >
              <td className="px-6 py-4 whitespace-nowrap">{entry.timestamp}</td>
              <td className="px-6 py-4 whitespace-nowrap">{entry.src_ip}</td>
              <td className="px-6 py-4 whitespace-nowrap">{entry.dest_ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end">
        <nav className="relative z-0 inline-flex shadow-sm -space-x-px">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-10"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-10"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};
