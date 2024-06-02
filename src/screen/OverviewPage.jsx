import React from "react";
import DNSQueryTypesDistribution from "../components/DNSQueryTypesDistribution";
import TopDestinationsByNumberOfConnections from "../components/TopDestinationsByNumberOfConnections";
import TopSourceIPsByNumberOfConnections from "../components/TopSourceIPsByNumberOfConnections";
import DoughnutGraph from "../components/Doughnut";

export default function OverviewPage({ data }) {
  return (
    <>
      <div className="min-h-screen  pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 grid-flow-dense">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md  flex justify-center h-full">
            <DoughnutGraph data={data} />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md lg:col-span-2">
            <TopSourceIPsByNumberOfConnections data={data} />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md lg:col-span-2">
            <TopDestinationsByNumberOfConnections data={data} />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <DNSQueryTypesDistribution data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
