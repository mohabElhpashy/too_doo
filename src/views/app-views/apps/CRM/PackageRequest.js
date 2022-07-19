import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";
const PackageRequest = () => {
  const { services, isLoading, isError, refetch, error } =
    useFetch("complains");
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User Name ",
      dataIndex: "user_name",
      key: "user_name",
      sorter: (a, b) => a.user_name.length - b.user_name.length,
    },
    {
      title: "User ID",
      dataIndex: "user_id",
      key: "user_id",
      sorter: (a, b) => a.user_id - b.user_id,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => a.type.length - b.type.length,
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      sorter: (a, b) => a.message.length - b.message.length,
    },
  ];
  return (
    <>
      <CustomTable
        pageTitle="List of Complains"
        coloumRender={columns}
        dataRender={services}
        isLoading={isLoading}
        error={error}
        noAddOption={true}
        noDeleteAction={true}
        noEditAction={true}
        endPoint={"complains"}
        refetch={refetch}
        editEndPoint="CRM/viewComplain"
      />
    </>
  );
};

export default PackageRequest;
