// import { Table } from "antd";
// import service from "auth/FetchInterceptor";
// import React, { useEffect, useState } from "react";
// import { useQuery } from "react-query";
// function AdminLogs() {
//   const { data, isLoading, refetch, error, isSuccess } = useQuery(
//     "adminActivityLog",
//     async () => {
//       const res = await service
//         .get(`/web/adminActivityLog`)
//         .then((res) => res.data);
//       return res;
//     }
//   );

//   const [paginationn, setPagenation] = useState({});
//   useEffect(() => {
//     setPagenation(data);
//     console.log("dadadata",data)
//   }, [isSuccess]);

//   const handleChange = async (currentObj) => {
//     const data = await service.get(
//       `/web/adminActivityLog?page=${currentObj.current}`
//     );
//     setPagenation(data.data);
//   };
//   const columns = [
//     {
//       title: "ID",
//       dataIndex: "id",
//       key: "id",
//       sorter: (a, b) => a.id - b.id,
//       render: (id) => `# ${id}`,
//     },
//     {
//       title: "Method",
//       dataIndex: "method",
//       key: "method",
//       render: (method) => `${method}`,
//     },
//     {
//       title: "URL ",
//       dataIndex: "url",
//       key: "url",
//       render: (url) => `${url}`,
//     },

    
//   ];
//   return (
//     <div>
//       <Table
//         bordered
//         title={() => <h2>Admin Logs</h2>}
//         dataSource={paginationn?.data}
//         rowKey={(item) => item.id}
//         columns={columns}
//         pagination={paginationn}
//         onChange={(current) => handleChange(current)}
//       />
//     </div>
//   );
// }

// export default AdminLogs;



import { Avatar, Comment, message, Rate, Table, Tag, Tooltip ,Badge} from "antd";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks";
import moment from "moment";
import React, { useState,useEffect } from "react";
import { useHistory } from "react-router";
import TestError from "../../../auth-views/errors/error-page-2";
function AdminLogs() {
  // const {   refetch, isLoading, isError } = useFetch("complains");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
    const [allChat,setallchat]=useState([])
  
  useEffect(async()=>{
    try {
       const Records= await service.get("/web/logs") ;
        // openNotificationWithIcon("success");
        // history.push("flashdeals");
        // setSubmitLoading(false);
        setallchat(Records)
        console.log("mohahahah",allChat)
      } catch (error) {
        // setSubmitLoading(false);
      }
  },[])

  
  // if (isError) {
  //   <TestError />;
  // }
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => `# ${_id}`,
    },
    {
      title: "ID",
      dataIndex: "userId",
      key: "userId",
      render: (userId) => `# ${userId}`,
    },
    // {
    //   title: "Client Name   ",
    //   key: "id",
    //   render: (text, Obj) => (
    //     <Comment
    //       actions={[
    //         <span key=' key="comment-basic-dislike"'>
             
    //         </span>,
    //       ]}
     
    //       content={<p>{Obj.client_first_name}{" "}{Obj.client_last_name}</p>}
        
    //     />
    //   ),
    // },

    //   {
    //     title: "Client Name",
    //     dataIndex: "client_name",
    //     key: "client_name",
    //   },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
      // render: (text, Obj) => (
      //   <Comment
      //     actions={[
      //       <span key=' key="comment-basic-dislike"'>
             
      //       </span>,
      //     ]}
     
      //     content={
      //     // <p>{Obj.seller_first_name}{" "}{Obj.seller_last_name}</p>
      //     (
      //       <a
      //         onClick={() =>{
      //           if(Obj.target_type=="seller"){history.push(`veForm?name=view&id=${Obj.target_id}`)} 
      //           else{history.push(`ReadClient?name=view&id=${Obj.target_id}`)}
      //         }
      //         }
              
      //       >
      //         {/* {Obj.first_name || Obj.first_name +Obj.last_name} */}
      //         {Obj.seller_first_name}{" "}{Obj.seller_last_name}
      //       </a>
      //     )

      //   }
        
      //   />
      // ),
    },

      {
          title: "URL",
          dataIndex: "url",
          key: "url",
          // render:(rate)=>  <Rate allowHalf disabled defaultValue={rate} />
          // ,
          // sorter: (a, b) => a.rating - b.rating,
        },
    //   {
    //       title: "Review",
    //       dataIndex: "review",
    //       key: "review",
    //     },
    // {
    //   title: "Status",
    //   dataIndex: "active",
    //   key: "active",
    //   render: (text, record) => {
    //     if (text) {
    //       return (
    //         <Tag
    //           className="cursor-pointer"
    //           onClick={() => changeStatus(record)}
    //           color="green"
    //         >
    //           Active
    //         </Tag>
    //       );
    //     } else {
    //       return (
    //         <Tag
    //           className="cursor-pointer "
    //           onClick={() => changeStatus(record)}
    //           color="red"
    //         >
    //           InActive
    //         </Tag>
    //       );
    //     }
    //   },
    // },

    // {
    //   title: "Message Readed?",
    //   key: "Seen",
    //   render: (test, record) => (record.is_read ?
    //     <div style={{ display: "flex" }}>
    //     <Badge status="success" />
    //     <span style={{ fontWeight: "bolder" }}>Done</span>
    //   </div>
    //   :<div style={{ display: "flex" }}>
    //   <Badge status="error" />
    //   <span style={{ fontWeight: "bolder" }}>Not Yet</span>
    // </div>
    //   ),
    // },
    {
        title: "Read Date",
        dataIndex: "createdAt",
        key: "createdAt",
        // render: (test, record) => (record.read_date ?record.read_date:<h1>_______________________</h1>),
      },
      // {
      //   title: "Send Date",
      //   dataIndex: "created_at",
      //   key: "created_at",
      // },

    ,
  ];
  return (
    <>
      <Table
        tableLayout="auto"
        rowKey={(item) => item.id?.toString()}
        columns={columns}
        bordered
        dataSource={allChat}
        title={() => <h2> Admin Logs </h2>}
      ></Table>
    </>
  );
}

export default AdminLogs;

