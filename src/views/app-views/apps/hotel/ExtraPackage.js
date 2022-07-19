import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";
import serviceId from "constants/ServiceIdConstants";
import { Tag } from "antd";
const ExtraPackage = () => {
  const { services, isLoading, refetch } = useFetch(`weddingHallExtraPackages`);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Extra Package Name ",
      dataIndex: "name_en",
      key: "name_en",
      sorter: (a, b) => a.name_en.length - b.name_en.length,
    },

    {
      title: "Creation Date",
      key: "updated_at",
      dataIndex: "updated_at",
      render: (date) => date.split(" ")[0],
    },
  ];

  return (
    <>
      <CustomTable
        pageTitle="Extra Packages"
        endPoint="weddingHallExtraPackages"
        addEndPoint="hotel/addWeddingHallExtra"
        editEndPoint="hotel/editWeddingHallExtra"
        dataRender={services}
        coloumRender={columns}
        refetch={refetch}
        isLoading={isLoading}
      />
    </>
  );
};

export default ExtraPackage;
