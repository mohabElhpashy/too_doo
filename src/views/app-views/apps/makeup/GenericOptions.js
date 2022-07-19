import { Tag } from "antd";
import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";

const GenericOptions = () => {
  const { services, isLoading, refetch } = useFetch(
    "makeupServiceGenericOptions"
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "Service ID",
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
        pageTitle="Generic Options"
        dataRender={services}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
        endPoint="makeupServiceGenericOptions"
        addEndPoint="makeup/AddGenericOption"
      />
    </>
  );
};

export default GenericOptions;
