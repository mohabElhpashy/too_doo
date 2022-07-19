import React from "react";
import { useFetch } from "hooks";
import CustomTable from "../Components/CustomTable";
import { Upload } from "antd";
const Countries = () => {
  const { services, isLoading, isError, refetch, error } =
    useFetch("countries");
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
      title: "Country Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Country Icon ",
      dataIndex: "icon",
      key: "icon",
      render: (text, obj) => {
        return (
          <Upload
            disabled={true}
            // fileList={props?.postObject?.images}
            fileList={[
              {
                uid: obj.id,
                name: obj.name,
                status: "done",
                url: obj?.icon,
              },
            ]}
            // onPreview={(t) => setSingleImage(obj.main_image)}
            listType="picture-card"
          />
        );
      },
    },
  ];
  return (
    <>
      <CustomTable
        pageTitle="Countries"
        coloumRender={columns}
        dataRender={services}
        isLoading={isLoading}
        error={error}
        endPoint={"countries"}
        refetch={refetch}
        addEndPoint="geographic/addCountry"
        editEndPoint="geographic/editCountry"
      />
    </>
  );
};

export default Countries;
