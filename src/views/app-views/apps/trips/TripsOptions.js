import React from "react";
import { Table } from "antd";
import { useFetch } from "hooks";

const TripsOptions = () => {
  const { services } = useFetch("tripOption");

  const columns = [
    {
      title: "Index",
      render: (text, record, index) => {
        return index;
      },
    },
    {
      title: "Trip ID",
      dataIndex: "trip_id",
      key: "trip_id",
    },
    {
      title: "Trip Generic Options",
      dataIndex: "trip_generic_option_id",
      key: "trip_generic_option_id",
    },

    {
      title: "Active",
      dataIndex: "active",
      key: "active",
    },

    {
      title: "Actions",
      dataIndex: "",
    },
  ];

  return (
    <div>
      <Table
        bordered
        title={(currentPageDAta) => <h2> Checkup Options </h2>}
        rowKey={(item) => item.id}
        dataSource={services}
        columns={columns}
      />
    </div>
  );
};

export default TripsOptions;
