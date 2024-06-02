import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { chain, countBy } from "lodash";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TopSourceIPsByNumberOfConnections = ({ data }) => {
  const sourceIPs = countBy(data, "src_ip");
  const topSourceIPs = chain(sourceIPs)
    .toPairs()
    .orderBy([1], ["desc"])
    .take(10)
    .fromPairs()
    .value();
  const labels = Object.keys(topSourceIPs);
  const values = Object.values(topSourceIPs);

  const barData = {
    labels,
    datasets: [
      {
        label: "Connections",
        data: values,
        backgroundColor: "#FF6384",
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2 p-4">
        Top Source IPs by Number of Connections
      </h2>
      <Bar data={barData} options={options} />
    </div>
  );
};

export default TopSourceIPsByNumberOfConnections;
