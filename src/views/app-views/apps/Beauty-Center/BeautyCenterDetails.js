import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";
import serviceId from "constants/ServiceIdConstants";
import { Tag } from "antd";
const DressDetails = () => {
  const { services, isLoading, refetch } = useFetch(
    `genericDetailsProducts/${serviceId.BEAUTRY_CENTER_ID}`
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Details Type Name ",
      dataIndex: "name_en",
      key: "name_en",
      sorter: (a, b) => a.name_en - b.name_en,
    },

    {
      title: "Generic Details Name ",
      key: "details_name_en",
      render: (_, obj) => (
        <span>
          {obj.generic_details.map((tag) => (
            <Tag color="blue" key={tag.id}>
              {tag.name_en}
            </Tag>
          ))}
        </span>
      ),
    },
  ];

  return (
    <>
      <CustomTable
        pageTitle="Beauty Center Details Types"
        endPoint="genericDetails"
        addEndPoint="beauty/addBeautyCenterDetailsForm"
        editEndPoint="beauty/editBeautyCenterDetailsFrom"
        dataRender={services}
        coloumRender={columns}
        refetch={refetch}
        isLoading={isLoading}
        noDeleteAction
      />
    </>
  );
};

export default DressDetails;
