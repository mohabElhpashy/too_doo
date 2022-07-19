import { Table } from "antd";
import service from "auth/FetchInterceptor";
import React from "react";
import { useQuery } from "react-query";
function Seller() {
  const { data, isLoading, refetch, error } = useQuery(
    "sellerActivityLog",
    async () => {
      const res = await service
        .get(`/web/sellerActivityLog`)
        .then((res) => res.data);
      return res;
    }
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      render: (id) => `# ${id}`,
    },
    {
      title: "Log Name",
      dataIndex: "log_name",
      key: "log_name",
      sorter: (a, b) => a.log_name.length - b.log_name.length,
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Subject Type",
      dataIndex: "subject_type",
      key: "subject_type",
    },
    {
      title: "Causer Type",
      dataIndex: "causer_type",
      key: "causer_type",
    },
  ];
  return (
    <div>
      <Table
        bordered
        title={() => <h2>Sellers Logs</h2>}
        dataSource={data?.data}
        rowKey={(item) => item.id}
        columns={columns}
      />
    </div>
  );
}

export default Seller;
