import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";
import serviceId from "constants/ServiceIdConstants";
import { Link } from "react-router-dom";
const CarTags = () => {
  const { services, isLoading, refetch } = useFetch(
    `tags/service/${serviceId.CAR_ID}`
  );

  const columns = [
    {
      title: "Tag ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Tag Name ",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name - b.name,
      render: (tagName, currentObj) => (
        <a>
          <Link
            to={{
              pathname: `/app/apps/getProductByTag/getProductByTag`,
              search: `?serviceId=${currentObj.service_id}&id=${currentObj.id} `,
            }}
          >
            {tagName}
          </Link>
        </a>
      ),
    },
  ];

  return (
    <>
      <CustomTable
        pageTitle="Car Tags"
        endPoint="carTag"
        editEndPoint="cars/editCarTagss"
        dataRender={services}
        coloumRender={columns}
        noAddOption={true}
        refetch={refetch}
        isLoading={isLoading}
      />
    </>
  );
};

export default CarTags;
