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
    useFetch("howTo");
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
      dataIndex: "service_id",
      key: "service_name",
      render: (text, obj) => {
          switch(obj.service_id){
            case "1":return "Cars"
            case "2":return "Hotels"
            case "3":return "Doctors"
            case "4":return "Beauty Center"
            case "5":return "Photographer"
            case "6":return "Trips"
            case "7":return "Dresses"
            case "8":return "MakeUp"
            default:return;


          }
        // return (
        //   <Upload
        //     disabled={true}
        //     fileList={[
        //       {
        //         uid: obj.id,
        //         name: obj.thumbnail_image,
        //         status: "done",
        //         url: obj.thumbnail_image,
        //       },
        //     ]}
        //     onPreview={(t) => setSingleImage(obj.thumbnail_image)}
        //     listType="picture-card"
        //   />
        // );
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
    {/* mohab */}
      <CustomTable
        pageTitle="How To List"
        endPoint="howTo"
        addEndPoint={"CRM/How_To_Add"}
        editEndPoint={"CRM/How_To_Edit"}
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
