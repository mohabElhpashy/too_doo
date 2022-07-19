import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";
const Detailes = () => {
  const { services, isLoading, isError, refetch, error } =
    useFetch(`genericDetails`);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Value Name",
      dataIndex: "name_en",
      key: "name_en",
      sorter: (a, b) => a.name_en.length - b.name_en.length,
    },
    {
      title: "Type",
      dataIndex: "type_name_en",
      key: "type_name_en",
      // render: (id) => tempConverstion(id),
      // sorter: (a, b) => a.service_id - b.service_id,
    },
  ];

  return (
    <>
      <CustomTable
        pageTitle="Details Value"
        coloumRender={columns}
        dataRender={services}
        isLoading={isLoading}
        error={error}
        endPoint={"genericDetails"}
        refetch={refetch}
        addEndPoint="generic/addDetailesForm"
        editEndPoint="generic/editDetialsForm"
      />
    </>
  );
};

export default Detailes;
