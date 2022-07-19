


import { Avatar, Comment, message, Rate, Table, Tag, Tooltip ,Badge} from "antd";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks";
import moment from "moment";
import React, { useState,useEffect } from "react";
import { useHistory } from "react-router";
import TestError from "../../../auth-views/errors/error-page-2";
function Admin_LOgs() {
  // const {   refetch, isLoading, isError } = useFetch("complains");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
    const [allChat,setallchat]=useState([])
  
  useEffect(async()=>{
    try {
       const Records= await service.get("/web/targetSms") ;
        // openNotificationWithIcon("success");
        // history.push("flashdeals");
        // setSubmitLoading(false);
        setallchat(Records.records)
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
      dataIndex: "id",
      key: "id",
      render: (id) => `# ${id}`,
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
      title: "Seller Name",
      dataIndex: "type",
      key: "type",
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
                if(Obj.target_type=="seller"){history.push(`veForm?name=view&id=${Obj.target_id}`)} 
                else{history.push(`ReadClient?name=view&id=${Obj.target_id}`)}
              }
              }
              
            >
              {/* {Obj.first_name || Obj.first_name +Obj.last_name} */}
              {Obj.seller_first_name}{" "}{Obj.seller_last_name}
            </a>
          )

        }
        
        />
      ),
    },

    //   {
    //       title: "Rating",
    //       dataIndex: "rating",
    //       key: "rating",
    //       render:(rate)=>  <Rate allowHalf disabled defaultValue={rate} />
    //       ,
    //       sorter: (a, b) => a.rating - b.rating,
    //     },
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

    {
      title: "Message Readed?",
      key: "Seen",
      render: (test, record) => (record.is_read ?
        <div style={{ display: "flex" }}>
        <Badge status="success" />
        <span style={{ fontWeight: "bolder" }}>Done</span>
      </div>
      :<div style={{ display: "flex" }}>
      <Badge status="error" />
      <span style={{ fontWeight: "bolder" }}>Not Yet</span>
    </div>
      ),
    },
    {
        title: "Read Date",
        dataIndex: "read_date",
        key: "read_date",
        render: (test, record) => (record.read_date ?record.read_date:<h1>_______________________</h1>),
      },
      {
        title: "Send Date",
        dataIndex: "created_at",
        key: "created_at",
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
        dataSource={allChat}
        title={() => <h2> SMS </h2>}
      ></Table>
    </>
  );
}

export default Admin_LOgs;
