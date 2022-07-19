import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";

const TripsReservationOptions = () => {
  const { services, isLoading, refetch } = useFetch("tripReservationOption");

  const columns = [
    {
      title: "#",
      key: "#",
      render: (text, record, index) => {
        return index;
      },
    },
    {
      title: "Trip Option ID",
      dataIndex: "trip_option_id",
      key: "trip_option_id",
    },

    {
      title: "Option Price",
      dataIndex: "option_price",
      key: "option_price",
    },
  ];

  return (
    <div>
      <CustomTable
        pageTitle="Reservation Options"
        dataRender={services}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
      />
    </div>
  );
};

export default TripsReservationOptions;
