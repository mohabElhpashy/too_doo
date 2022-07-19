import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";

const WeddingHallTags = () => {
  const { services, refetch, isLoading, error } = useFetch("weddingHallTag");
  const columns = [
    {
      title: "#",
      key: "#",
      render: (text, record, index) => {
        return index;
      },
    },
    {
      title: "WeddingHall ID",
      dataIndex: "wedding_hall_id",
      key: "wedding_hall_id",
    },
    {
      title: "Tag ID",
      dataIndex: "tag_id",
      key: "tag_id",
    },
  ];
  return (
    <div>
      <CustomTable
        pageTitle={"Wedding Tags"}
        dataRender={services}
        coloumRender={columns}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        endPoint="weddingHallTag"
        addEndPoint="hotel/AddWeddingTags"
      />
    </div>
  );
};

export default WeddingHallTags;
