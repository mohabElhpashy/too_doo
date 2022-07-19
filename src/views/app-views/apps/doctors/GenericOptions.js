import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";
import { statusStyle } from "../Components/constants/coloumStyle";
import { Tag } from "antd";
const GenericOptions = () => {
  const { services, isLoading, refetch } = useFetch("checkupGenericOption");

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Arabic Title",
      dataIndex: "title_ar",
      key: "title_ar",
    },
    {
      title: "English Title",
      dataIndex: "title_en",
      key: "title_en",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        if (text) {
          return <Tag color="green">Active</Tag>;
        } else {
          return <Tag color="red">Inactive</Tag>;
        }
      },
    },
  ];
  return (
    <>
      <CustomTable
        pageTitle="Generic Options Lists"
        dataRender={services}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
        endPoint={"checkupGenericOption"}
        addEndPoint="doctors/AddGenericOption"
      />
    </>
  );
};

export default GenericOptions;
