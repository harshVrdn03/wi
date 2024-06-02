import React, { useEffect, useState } from "react";

const SecurityPage = ({ data }) => {
  const [filter, setFilter] = useState("all");

  const filteredData =
    filter === "all"
      ? data
      : data.filter((event) => event.event_type === filter);

  return (
    <div className="container mx-auto px-4 py-8 text-black ">
      <div className="mb-4">
        <label className="mr-2 font-semibold dark:text-white">Filter by:</label>
        <select
          className="px-2 py-1 border border-gray-400 rounded dark:bg-gray-800 dark:text-white"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="dns">DNS</option>
          <option value="alert">Alert</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((event, index) => {
          switch (event.event_type) {
            case "dns":
              return <DNSAlert key={index} event={event} />;
            case "alert":
              // Determine if it's an HTTP alert or Fileinfo alert
              if (event.http) {
                return <HTTPAlert key={index} event={event} />;
              } else if (event.fileinfo) {
                return <FileinfoAlert key={index} event={event} />;
              }
              break;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

const FileinfoAlert = ({ event }) => {
  return (
    <div className="bg-gray-800 dark:bg-gray-900 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2  ">Fileinfo Alert</h2>
      <p className="mb-2  ">Timestamp: {event.timestamp}</p>
      <p className="mb-2  ">Source IP: {event.src_ip}</p>
      <p className="mb-2  ">Destination IP: {event.dest_ip}</p>
      {event.fileinfo && (
        <>
          <p className="mb-2  ">File Name: {event.fileinfo.filename}</p>
          <p className="mb-2  ">State: {event.fileinfo.state}</p>
          <p className="mb-2  ">
            Stored: {event.fileinfo.stored ? "Yes" : "No"}
          </p>
          <p className="mb-2  ">Size: {event.fileinfo.size}</p>
        </>
      )}
    </div>
  );
};

const HTTPAlert = ({ event }) => {
  return (
    <div className="bg-orange-300 dark:bg-gray-900  dark:text-white  p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2  ">HTTP Alert</h2>
      <p className="mb-2  ">Timestamp: {event.timestamp}</p>
      <p className="mb-2  ">Source IP: {event.src_ip}</p>
      <p className="mb-2  ">Destination IP: {event.dest_ip}</p>
      {event.http && (
        <>
          <p className="mb-2  ">URL: {event.http.url}</p>
          <p className="mb-2  ">Method: {event.http.http_method}</p>
          <p className="mb-2  ">Status: {event.http.status}</p>
        </>
      )}
    </div>
  );
};

const DNSAlert = ({ event }) => {
  return (
    <div className="bg-red-300  dark:text-white text-black dark:bg-gray-900 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2  ">DNS Alert</h2>
      <p className="mb-2  ">Timestamp: {event.timestamp}</p>
      <p className="mb-2  ">Source IP: {event.src_ip}</p>
      <p className="mb-2  ">Destination IP: {event.dest_ip}</p>
      {event.dns && (
        <>
          <p className="mb-2  ">RRName: {event.dns.rrname}</p>
          <p className="mb-2  ">RRType: {event.dns.rrtype}</p>
        </>
      )}
    </div>
  );
};

export default SecurityPage;
