import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";
const Tags = () => {
  const { services, isLoading, isError, refetch, error } = useFetch(`tags`);
  const tempConverstion = (id) => {
    switch (id) {
      case 1:
        return "Car";

      case 2:
        return "Hotel";
      case 3:
        return "Doctor";
      case 4:
        return "Beauty Center";
      case 5:
        return "Photographers";
      case 6:
        return "Trips";
      case 7:
        return "Dress";
      case 8:
        return "Make Up";
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Tag  Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Service Name",
      dataIndex: "service_id",
      key: "service_id",
      render: (id) => tempConverstion(id),
      // sorter: (a, b) => a.service_id - b.service_id,
    },
  ];

  return (
    <>
      <CustomTable
        pageTitle="Generic Tags"
        coloumRender={columns}
        dataRender={services}
        isLoading={isLoading}
        error={error}
        endPoint={"tags"}
        refetch={refetch}
        addEndPoint="generic/addTagsForm"
        editEndPoint="generic/editTagsForm"
      />
    </>
  );
};

export default Tags;
