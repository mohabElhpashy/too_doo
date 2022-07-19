import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";
import { APPLICATION_CURRENCY } from "../Components/constants/viewConstants";
const PhotoSessionReservationOptions = () => {
  const { services, isLoading, refetch } = useFetch(
    "photoSessionReservationOption"
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
      title: "Photo Session Option ID",
      dataIndex: "photo_session_option_id",
      key: "photo_session_option_id",
      sorter: (a, b) => a.photo_session_option_id - b.photo_session_option_id,
    },
    {
      title: "Photo Session Reservation ID",
      dataIndex: "photo_session_reservation_id",
      sorter: (a, b) =>
        a.photo_session_reservation_id - b.photo_session_reservation_id,

      key: "photo_session_reservation_id",
    },

    {
      title: "Option Price",
      dataIndex: "option_price",
      key: "option_price",
      render: (price) => `${price} ${APPLICATION_CURRENCY}`,
      sorter: (a, b) => a.option_price - b.option_price,
    },
  ];

  return (
    <>
      <CustomTable
        pageTitle=" Photo Session Reservation Options"
        endPoint="photoSessionReservationOption"
        addEndPoint="photographer/AddPhotoSessionReservationOptions"
        dataRender={services}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
      />
    </>
  );
};

export default PhotoSessionReservationOptions;
