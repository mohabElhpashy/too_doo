import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";

const WeddingHallOptions = () => {
  const { services, isLoading, refetch } = useFetch("weddingHallOption");

  const columns = [
    {
      title: "#",
      key: "#",
      render: (text, record, index) => {
        return index;
      },
    },
    {
      title: "Wedding Hall ",
      dataIndex: "weddingHallName",
      key: "weddingHallName",
      sorter: (a, b) => a.weddingHallName.length - b.weddingHallName.length,
    },
    {
      title: "Wedding Hall Generic Options ",
      dataIndex: "weddingHallGenericOptionTitle",
      sorter: (a, b) =>
        a.weddingHallGenericOptionTitle.length -
        b.weddingHallGenericOptionTitle.length,

      key: "weddingHallGenericOptionTitle",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => `${price} EGP`,
      key: "price",
    },
  ];

  return (
    <>
      <CustomTable
        pageTitle={"Wedding Hall  Options"}
        endPoint="weddingHallOption"
        addEndPoint="hotel/AddWeddingHallOption"
        dataRender={services}
        coloumRender={columns}
        refetch={refetch}
        isLoading={isLoading}
      />
    </>
  );
};

export default WeddingHallOptions;
