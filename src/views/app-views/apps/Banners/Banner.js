import React, { useState, useEffect } from "react";
import { useFetch } from "hooks";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import CustomTable from "../Components/CustomTable";
import { Modal, Upload } from "antd";
import service from "auth/FetchInterceptor";

const Banner = () => {
  const { services, refetch, isLoading, error, isSuccess } =
    useFetch("banners");
  const [singleImage, setSingleImage] = useState("");

  const [currentList, setCurrentList] = useState([]);
  // console.log("lisisisisis",services)
  useEffect(() => setCurrentList(services), [isSuccess, services]);

  const history = useHistory();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
       {
      title: "Name Ar",
      dataIndex: "name_ar",
      key: "name_ar",
      // render: (text, obj) => {
      //   return (
      //     <Upload
      //       disabled={true}
      //       fileList={[
      //         {
      //           uid: obj.id,
      //           name: obj.image_en,
      //           status: "done",
      //           url: obj.image_en,
      //         },
      //       ]}
      //       onPreview={(t) => setSingleImage(obj.image_en)}
      //       listType="picture-card"
      //     />
      //   );
      // },
    },
    {
      title: "Name Eng",
      dataIndex: "name_en",
      key: "name_en",
      // render: (text, obj) => {
      //   return (
      //     <Upload
      //       disabled={true}
      //       fileList={[
      //         {
      //           uid: obj.id,
      //           name: obj.image_ar,
      //           status: "done",
      //           url: obj.image_ar,
      //         },
      //       ]}
      //       onPreview={(t) => setSingleImage(obj.image_ar)}
      //       listType="picture-card"
      //     />
      //   );
      // },
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
      // render: (text, obj) => {
      //   return (
      //     <Upload
      //       disabled={true}
      //       fileList={[
      //         {
      //           uid: obj.id,
      //           name: obj.image_ar,
      //           status: "done",
      //           url: obj.image_ar,
      //         },
      //       ]}
      //       onPreview={(t) => setSingleImage(obj.image_ar)}
      //       listType="picture-card"
      //     />
      //   );
      // },
    },
    {
      title: "Type ",
      dataIndex: "type",
      key: "type",
      // render: (text, obj) => {
      //   return (
      //     <Upload
      //       disabled={true}
      //       fileList={[
      //         {
      //           uid: obj.id,
      //           name: obj.image_ar,
      //           status: "done",
      //           url: obj.image_ar,
      //         },
      //       ]}
      //       onPreview={(t) => setSingleImage(obj.image_ar)}
      //       listType="picture-card"
      //     />
      //   );
      // },
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      // render: (text, obj) => {
      //   return (
      //     <Upload
      //       disabled={true}
      //       fileList={[
      //         {
      //           uid: obj.id,
      //           name: obj.image_ar,
      //           status: "done",
      //           url: obj.image_ar,
      //         },
      //       ]}
      //       onPreview={(t) => setSingleImage(obj.image_ar)}
      //       listType="picture-card"
      //     />
      //   );
      // },
    },
  ];

  return (
    <>
      <CustomTable
        pageTitle="List of Banners "
        endPoint={"banners"}
        addEndPoint="Banners/AddBanners"
        editEndPoint="Banners/edit_Banners_ReadForm"
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
     
    
    </>
  );
};


export default Banner;
