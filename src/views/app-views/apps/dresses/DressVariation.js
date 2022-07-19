import { useFetch } from "hooks";
import React from "react";
import TestError from "../../../auth-views/errors/error-page-2";
import CustomTable from "../Components/CustomTable";
const DressVariation = () => {
  const { services, isError, error, isLoading, refetch } =
    useFetch("dressVariation");

  if (error) {
    return <TestError />;
  }
  const columns = [
    {
      title: "#",
      key: "#",
      render: (text, record, index) => {
        return index;
      },
    },
    {
      title: "Dress Variation ID",
      sorter: (a, b) => a.dress_variation_id - b.dress_variation_id,

      dataIndex: "dress_id",
      key: "dress_id",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.client_id - b.client_id,
      render: (price) => `${price} EGP`,
      key: "price",
    },
    {
      title: "Purchase Type",
      dataIndex: "purchase_type",
      sorter: (a, b) => a.created_at - b.created_at,
      key: "purchase_type",
    },
  ];

  return (
    <>
      <CustomTable
        pageTitle="Dress Variation List"
        endPoint="dressVariation"
        dataRender={services}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
        error={error}
        addEndPoint="dresses/AddDressVaraiation"
      />
    </>
  );
};

export default DressVariation;
