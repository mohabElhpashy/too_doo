import React, { useState, useEffect } from "react";
import { useFetch } from "hooks";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import CustomTable from "../Components/CustomTable";
import { Modal, Upload } from "antd";

const Banners_Media = () => {
  const { services, refetch, isLoading, error, isSuccess } =
    useFetch("banners/media");
  const [singleImage, setSingleImage] = useState("");

  const [currentList, setCurrentList] = useState([]);
  useEffect(() => setCurrentList(services), [isSuccess, services]);

  const history = useHistory();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
       {
      title: "Eng Image ",
      dataIndex: "image_en",
      key: "image_en",
      render: (text, obj) => {
        return (
          <Upload
            disabled={true}
            fileList={[
              {
                uid: obj.id,
                name: obj.image_en,
                status: "done",
                url: obj.image_en,
              },
            ]}
            onPreview={(t) => setSingleImage(obj.image_en)}
            listType="picture-card"
          />
        );
      },
    },
    {
      title: "Arab Image",
      dataIndex: "image_ar",
      key: "image_ar",
      render: (text, obj) => {
        return (
          <Upload
            disabled={true}
            fileList={[
              {
                uid: obj.id,
                name: obj.image_ar,
                status: "done",
                url: obj.image_ar,
              },
            ]}
            onPreview={(t) => setSingleImage(obj.image_ar)}
            listType="picture-card"
          />
        );
      },
    },
   
  ];

  return (
    <>
      <CustomTable
        pageTitle="List of Banners Media"
        endPoint={"banners/media"}
        addEndPoint="Banners/AddBannersMedia"
        editEndPoint="Banners/editReadForm"
        dataRender={services}
        coloumRender={columns}
        refetch={refetch}
        isLoading={isLoading}
        error={error}
        // dataRender={currentList}
        prevousState={services}
        setCurrentList={setCurrentList}
        // refetch={refetch}
      // error={error}
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


export default Banners_Media;
