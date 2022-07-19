import React, { useState, useEffect } from "react";
// import { Avatar, Comment, message, Rate, Table, Tag, Tooltip,Form,Input ,Badge, Button,Card,Modal} from "antd";

import { useFetch } from "hooks";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import CustomTable from "../../../Components/CustomTable";
import { Modal, Upload ,Badge} from "antd";
import service from "auth/FetchInterceptor";

const Banner = () => {
  const { services, refetch, isLoading, error, isSuccess } =
    useFetch("services");
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
      title: "Name_Ar",
      dataIndex: "name_ar",
      key: "name_ar",
         
    },
   
    {
      title: "Name_En",
      dataIndex: "name_en",
      key:"name_en"
     
    },
    {
      title: "Main Image ",
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
                name: obj.icon,
                status: "done",
                url: obj.icon,
              },
            ]}
            onPreview={(t) => setSingleImage(obj.icon)}
            listType="picture-card"
          />
        );
      },
    },
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
        pageTitle="List Of Services"
        endPoint="services"
        noAddOption
        // addEndPoint={"CRM/How_To_Add"}
        editEndPoint={"CRM/Edit_Services"}
        dataRender={services}
        coloumRender={columns}
        refetch={refetch}
        isLoading={isLoading}
        error={error}
        // dataRender={currentList}
        prevousState={services}
        setCurrentList={setCurrentList}
        // refetch={refetch}
    //   error={error}
      />
     
    
    </>
  );
};


export default Banner;
