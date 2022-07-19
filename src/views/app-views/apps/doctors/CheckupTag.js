import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";

const CheckupTag = () => {
  const { services, isLoading, refetch } = useFetch("checkupTag");

  const columns = [
    {
      title: "#",
      key: "#",
      render: (text, record, index) => {
        return index;
      },
    },
    {
      title: "CheckUp ID",
      dataIndex: "checkup_id",
      key: "checkup_id",
      sorter: (a, b) => a.checkup_id - b.checkup_id,
    },

    {
      title: "Tag ID",
      dataIndex: "tag_id",
      key: "tag_id",
      sorter: (a, b) => a.tag_id - b.tag_id,
    },
  ];

  return (
    <div>
      <CustomTable
        pageTitle={"CheckUp Tags"}
        endPoint={"checkupTag"}
        addEndPoint="doctors/AddCheckupTag"
        dataRender={services}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
      />
    </div>
  );
};

export default CheckupTag;
