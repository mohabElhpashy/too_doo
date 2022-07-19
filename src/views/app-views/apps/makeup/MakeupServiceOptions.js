import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";

const MakeupServiceOptions = () => {
  const { services, isLoading, refetch } = useFetch("makeupServiceOptions");

  const columns = [
    {
      title: "#",
      key: "#",
      render: (text, record, index) => {
        return index;
      },
    },
    {
      title: "MakeUp Service ID",
      dataIndex: "makeup_service_id",
      key: "makeup_service_id",
      sorter: (a, b) => a.makeup_service_id - b.makeup_service_id,
    },
    {
      title: "MakeUp  Service Generic Option ID",
      dataIndex: "makeup_service_generic_option_id",
      key: "makeup_service_generic_option_id",
      sorter: (a, b) =>
        a.makeup_service_generic_option_id - b.makeup_service_generic_option_id,
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price} EGP`,
      sorter: (a, b) => a.price - b.price,
    },
  ];

  return (
    <>
      <CustomTable
        pageTitle="Makeup Service Options"
        dataRender={services}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
        endPoint="makeupServiceOptions"
        addEndPoint="makeup/AddMakeupServiceOption"
      />
    </>
  );
};

export default MakeupServiceOptions;
