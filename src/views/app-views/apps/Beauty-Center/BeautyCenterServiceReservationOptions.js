import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";

const BeautyCenterServiceReservationOptions = () => {
  const { services, isLoading, refetch } = useFetch(
    "beautyCenterServiceReservationOptions"
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
      dataIndex: "beauty_center_service_reservation_id",
      key: "beauty_center_service_reservation_id",
      sorter: (a, b) =>
        a.beauty_center_service_reservation_id -
        b.beauty_center_service_reservation_id,
    },
    {
      title: "Beauty Center Service Generic Option ID",
      dataIndex: "beauty_center_service_option_id",
      key: "beauty_center_service_option_id",
      sorter: (a, b) =>
        a.beauty_center_service_option_id - b.beauty_center_service_option_id,
    },
    {
      title: "Date of Creation",
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a, b) => a.created_at - b.created_at,
    },
    {
      title: "Total Price",
      dataIndex: "option_price",
      render: (price) => price + " " + "EGP",
      sorter: (a, b) => a.option_price - b.option_price,

      key: "option_price",
    },
  ];

  return (
    <>
      <CustomTable
        pageTitle="Beauty Center Service Reservation Options"
        dataRender={services}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
        endPoint="beautyCenterServiceReservationOptions"
        addEndPoint="beauty/AddBeautyCenterServiceReservationOptions"
      />
    </>
  );
};

export default BeautyCenterServiceReservationOptions;
