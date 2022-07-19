import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";

const MakeupServiceReservationOptions = () => {
  const { services, isLoading, refetch } = useFetch(
    "makeupServiceReservationOptions"
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
      title: "MakeUp Service Option ID",
      dataIndex: "makeup_service_option_id",
      key: "makeup_service_option_id",
      sorter: (a, b) => a.makeup_service_option_id - b.makeup_service_option_id,
    },
    {
      title: "MakeUp Service Reservation  ID",
      dataIndex: "makeup_service_reservation_id",
      sorter: (a, b) =>
        a.makeup_service_reservation_id - b.makeup_service_reservation_id,

      key: "makeup_service_reservation_id",
    },

    {
      title: "Option Price",
      dataIndex: "option_price",
      key: "option_price",
      render: (price) => `${price} EGP`,
      sorter: (a, b) => a.option_price - b.option_price,
    },
  ];

  return (
    <>
      <CustomTable
        pageTitle=" MakeUp Reservation Options"
        dataRender={services}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
        endPoint="makeupServiceReservationOptions"
        addEndPoint="makeup/AddMakeupServiceReservationOptions"
      />
    </>
  );
};

export default MakeupServiceReservationOptions;
