import { Tag } from "antd";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks";
import React from "react";
import { useState } from "react";
import CustomTable from "../Components/CustomTable";

const GenericOptions = () => {
  const { services, isLoading, refetch, error } = useFetch(
    "weddingHallGenericOption"
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
        endPoint="weddingHallGenericOption"
        addEndPoint="hotel/AddGenericOption"
        dataRender={services}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
        error={error}
      />
    </>
  );
};

export default GenericOptions;
