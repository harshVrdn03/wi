import React from "react";
import { Doughnut } from "react-chartjs-2";
import { countBy, filter } from "lodash";

export default function DoughnutGraph({ data }) {
  const getCategoryDistribution = () => {
    const alertEvents = filter(data, { event_type: "alert" });

    const categories = countBy(alertEvents, (event) => event.alert?.category);

    return {
      labels: Object.keys(categories),
      datasets: [
        {
          data: Object.values(categories),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <div className="w-full h-full ">
      <h2 className="text-lg font-semibold mb-4 dark:text-white text-center">
        Alert Distribution by Category
      </h2>
      <div className="w-full  overflow-x-scroll h-full">
        <Doughnut data={getCategoryDistribution()} options={options} />
      </div>
    </div>
  );
}
