import React, { useEffect, useRef, useState } from "react";
import { useFetch } from "hooks";
import CustomTable from "../Components/CustomTable";
import { Tag, message, Select, Table, Button, Input } from "antd";
import service from "auth/FetchInterceptor";
import { SearchOutlined } from "@ant-design/icons";
import Search from "components/shared-components/Search";
function OfflineClients() {
  const { services, isLoading, isError, refetch, error, isSuccess } =
    useFetch("offlineClients");
  const [currentList, setCurrentList] = useState([]);

  useEffect(() => setCurrentList(services), [services]);
  console.log(currentList, "Current List");
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => `# ${id}`,
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name_en",
      key: "name_en",
      // sorter: (a, b) => a.name_en.length - b.name_en.length,
      // filterDropdown: (
      //   <Search
      //     setCurrentList={setCurrentList}
      //     dataIndex={"Name"}
      //     prevousState={services}
      //     url="offlineClients/search?offline_client_search"
      //   />
      // ),
      // filterIcon: (filtered) => (
      //   <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      // ),
    },
    {
      title: "Seller Name",
      key: "store_name",
      render: (_, obj) => <span>{obj?.store_name?.store_name_en}</span>,
    },

    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      // filterDropdown: (
      //   <Search
      //     setCurrentList={setCurrentList}
      //     dataIndex={"Phone Number"}
      //     prevousState={services}
      //     url="offlineClients/search?offline_client_search"
      //   />
      // ),
      // filterIcon: (filtered) => (
      //   <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      // ),
    },
  ];
  return (
    <div>
      <CustomTable
        pageTitle="Offline Clients list"
        // Search={Search}
        dataRender={currentList}
        coloumRender={columns}
        isLoading={isLoading}
        noEditAction={true}
        noDeleteAction={true}
        setCurrentList={setCurrentList}
        prevousState={services}
        refetch={refetch}
        error={error}
        addEndPoint="CRM/addOfflineClient"
        editEndPoint="CRM/veClientForm"
        searchUrl="offlineClients/search?offline_client_search"
      />
    </div>
  );
}

export default OfflineClients;
