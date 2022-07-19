import React, { useState, useEffect } from "react";
// import { Avatar, Comment, message, Rate, Table, Tag, Tooltip,Form,Input ,Badge, Button,Card,Modal} from "antd";

import { useFetch } from "hooks";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import CustomTable from "../Components/CustomTable";
import { Modal, Upload ,Badge} from "antd";
import service from "auth/FetchInterceptor";

const Banner = () => {
  const { services, refetch, isLoading, error, isSuccess } =
    useFetch("product_videos");
  const [singleImage, setSingleImage] = useState("");

  const [currentList, setCurrentList] = useState([]);
  console.log("lisisisisis",services)
  useEffect(() => setCurrentList(services), [isSuccess, services]);

  const history = useHistory();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
       {
      title: "Service Name",
      dataIndex: "service_name",
      key: "service_name",
    
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
       
    },
    {
      title: "Thumbnail_image",
      dataIndex: "thumbnail_image",
      key: "thumbnail_image",
      render: (text, obj) => {
        return (
          <Upload
            disabled={true}
            fileList={[
              {
                uid: obj.id,
                name: obj.thumbnail_image,
                status: "done",
                url: obj.thumbnail_image,
              },
            ]}
            onPreview={(t) => setSingleImage(obj.thumbnail_image)}
            listType="picture-card"
          />
        );
      },
    },
    // {
    //   title: "Number Of Views",
    //   dataIndex: "number_of_views",
    //   key: "number_of_views",
      
    // },
    {
      title: "Product Price ",
      dataIndex: "product_price",
      key: "product_price",
      render: (text, obj) => {
        return (
          <span>{obj.product_price}{obj.currency}</span>
        );
      },
    },
    // {
    //   title: "Is Favourite",
    //   dataIndex: "is_favourite",
    //   render: (test, record) => (record.is_favourite ?
    //     <div style={{ display: "flex" }}>
    //     <Badge status="success" />
    //     <span style={{ fontWeight: "bolder" }}>YES</span>
    //   </div>
    //   :<div style={{ display: "flex" }}>
    //   <Badge status="error" />
    //   <span style={{ fontWeight: "bolder" }}>No</span>
    // </div>
    //   ),
    // },
  ];
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

  return (
    <>
      <CustomTable
        pageTitle="List of True Views "
        endPoint={"product_videos"}
        addEndPoint="True_View/AddTRUE_VIEW"
        editEndPoint="True_View/edit_true_view"
        dataRender={services}
        coloumRender={columns}
        refetch={refetch}
        isLoading={isLoading}
        error={error}
        dataRender={currentList}
        prevousState={services}
        setCurrentList={setCurrentList}
        refetch={refetch}
      error={error}
      />
     
    
    </>
  );
};


export default Banner;
