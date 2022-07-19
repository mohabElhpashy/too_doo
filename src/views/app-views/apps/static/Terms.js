import React from "react";
import { useFetch } from "hooks";
import CustomTable from "../Components/CustomTable";
const Terms = () => {
  const { services, isLoading, isError, refetch, error } =
    useFetch("terms-conditions");
  const trncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Type ",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => a.type.length - b.type.length,
    },
    {
      title: "Body",
      key: "body_en",
      dataIndex: "body_en",
      render: (body) => trncate(body, 40),
      sorter: (a, b) => a.body_en.length - b.body_en.length,
    },
  ];
  return (
    <>
      <CustomTable
        pageTitle="Terms and Conditions"
        coloumRender={columns}
        dataRender={services}
        isLoading={isLoading}
        error={error}
        endPoint={"terms-conditions"}
        refetch={refetch}
        addEndPoint="staticPages/TermsAddForm"
        editEndPoint="staticPages/TermsEditForm"
      />
    </>
  );
};

export default Terms;
