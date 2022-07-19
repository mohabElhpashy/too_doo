


import { Avatar, Comment, message, Rate, Table, Tag, Tooltip,Form,Input ,Badge, Button,Card,Modal} from "antd";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks";
import moment from "moment";
import React, { useState,useEffect } from "react";
import { useHistory } from "react-router";
import TestError from "../../../auth-views/errors/error-page-2";
import index from "../doctors";
import Client from "./Client";

function ChatRoom() {
  // const { services, refetch, isLoading, isError } = useFetch("complains");
  const [OpenChat, setOpenChat] = useState(false);
  const history = useHistory();
    const [allChat,setallchat]=useState([])
    const[chating,setchating]=useState([])
    const [clint,setclint]=useState({Client:"",Seller:""})
  const ReadChat=async(test)=>{
    // console.log("CLIENT,SELLER",test.conversation_id,test.client_first_name,test.seller_first_name)
console.log(test)
    try {
  
  const chat = await service.get(`web/chat_rooms/room/${test.conversation_id}`).then(
    res=>  {
      
      console.log("res",res)
      setclint({Client:test.client_first_name,Seller:test.seller_first_name})
      setchating(res)
      setOpenChat(true);

    }
  )
} catch (error) {
  }


// console.log("tst",test)
  }
  const showModal = ( ) => {
    // setProduct_details({total_capacity:"",discount:"",product_id:"",variation_id:"",available_from:"",available_to:""})
    setOpenChat(true);
  };
  const handleOk = () => {
    

    setOpenChat(false);
  };

  const handleCancel = () => {
    setOpenChat(false);
  };
  useEffect(async()=>{
    try {
       const Records= await service.get("/web/chat_rooms");
        // openNotificationWithIcon("success");
        // history.push("flashdeals");
        // setSubmitLoading(false);
        setallchat(Records.records)
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
    {
      title: "Client Name   ",
      key: "id",
      render: (text, Obj) => (
        <Comment
          actions={[
            <span key=' key="comment-basic-dislike"'>
             
            </span>,
          ]}
     
          content={<p>{Obj.client_first_name}{" "}{Obj.client_last_name}</p>}
        
        />
      ),
    },

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
     
          content={<p>{Obj.seller_first_name}{" "}{Obj.seller_last_name}</p>}
        
        />
      ),
    },

   

    {
      title: "Chat Begined",
      key: "Seen",
      render: (test, record) => (record.begin_chat ?
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
      title: "View Chat",
      key: "Seen",
      render: (test, record) => ( <div style={{ display: "flex" }}>
        <Button onClick={(record)=>ReadChat(test)}>Read Chat</Button>
      </div>
      
      ),
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
        title={() => <h2> ChatRoom </h2>}
      ></Table>
        <Modal title="Read Chat" visible={OpenChat} onOk={handleOk} onCancel={handleCancel}>

<div style={{width:"400px",height:"300px",overflowY:"scroll"}}>
    {chating.map((dta,index)=>{
      return(
        <Card key={index} >
          {/* {dta.AuthorId} */}
          <div key={dta.AuthorId}>
          <Form.Item
            label="AuthorName"
            >
            <Input
            disabled={true}
            defaultValue={dta.AuthorId.includes("s")?clint.Seller:clint.Client}
             
                // defaultValue={dta.AuthorId}
            />
          </Form.Item>
            
          <Form.Item
        label="Message"

          >
            <Input.TextArea
            disabled
            defaultValue={dta.Type=="image"?dta.URI:dta.Text}
              rows={4}
            />
          </Form.Item>
          
          </div>
          
          </Card>
      )
    })}
</div>

      </Modal>
    </>
  );
}

export default ChatRoom;
