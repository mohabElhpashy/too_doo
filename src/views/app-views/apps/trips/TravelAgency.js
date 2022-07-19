import { Modal, Upload } from "antd";
import { useFetch } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import CustomTable from "../Components/CustomTable";

const TravelAgency = () => {
  const { services, isLoading, refetch, isSuccess } = useFetch("travelAgency");
  const [singleImage, setSingleImage] = useState("");

  const [currentList, setCurrentList] = useState([]);
  useEffect(() => setCurrentList(services), [isSuccess, services]);

  const history = useHistory();
  // const trncate = (str, n) => {
  //   return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  // };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Store Name",
      dataIndex: "name_en",
      key: "name_en",
      sorter: (a, b) => a.name_en.length - b.name_en.length,
    },

    {
      title: "Seller Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (name, obj) => (
        <a
          onClick={() =>
            history.push(`/app/apps/CRM/veForm?name=view&id=${obj.seller_id}`)
          }
        >
          {name}
        </a>
      ),
    },
    {
      title: "Main Image ",
      dataIndex: "main_image",
      key: "main_image",
      render: (text, obj) => {
        return (
          <Upload
            disabled={true}
            // fileList={props?.postObject?.images}
            fileList={[
              {
                uid: obj.id,
                name: obj.name_en,
                status: "done",
                url: obj.main_image,
              },
            ]}
            onPreview={(t) => setSingleImage(obj.main_image)}
            listType="picture-card"
          />
        );
      },
    },
    // {
    //   title: "Address",
    //   dataIndex: "address_en",
    //   render: (text) => {
    //     return trncate(text, 30);
    //   },
    //   key: "address_en",
    // },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },

    // {
    //   title: "Country Name",
    //   dataIndex: "country_name",
    //   key: "country_name",
    // },

    {
      title: "City Name",
      dataIndex: "city_name",
      key: "city_name",
    },
  ];

  return (
    <>
      <CustomTable
        pageTitle="Travel Agencies"
        dataRender={currentList}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
        editEndPoint="trips/editReadTripForm"
        endPoint="travelAgency"
        noAddOption
        prevousState={services}
        setCurrentList={setCurrentList}
        searchUrl="stores/search/6?store_search"
      />
      <Modal
        visible={singleImage.length > 0}
        footer={null}
        onCancel={() => setSingleImage("")}
      >
        <img
          alt="image"
          style={{ width: "100%", height: 350 }}
          src={singleImage}
        />
      </Modal>
    </>
  );
};

export default TravelAgency;
