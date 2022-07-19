import React, { useState, useEffect } from "react";
import { useFetch } from "hooks";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import CustomTable from "../Components/CustomTable";
import { Modal, Upload } from "antd";
import service from "auth/FetchInterceptor";

const Banner = () => {
  // const { services, refetch, isLoading, error, isSuccess } =
  //   useFetch("listOfAssignPermessionToRole");
  const [singleImage, setSingleImage] = useState("");

  const [currentList, setCurrentList] = useState([]);
  const [totalPages, settotalPages] = useState(1);

  const [loading, setloading] = useState(false);

  // console.log("lisisisisis",services)
  useEffect(async()=>{
    try {
      Fetch_record()
      } catch (error) {
        // setSubmitLoading(false);
      }
  },[])

  const Fetch_record=async(page)=>{
    setloading(true)
    try {
      const Records= await service.get(`/web/listOfAssignPermessionToRole?page=${page}`).then(respose=>{
        setCurrentList(respose.data.data)
        console.log("respose.data.last_page",respose.data.last_page)
        settotalPages(respose.data.last_page)
        setloading(false)
      }) ;
       // openNotificationWithIcon("success");
       // history.push("flashdeals");
       // setSubmitLoading(false);
       
       console.log("currentList",currentList)

     } catch (error) {
       // setSubmitLoading(false);
     }
  }

  const history = useHistory();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
       {
      title: "admin_role_id",
      dataIndex: "admin_role_id",
      key: "admin_role_id",
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
      title: "permession_id",
      dataIndex: "permession_id",
      key: "permession_id",
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
        pageTitle="List of Assign permssions "
        endPoint={"listOfAssignPermessionToRole"}
        addEndPoint="Rules/AddAssign_Perm"
        editEndPoint="Rules/editReadForm"
        dataRender={currentList}
        coloumRender={columns}
        // refetch={refetch}
        // isLoading={isLoading}
        // error={error}
        // dataRender={currentList}
        prevousState={currentList}
        setCurrentList={setCurrentList}
        // refetch={refetch}
      // error={error}
      />
     
    
    </>
  );
};


export default Banner;
