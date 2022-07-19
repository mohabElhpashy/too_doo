import {
    Button,
    Form,
    message,
    Modal,
    notification,
    Rate,
    Select,
    Table,
    Upload,
  } from "antd";
  import { useFetch } from "hooks";
  import React, { useState, useEffect } from "react";

  import { useHistory } from "react-router";
  import { Link } from "react-router-dom";
  import CustomTable from "../Components/Custome_table_for_perm";
   import service from "auth/FetchInterceptor";
  const ProductForm = () => {
  
 
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
      const Records= await service.get(`/web/permessions?page=${page}`).then(respose=>{
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
    const col = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: "Method",
        dataIndex: "method",
        key: "method",
        sorter: (a, b) => a.method.length - b.method.length,
      },
      
      {
        title: "service_name",
        dataIndex: "service_name",
        key: "service_name",
        
        sorter: (a, b) => a.service_name - b.service_name,
      },
      {
        title: "uri",
        dataIndex: "uri",
        key: "uri",
        
        sorter: (a, b) => a.uri - b.uri,
      },
     
    ];
    //Handle Notification
    
  
    // Button Disabled
     
    
     
  
    // const onFinish = async (postObject) => {
    //   setLoading(true);
    //   try {
    //     await service.post(`/web/privacyPolicy`, postObject);
    //     setLoading(false);
    //     openNotificationWithIcon("success");
    //     history.push("recommended");
    //   } catch (error) {
    //     setLoading(false);
    //   }
    // };
  
    return (
      <>
        <CustomTable
        loading={loading}
         Fetch_record={(page)=>Fetch_record(page)}
        totalPages={totalPages}
        pageTitle="List of Permisions "
        endPoint={"permessions"}
        addEndPoint="Rules/AddRole"
        editEndPoint="Rules/SinglePermision"
        noEditAction
        dataRender={currentList}
        coloumRender={col}
        // refetch={refetch}
        // isLoading={isLoading}
        // error={error}
        // dataRender={currentList}
        // prevousState={services}
        setCurrentList={setCurrentList}
        // refetch={refetch}
      // error={error}
      />
         
      </>
    );
  };
  
  export default ProductForm;
  