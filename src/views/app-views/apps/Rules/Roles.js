import React, { useState, useEffect } from "react";
import { useFetch } from "hooks";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import CustomTable from "../Components/Custome_table_for_perm";
import { Modal, Upload } from "antd";
import service from "auth/FetchInterceptor";

const Banner = () => {
  const [currentList, setCurrentList] = useState([]);
  const [totalPages, settotalPages] = useState(1);

  const [loading, setloading] = useState(false);
  useEffect(async()=>{
    try {
      Fetch_record()
      } catch (error) {
        // setSubmitLoading(false);
      }
  },[])

  const Fetch_record=async(page)=>{
    setloading(true)
    console.log("page",page)
    if(page==undefined)
    {
      const Records= await service.get(`/web/adminRole?itemsPerPage=10&page=${1}`).then(respose=>{
        setCurrentList(respose.records)
        settotalPages(respose.paginationInfo.totalRecords)
        setloading(false)
      }) ;
    }
    else{
      try {

        const Records= await service.get(`/web/adminRole?itemsPerPage=10&page=${page}`).then(respose=>{
          setCurrentList(respose.records)
          settotalPages(respose.paginationInfo.totalRecords)
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
    
  }

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
      {/* <CustomTable
        pageTitle="List of Roles "
        endPoint={"adminRole"}
        addEndPoint="Rules/AddRole"
        editEndPoint="Rules/editReadForm"
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
      /> */}
     <CustomTable
        loading={loading}
         Fetch_record={(page)=>Fetch_record(page)}
        totalPages={totalPages}
        pageTitle="List of Roles "
        endPoint={"adminRole"}
        addEndPoint="Rules/AddRole"
        editEndPoint="Rules/editReadForm"
        dataRender={currentList}
        coloumRender={columns}
        // refetch={refetch}
        // isLoading={isLoading}
        // error={error}
        // dataRender={currentList}
        prevousState={currentList}
        setCurrentList={setCurrentList}
      />
    
    </>
  );
};


export default Banner;
