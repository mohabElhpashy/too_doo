import React from "react";
import { useFetch } from "hooks";
import CustomTable from "../Components/CustomTable";
import { statusStyle } from "../Components/constants/coloumStyle";
import { Tag } from "antd";
const GenericOptions = () => {
  const { services, isLoading, refetch, error } = useFetch("carGenericOption");
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "Name English",
      dataIndex: "name_en",
      key: "name_en",
    },
    {
      title: "Name Arabic",
      dataIndex: "name_ar",
      key: "name_ar",
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
        pageTitle="Generic Options List"
        dataRender={services}
        addEndPoint="cars/addFormGenericOptions"
        endPoint={"carGenericOption"}
        editEndPoint="cars/veditGenericOptions"
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
        error={error}
      />
    </>
  );
};

export default GenericOptions;
