import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";
const OfflineReservation = () => {
  const { services, isLoading, refetch } = useFetch(
    "offlineReservation/service/7"
  );
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Service Name",
      dataIndex: "service_name",
      key: "service_name",

      sorter: (a, b) => a.service_name.length - b.service_name.length,
    },
    {
      title: "Seller Name",
      dataIndex: "seller_name",
      key: "seller_name",

      sorter: (a, b) => a.seller_name.length - b.seller_name.length,
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      sorter: (a, b) => a.product_name.length - b.product_name.length,
      key: "product_name.length",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => `${price} EGP`,
      key: "price",
    },

    // {
    //   title: "Status",
    //   dataIndex: "status_id",
    //   key: "status_id",
    // },
  ];

  return (
    <>
      <CustomTable
        dataRender={services}
        pageTitle={"Offline Reservation List"}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
        noDeleteAction={true}
        addEndPoint="dresses/AddOffline"
        editEndPoint="dresses/viewOffline"
      />
    </>
  );
};

export default OfflineReservation;
