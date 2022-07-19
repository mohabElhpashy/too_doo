import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";
import { Tag } from "antd";
const GenericOptions = () => {
  const { services, refetch, isLoading } = useFetch("tripGenericOption");
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
      dataIndex: "active",
      key: "active",
      render: (text) => {
        if (text) {
          return <Tag color="green">Active</Tag>;
        } else {
          return <Tag color="red">InActive</Tag>;
        }
      },
    },
  ];
  return (
    <>
      <CustomTable
        endPoint="tripGenericOption"
        pageTitle="Generic Options List"
        dataRender={services}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
      />
    </>
  );
};

export default GenericOptions;
