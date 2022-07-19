import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";
import { convertingServiceId } from "constants/helperFunctions";
const Tags = () => {
  const { services, isLoading, isError, refetch, error } =
    useFetch(`service_tips`);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      render: (id) => `# ${id}`,
    },
    {
      title: "Service Name",
      dataIndex: "service_id",
      key: "service_id",
      sorter: (a, b) => a.service_id - b.service_id,
      render: (id) => convertingServiceId(id),
    },
    {
      title: "Subject",
      dataIndex: "subject_en",
      key: "subject_en",
      sorter: (a, b) => a.subject_en.length - b.subject_en.length,
    },
    {
      title: "Body",
      dataIndex: "body_en",
      key: "body_en",
      sorter: (a, b) => a.body_en.length - b.body_en.length,
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
      sorter: (a, b) => a.number - b.number,
    },
  ];

  return (
    <>
      <CustomTable
        pageTitle="Increase Your Profit"
        coloumRender={columns}
        dataRender={services}
        isLoading={isLoading}
        error={error}
        endPoint={"service_tips"}
        refetch={refetch}
        addEndPoint="generic/increaseProfitAddForm"
        editEndPoint="generic/editIncreaseForm"
      />
    </>
  );
};

export default Tags;
