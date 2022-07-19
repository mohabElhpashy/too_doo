import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";
const TripsDestinations = () => {
  const { services, isLoading, refetch } = useFetch(`tripDestination`);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Destination Name ",
      dataIndex: "name_en",
      key: "name_en",
      sorter: (a, b) => a.name_en - b.name_en,
    },
  ];

  return (
    <>
      <CustomTable
        pageTitle="Trips Destinations"
        endPoint="tripDestination"
        addEndPoint="trips/addTripDestination"
        editEndPoint="trips/editTripDestinaion"
        dataRender={services}
        coloumRender={columns}
        refetch={refetch}
        isLoading={isLoading}
      />
    </>
  );
};

export default TripsDestinations;
