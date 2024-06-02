import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DNSQueryTypesDistribution = ({ data }) => {
  const queryTypes = data.reduce((types, entry) => {
    const type = entry.dns?.rrtype || "Unknown";
    types[type] = (types[type] || 0) + 1;
    return types;
  }, {});

  const labels = Object.keys(queryTypes);
  const values = Object.values(queryTypes);

  const pieData = {
    labels,
    datasets: [
      {
        data: values,
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

  const options = {
    responsive: true,
    maintainAspectRatio: true,
  };
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">
        DNS Query Types Distribution
      </h2>
      <Pie data={pieData} options={options} />
    </div>
  );
};

export default DNSQueryTypesDistribution;
