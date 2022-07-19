import Loading from "components/shared-components/Loading";
import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";

const CarOption = () => {
  const { services, isLoading, refetch, error } = useFetch("carOption");

  if (isLoading) {
    return <Loading cover="content" align={"center"} loading={true} />;
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
      title: "Car Variation ID",
      dataIndex: "car_variation_id",
      key: "car_variation_id",
      sorter: (a, b) => a.car_variation_id - b.car_variation_id,
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price} EGP`,
      sorter: (a, b) => a.price - b.price,
    },

    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a, b) => a.created_at - b.created_at,
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      sorter: (a, b) => a.updated_at - b.updated_at,
    },
  ];

  return (
    <>
      <CustomTable
        pageTitle="Car Options"
        addEndPoint="cars/AddCarOption"
        dataRender={services}
        coloumRender={columns}
        endPoint={"carOption"}
        isLoading={isLoading}
        refetch={refetch}
      />
    </>
  );
};

export default CarOption;
