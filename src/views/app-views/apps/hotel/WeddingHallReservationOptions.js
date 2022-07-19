import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";

const WeddingHallReservationOptions = () => {
  const { services, isLoading, refetch } = useFetch(
    "weddingHallReservationOption"
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
      title: "Wedding Hall ID",
      dataIndex: "wedding_hall_id",
      sorter: (a, b) => a.wedding_hall_id - b.wedding_hall_id,

      key: "wedding_hall_id",
    },
    {
      title: "Wedding Hall Options ID",
      dataIndex: "wedding_hall_option_id",
      sorter: (a, b) => a.wedding_hall_option_id - b.wedding_hall_option_id,

      key: "wedding_hall_option_id",
    },
    {
      title: "Date of Creation",
      dataIndex: "created_at",
      sorter: (a, b) => a.created_at - b.created_at,

      key: "created_at",
    },
    {
      title: "Total Price",
      dataIndex: "price",
      render: (price) => `${price} EGP`,
      sorter: (a, b) => a.price - b.price,

      key: "price",
    },
  ];

  return (
    <div>
      <CustomTable
        pageTitle={"Wedding Hall Service Reservation Options"}
        endPoint="weddingHallReservationOption"
        addEndPoint="hotel/AddWeddingHallServiceOption"
        dataRender={services}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
      />
    </div>
  );
};

export default WeddingHallReservationOptions;
