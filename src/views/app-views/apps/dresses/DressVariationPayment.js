import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";
const DressVariationPayment = () => {
  const { services, refetch, error, isLoading } = useFetch(
    "dressVariationPaymentMethod"
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
      title: "Dress Variation ID",
      dataIndex: "dress_variation_id",
      key: "dress_variation_id",
      sorter: (a, b) => a.dress_variation_id - b.dress_variation_id,
    },

    {
      title: "Payment Method ID",
      dataIndex: "payment_method_id",
      sorter: (a, b) => a.payment_method_id - b.payment_method_id,
      key: "payment_method_id",
    },

    // {
    //   title: "Status",
    //   dataIndex: "status_id",
    //   key: "status_id",
    // },
  ];

  return (
    <>
      <CustomTable
        pageTitle={"Dress Variation Payment"}
        dataRender={services}
        coloumRender={columns}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        endPoint="dressVariationPaymentMethod"
        addEndPoint="dresses/AdddressVariationPaymentMethod"
      />
    </>
  );
};

export default DressVariationPayment;
