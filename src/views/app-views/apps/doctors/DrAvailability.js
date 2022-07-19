import { Tag } from "antd";
import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";
const DrAvailability = ({ sellerid }) => {
  const { services, refetch } = useFetch(`availability/seller/${sellerid}`);
  const seller_id = sellerid;

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Store Name",
      dataIndex: "store_name_en",
      key: "store_name_en",
    },
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "Time From",
      dataIndex: "time_from",
      key: "time_from",
    },
    {
      title: "Time To",
      dataIndex: "time_to",
      key: "time_to",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        if (text) {
          return <Tag color="green">Active</Tag>;
        } else {
          return <Tag color="red">Inactive</Tag>;
        }
      },
    },
  ];
  return (
    <>
      <CustomTable
        pageTitle="Doctor Avaialability"
        dataRender={services}
        coloumRender={columns}
        sellerId={seller_id}
        refetch={refetch}
        endPoint={"availability"}
        addEndPoint="doctors/addDrAvailability"
        editEndPoint="doctors/editDrAvailability"
      />
    </>
  );
};

export default DrAvailability;
