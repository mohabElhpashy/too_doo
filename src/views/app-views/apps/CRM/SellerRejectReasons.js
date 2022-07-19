import React from "react";
import { useFetch } from "hooks";
import CustomTable from "../Components/CustomTable";
const SellerRejectReasons = () => {
  const { services, isLoading, isError, refetch, error } =
    useFetch("reject/reasons");
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => `#${id}`,
    },
    {
      title: "Name in Enlish",
      dataIndex: "name_en",
      key: "name_en",
      sorter: (a, b) => a.name_en.length - b.name_en.length,
    },
    {
      title: "Name in Arabic",
      dataIndex: "name_ar",
      key: "name_ar",
      sorter: (a, b) => a.name_ar.length - b.name_ar.length,
    },
    // {
    //   title: "Type",
    //   dataIndex: "is_text",
    //   key: "is_text",
    //   render: (isText) => `${isText ? "Text" : "Not Text"}`,
    // },
  ];
  return (
    <>
      <CustomTable
        pageTitle="List of Rejected Reasons"
        coloumRender={columns}
        addEndPoint
        dataRender={services}
        isLoading={isLoading}
        error={error}
        endPoint={"reject/reasons"}
        refetch={refetch}
        addEndPoint="CRM/addRejectedReasons"
        editEndPoint="CRM/editRejectedReasons"
      />
    </>
  );
};

export default SellerRejectReasons;
