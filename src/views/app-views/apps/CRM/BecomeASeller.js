import { Table } from "antd";
import { useFetch } from "hooks";
import React from "react";
function BecomeASeller() {
  const { services, isLoading, isError, refetch, error } =
    useFetch("allRequestSellers");
  //   const changeStatus = async (record) => {
  //     try {
  //       await service.put(
  //         `/BecomeASellers/change-status/${record.id}`
  //       );
  //       refetch();
  //     } catch (error) {}
  //   };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => `# ${id}`,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: " Name ",
      dataIndex: "first_name",
      key: "first_name",
      sorter: (a, b) => a.first_name.length - b.first_name.length,
    },

    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      sorter: (a, b) => a.last_name.length - b.last_name.length,
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "Service Name",
      key: "service_name",
      dataIndex: "service_name",
    },
    // {
    //   title: "Status",
    //   dataIndex: "active",
    //   align: "center",
    //   key: "active",
    //   render: (text, record) => {
    //     if (text) {
    //       return (
    //         <div className="d-flex align-items-center justify-content-center">
    //           <Tag
    //             className="cursor-pointer"
    //             onClick={() => changeStatus(record)}
    //             color="green"
    //           >
    //             Active
    //           </Tag>
    //         </div>
    //       );
    //     } else {
    //       return (
    //         <div className="d-flex align-items-center justify-content-center">
    //           <Tag
    //             className="cursor-pointer "
    //             onClick={() => changeStatus(record)}
    //             color="red"
    //           >
    //             InActive
    //           </Tag>
    //         </div>
    //       );
    //     }
    //   },
    // },
  ];
  return (
    <div>
      <Table
        title={() => <h2>Become A Seller list</h2>}
        dataSource={services}
        columns={columns}
        rowKey={(item) => item.id?.toString()}
      />
    </div>
  );
}

export default BecomeASeller;
