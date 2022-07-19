import { useFetch } from "hooks";
import React from "react";
import { useSelector } from "react-redux";
import CustomTable from "../../../../Components/CustomTable";

const FlashDeal_COmponents = ({setPostobject,Postobject}) => {
  const { services, error, isLoading, refetch } = useFetch("flash_deal");
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
      key: "id",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name_en",
      key: "name_en",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      sorter: (a, b) => a.end_date - b.end_date,
    },
  ];
  return (
    <CustomTable
    radio={"done"}
    //   pageTitle={direction === "ltr" ? "List of Flash Deals" : "قائمة الحزم "}
      dataRender={services}
      coloumRender={direction === "ltr" ? columns_en : columns_ar}
      isLoading={isLoading}
      endPoint={"flash_deal"}
      addEndPoint="marketing/AddFlashDeal"
      editEndPoint="marketing/veEditForm"
noAction
noAddOption
      refetch={refetch}
      error={error}
      setPostobject={setPostobject}
        Postobject={Postobject}
        useSELECT={true}
    />
  );
};

export default FlashDeal_COmponents;
