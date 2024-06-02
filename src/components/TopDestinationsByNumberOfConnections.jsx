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
import { countBy, take, keys, values } from "lodash";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TopDestinationsByNumberOfConnections = ({ data }) => {
  // Count occurrences of each destination IP using lodash
  const destinationIPs = countBy(data, "dest_ip");

  // Get the top 10 destination IPs
  const labels = take(keys(destinationIPs), 10);
  const values2 = take(values(destinationIPs), 10);

  const barData = {
    labels,
    datasets: [
      {
        label: "Connections",
        data: values2,
        backgroundColor: "#4BC0C0",
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="mb-8 h-[400px]">
      <h2 className="text-xl font-semibold mb-2">
        Top Destinations by Number of Connections
      </h2>
      <Bar data={barData} options={options} />
    </div>
  );
};

export default TopDestinationsByNumberOfConnections;
