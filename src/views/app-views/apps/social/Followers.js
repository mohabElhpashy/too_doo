import { Table } from "antd";
import Loading from "components/shared-components/Loading";
import { useFetch } from "hooks";
import React from "react";
import { useLocation } from "react-router-dom";

function Followers() {
  const location = useLocation();
  const { record_id } = location.state;
  const { services, isLoading } = useFetch(`follow/${record_id}`);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Client Name ",
      dataIndex: "client name",
      key: "client name",
      sorter: (a, b) => a["client name"].length - b["client name"].length,
    },
    {
      title: "Seller Name",
      dataIndex: "seller name",
      key: "seller name",
      sorter: (a, b) => a["seller name"].length - b["seller name"].length,
    },
  ];

  return (
    <>
      {isLoading ? (
        <Loading cover="content" align={"center"} loading={true} />
      ) : (
        <Table
          dataSource={services}
          columns={columns}
          bordered
          rowKey={(item) => item.id?.toString()}
          title={() => <h2>List Of Followers</h2>}
        />
      )}
    </>
  );
}

export default Followers;
