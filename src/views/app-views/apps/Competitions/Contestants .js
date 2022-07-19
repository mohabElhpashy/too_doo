


import { Avatar, Comment, message, Rate, Table, Tag, Tooltip ,Badge} from "antd";
 import { useFetch } from "hooks";
import moment from "moment";
import React, { useState,useEffect } from "react";
import { useHistory } from "react-router";
import service from "auth/FetchInterceptor";
import CustomTable from "../Components/Custome_table_for_perm";

import TestError from "../../../auth-views/errors/error-page-2";
function ChatRoom() {
  // const { services, refetch, isLoading, isError } = useFetch("complains");
   const history = useHistory();
    const [allChat,setallchat]=useState([])
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
      const Records= await service.get(`/web/competition/clients?page=${page}`).then(respose=>{
        setCurrentList(respose.record.data)
        console.log("respose.data.last_page",respose.record.last_page)
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

  
  // if (isError) {
  //   <TestError />;
  // }
  const columns = [
    {
      title: "contestant id",
      dataIndex: "client_id",
      key: "client_id",
      render: (client_id) => `# ${client_id}`,
    },
    {
      title: "contestant Name",
      dataIndex: "client_full_name",
      key: "client_full_name",
      render: (text, Obj) => (
        <Comment
          actions={[
            <span key=' key="comment-basic-dislike"'>
             
            </span>,
          ]}
     
          content={
          // <p>{Obj.seller_first_name}{" "}{Obj.seller_last_name}</p>
          (
            <a
              onClick={() =>{
               
            history.push(`ReadClient?name=view&id=${Obj.client_id}`)
              }
              }
              
            >
              {/* {Obj.first_name || Obj.first_name +Obj.last_name} */}
              {Obj.client_full_name}
            </a>
          )

        }
        
        />
      ),

    //   render: (text, Obj) => (
    //     <Comment
    //       actions={[
    //         <span key=' key="comment-basic-dislike"'>
             
    //         </span>,
    //       ]}
     
    //       content={<p>{Obj.client_first_name}{" "}{Obj.client_last_name}</p>}
        
    //     />
    //   ),
    },

    {
        title: "Contestant Number",
        dataIndex: "contestant_number",
        key: "contestant_number",
  
      //   render: (text, Obj) => (
      //     <Comment
      //       actions={[
      //         <span key=' key="comment-basic-dislike"'>
               
      //         </span>,
      //       ]}
       
      //       content={<p>{Obj.client_first_name}{" "}{Obj.client_last_name}</p>}
          
      //     />
      //   ),
      },
      {
        title: "Competition Name",
        dataIndex: "competition_name_en",
        key: "competition_name_en",
  
      //   render: (text, Obj) => (
      //     <Comment
      //       actions={[
      //         <span key=' key="comment-basic-dislike"'>
               
      //         </span>,
      //       ]}
       
      //       content={<p>{Obj.client_first_name}{" "}{Obj.client_last_name}</p>}
          
      //     />
      //   ),
      },
      {
        title: "Number Of register",
        dataIndex: "client_count",
        key: "client_count",
  
    
      },
    ,
  ];
  return (
    <>
      <Table
        tableLayout="auto"
        rowKey={(item) => item.id?.toString()}
        columns={columns}
        bordered
        dataSource={currentList}
        title={() => <h2> Contestants </h2>}
      ></Table>
       {/* <CustomTable
        loading={loading}
         Fetch_record={(page)=>Fetch_record(page)}
        totalPages={totalPages}
        pageTitle="Online Clients list"
        dataRender={currentList}
        coloumRender={columns}
        endPoint="competition/clients"

        // isLoading={isLoading}
        // noAddOption={true}
        // noDeleteAction={true}
        // refetch={refetch}
        // error={error}
        // setCurrentList={setCurrentList}
        // prevousState={services}
        // editEndPoint="CRM/veClientForm"
        // readClient={"CRM/ReadClient"}
        // searchUrl="search?client_search"
        // hasNotification={"Client"}
      /> */}
    </>
  );
}

export default ChatRoom;
