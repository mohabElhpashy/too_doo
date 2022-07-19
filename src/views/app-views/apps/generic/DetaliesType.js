import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";
const DetaliesType = () => {
  const { services, isLoading, isError, refetch, error } =
    useFetch(`genericDetailsType`);
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
      title: "Types Name",
      dataIndex: "name_en",
      key: "name_en",
      sorter: (a, b) => a.name_en.length - b.name_en.length,
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
        pageTitle="Types"
        coloumRender={columns}
        dataRender={services}
        isLoading={isLoading}
        error={error}
        endPoint={"genericDetailsType"}
        refetch={refetch}
        addEndPoint="generic/detaliesTypeAddForm"
        editEndPoint="generic/detaliesTypeEditForm"
      />
    </>
  );
};

export default DetaliesType;
