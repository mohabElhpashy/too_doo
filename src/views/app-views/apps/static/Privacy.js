import React from "react";
import { useFetch } from "hooks";
import CustomTable from "../Components/CustomTable";
const Privacy = () => {
  const { services, isLoading, refetch, error } = useFetch("privacyPolicy");
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title ",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
      sorter: (a, b) => a.body.length - b.body.length,
    },
  ];
  return (
    <>
      <CustomTable
        pageTitle="Privacy"
        coloumRender={columns}
        dataRender={services}
        isLoading={isLoading}
        error={error}
        endPoint={"privacyPolicy"}
        refetch={refetch}
        addEndPoint="staticPages/privacyAddForm"
        editEndPoint="staticPages/privacyEditForm"
      />
    </>
  );
};

export default Privacy;
