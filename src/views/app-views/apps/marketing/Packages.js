import { useFetch } from "hooks";
import React from "react";
import { useSelector } from "react-redux";
import CustomTable from "../Components/CustomTable";

function Packages() {
  const { services, error, isLoading, refetch } = useFetch("packages");
  const { direction } = useSelector((state) => state.theme);

  const columns_ar = [
    {
      title: "#",
      key: "#",
      render: (text, record, index) => {
        return index;
      },
    },
    {
      title: "اسم",
      dataIndex: "name_ar",
      key: "name_ar",
    },
    {
      title: "عدد العناصر",
      dataIndex: "number_of_items",
      key: "number_of_items",
    },
    {
      title: "السعر",
      dataIndex: "total_amount",
      key: "total_amount",
      render: (price) => `${price} EGP`,
      sorter: (a, b) => a.raiting - b.rating,
    },
    {
      title: "متاح من",
      dataIndex: "available_from",
      key: "available_from",
      sorter: (a, b) => a.available_from - b.available_from,
    },
    {
      title: "متاحة لل ",
      dataIndex: "available_to",
      key: "available_to",
      sorter: (a, b) => a.available_to - b.available_to,
    },
  ];
  const columns_en = [
    {
      title: "ID",
      key: "#",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name_en",
      key: "name_en",
    },
    {
      title: "Number Of Items",
      dataIndex: "number_of_items",
      key: "number_of_items",
      render: (number) => `${number} items`,
    },
    {
      title: "Price",
      dataIndex: "total_amount",
      key: "total_amount",
      render: (price) => `${price} EGP`,
      sorter: (a, b) => a.raiting - b.rating,
    },
    {
      title: "Available From",
      dataIndex: "available_from",
      key: "available_from",
      sorter: (a, b) => a.available_from - b.available_from,
    },
    {
      title: "Available To",
      dataIndex: "available_to",
      key: "available_to",
      sorter: (a, b) => a.available_to - b.available_to,
    },
  ];
  return (
    <CustomTable
      pageTitle={direction === "ltr" ? "List of Packtages" : "قائمة الحزم "}
      dataRender={services}
      coloumRender={direction === "ltr" ? columns_en : columns_ar}
      isLoading={isLoading}
      endPoint={"packages"}
      addEndPoint="marketing/addPackageForm"
      editEndPoint="marketing/editPackage"
      refetch={refetch}
      error={error}
    />
  );
}

export default Packages;
