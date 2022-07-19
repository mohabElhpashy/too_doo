import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";
import { statusStyle } from "../Components/constants/coloumStyle";
import { Tag } from "antd";
const GenericOptions = () => {
  const { services, isLoading, refetch } = useFetch(
    "beautyCenterServiceGenericOptions"
  );
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
      sorter: (a, b) => a.title_ar.length - b.title_ar.length,
    },
    {
      title: "English Title",
      dataIndex: "title_en",
      key: "title_en",
      sorter: (a, b) => a.title_en.length - b.title_en.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
        endPoint="beautyCenterServiceGenericOptions"
        pageTitle="Generic Options List"
        addEndPoint="beauty/AddGenericOption"
        dataRender={services}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
      />
    </>
  );
};

export default GenericOptions;
