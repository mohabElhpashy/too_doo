import React from "react";
import { useFetch } from "hooks";
import CustomTable from "../Components/CustomTable";
const Cities = () => {
  const { services, isLoading, isError, refetch, error } = useFetch("cities");
  const trncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "City Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Country Name",
      dataIndex: "country_name_en",
      key: "country_name_en",
      sorter: (a, b) => a.country_name_en.length - b.country_name_en.length,
    },
  ];
  return (
    <>
      <CustomTable
        pageTitle="Cities"
        coloumRender={columns}
        dataRender={services}
        isLoading={isLoading}
        error={error}
        endPoint={"cities"}
        refetch={refetch}
        addEndPoint="geographic/addCity"
        editEndPoint="geographic/editCity"
      />
    </>
  );
};

export default Cities;
