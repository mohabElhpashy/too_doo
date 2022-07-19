
 import service from "auth/FetchInterceptor";
 import CustomTable from "../Components/Custome_table_for_perm";

 import React, { useState,useEffect } from "react";
import { useHistory } from "react-router";
 function SearchKeyword() {
    const [currentList, setCurrentList] = useState([]);
  const [totalPages, settotalPages] = useState();

  const [loading, setloading] = useState(false);

  useEffect(async()=>{
    try {
      Fetch_record()
      } catch (error) {
        // setSubmitLoading(false);
      }
  },[])
  //get records
  const Fetch_record=async(page)=>{
    setloading(true)
    if(page==undefined){
      const Records= await service.get(`/web/keyWords/search?itemsPerPage=10&page=${1}`).then(respose=>{
        setCurrentList(respose.records)
        console.log("paginationInfo",respose.paginationInfo.totalPages)
        settotalPages(respose.paginationInfo.totalRecords)
        setloading(false)
      }) ;
    }
    else{
      try {
        const Records= await service.get(`/web/keyWords/search?itemsPerPage=10&page=${page}`).then(respose=>{
          setCurrentList(respose.records)
          console.log("paginationInfo",respose.paginationInfo.totalPages)
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
   
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Client Name",
      dataIndex: "client_name",
      key: "client_name",
      sorter: (a, b) => a.client_name.length - b.client_name.length,
    },
    
     
    {
      title: "Date ",
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a, b) => a.created_at - b.created_at,
    },

    {
      title: "key_word",
      dataIndex: "key_word",
      key: "key_word",
      render: (name, obj) => (
        <a
          
        >
          {obj.key_word.product}
        </a>
      ),
    },
  ];
  
  
  return (
    <>
      
     
      <CustomTable
        loading={loading}
         Fetch_record={(page)=>Fetch_record(page)}
        totalPages={totalPages}
        pageTitle="Search Key Word"
        dataRender={currentList}
        coloumRender={columns}
        noAddOption
        noEditAction
        noViewAction
        // refetch={refetch}
        // isLoading={isLoading}
        // endPoint="makeups"
        // addEndPoint="makeup/AddMakeUp"
        // editEndPoint="makeup/editReadForm"
        // prevousState={currentList}
        // setCurrentList={setCurrentList}
        // searchUrl="stores/search/8?store_search"
        // noAddOption
        noAction
      />
    </>
  );
}


export default SearchKeyword;
