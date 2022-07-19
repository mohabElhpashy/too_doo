import { Badge, Menu, message, Table } from "antd";
import service from "auth/FetchInterceptor";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useFetch } from "hooks";
import React from "react";
import utils from "utils";

function SellerRequestCalls() {
  const { services, isSuccess, refetch } = useFetch("sellerCallRequest");
  const statusListRes = useFetch("sellerCallRequest/statuses");
  const statusList = statusListRes.services;

  const handleChange = async (id, type) => {
    const key = "updatable!";
    message.loading({ content: "Loading...", key, duration: 15 });
    try {
      await service.put(`/web/sellerCallRequest/${id}`, {
        status_id: type,
      });
      refetch();
      message.success({ content: "Done!", key, duration: 2 });
    } catch (error) {
      message.error({ content: "Error Occured!", key, duration: 2 });
    }
  };

  const dropdownMenu = (row) => (
    <Menu>
      <span className=" d-flex align-items-center justify-content-center">
        <h5 className="mt-1">Status</h5>
      </span>
      {statusList?.map((element) => (
        <Menu.Item onClick={() => handleChange(row.id, element.id)}>
          <Flex alignItems="center">
            <Badge status={getStatus(element.id)} />

            <span className="ml-2">{element.name_en}</span>
          </Flex>
        </Menu.Item>
      ))}
      {/*     
      <Menu.Item onClick={() => handleChange(row.id, 6)}>
        <Flex alignItems="center">
          <Badge status="error" />
          <span className="ml-2">Declined By Client</span>
        </Flex>
      </Menu.Item> */}
    </Menu>
  );

  const getStatus = (status) => {
    switch (status) {
      case 11:
        return "warning";
      case 12:
        return "success";
      case 13:
        return "error";
      default:
        return "";
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      render: (id) => `# ${id}`,
    },
    {
      title: "Seller Name",
      dataIndex: "seller_name",
      key: "seller_name",
      sorter: (a, b) => a.seller_name.length - b.seller_name.length,
    },

    {
      title: "Details",
      dataIndex: "details",
      key: "details",
    },
    {
      title: "Status",
      key: "status",
      render: (record) => (
        <>
          <Badge status={getStatus(record.status_id)} />

          <span style={{ fontWeight: "bold" }}>
            {
              statusList?.find((element) => element.id === record.status_id)
                ?.name_en
            }
          </span>
        </>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "status_id"),
    },

    {
      title: "",
      key: "actions ",
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        title={() => <h2>Sellers Request Calls</h2>}
        dataSource={services}
        rowKey={(item) => item.id}
        columns={columns}
      />
    </div>
  );
}

export default SellerRequestCalls;
