import Loading from "components/shared-components/Loading";
import { useFetch } from "hooks";
import React from "react";
import { APPLICATION_CURRENCY } from "../Components/constants/viewConstants";
import CustomTable from "../Components/CustomTable";

const CarReservationOptions = () => {
  const { services, isLoading, refetch } = useFetch("carReservationOption");
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
      title: "Car Option ID",
      dataIndex: "car_option_id",
      key: "car_option_id",
      sorter: (a, b) => a.car_option_id - b.car_option_id,
    },

    {
      title: "Option Price",
      dataIndex: "option_price",
      key: "option_price",
      render: (price) => `${price} ${APPLICATION_CURRENCY} `,
      sorter: (a, b) => a.option_price - b.option_price,
    },

    {
      title: "Car Reservation ID",
      dataIndex: "car_reservation_id",
      key: "car_reservation_id",
      sorter: (a, b) => a.car_reservation_id - b.car_reservation_id,
    },
  ];

  return (
    <>
      <CustomTable
        pageTitle="Car Reservation Options"
        dataRender={services}
        coloumRender={columns}
        refetch={refetch}
        isLoading={isLoading}
        endPoint={"carReservationOption"}
        addEndPoint="cars/AddCarReservationOption"
      />
    </>
  );
};

export default CarReservationOptions;
