import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";

const BeautyCenterServiceOptions = () => {
  const { services, isLoading, refetch } = useFetch(
    "beautyCenterServiceOptions"
  );

  const columns = [
    {
      title: "#",
      key: "#",
      render: (text, record, index) => {
        return index;
      },
    },
    {
      title: "Beauty Center Service ID",
      dataIndex: "beauty_center_service_id",
      key: "beauty_center_service_id",
      sorter: (a, b) => a.beauty_center_service_id - b.beauty_center_service_id,
    },
    {
      title: "Beauty Center Service Generic Option ID",
      dataIndex: "beauty_center_service_generic_option_id",
      key: "beauty_center_service_generic_option_id",
      sorter: (a, b) =>
        a.beauty_center_service_generic_option_id -
        b.beauty_center_service_generic_option_id,
    },

    {
      title: "Date of Creation",
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a, b) => a.created_at - b.created_at,
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => `${price} EGP`,
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
  ];

  return (
    <>
      <CustomTable
        pageTitle=" Beauty Center Services Option"
        dataRender={services}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
        endPoint="beautyCenterServiceOptions"
        addEndPoint="beauty/AddBeautyCenterServiceOptions"
      />
    </>
  );
};

export default BeautyCenterServiceOptions;
