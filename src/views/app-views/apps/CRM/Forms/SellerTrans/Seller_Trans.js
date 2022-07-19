


import { Avatar, Comment, message, Rate, Table, Tag, Tooltip,Form,Input ,Badge, Button,Card,Modal} from "antd";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks";
import moment from "moment";
import React, { useState,useEffect } from "react";
import { useHistory } from "react-router";
import TestError from "../../../../../auth-views/errors/error-page-2";

function Seller_Translations() {
  // const { services, refetch, isLoading, isError } = useFetch("complains");
  const [OpenChat, setOpenChat] = useState(false);
  const history = useHistory();
    const [allChat,setallchat]=useState([])
    const[chating,setchating]=useState([])
    const [clint,setclint]=useState()
  const ReadChat=async(test)=>{
    // console.log("CLIENT,SELLER",test.conversation_id,test.client_first_name,test.seller_first_name)

    try {
  
  const chat = await service.get(`http://188.34.154.127:8081/api/room/${test.conversation_id}`).then(
    res=>  {
      
      console.log("res",res)
      setclint(test)
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
       const Records= await service.get("/web/translation/byAppType?type=SellerApp")
        // openNotificationWithIcon("success");
        // history.push("flashdeals");
        // setSubmitLoading(false);
        setallchat(Records.records)
      } catch (error) {
        // setSubmitLoading(false);
      }
  },[])
  
   
  const columns = [
    {
      title: "KEY",
      dataIndex: "key",
      key: "key",
      render: (key) => `# ${key}`,
    },
    {
      title: "ENG",
      dataIndex: "en_value",
      key: "en_value",
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
      title: "ARB",
      dataIndex: "ar_value",
      key: "ar_value",
    //   render: (text, Obj) => (
    //     <Comment
    //       actions={[
    //         <span key=' key="comment-basic-dislike"'>
             
    //         </span>,
    //       ]}
     
    //       content={<p>{Obj.seller_first_name}{" "}{Obj.seller_last_name}</p>}
        
    //     />
    //   ),
    },

   

  
    // {
    //   title: "View Chat",
    //   key: "Seen",
    //   render: (test, record) => ( <div style={{ display: "flex" }}>
    //     <Button onClick={(record)=>ReadChat(test)}>Read Chat</Button>
    //   </div>
      
    //   ),
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
        title={() => <h2> Client Translations </h2>}
      ></Table>
        <Modal title="Read Chat" visible={OpenChat} onOk={handleOk} onCancel={handleCancel}>

<div style={{width:"400px",height:"300px",overflowY:"scroll"}}>
    {chating.map((dta,index)=>{
      return(
        <Card key={index} >
          {/* {dta.AuthorId} */}
          
          <Form.Item
            label="AuthorName"
            >
            <Input
            disabled={true}
            defaultValue={dta.AuthorId.includes('s')?clint.seller:clint.client}
             

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
          
          
          
          </Card>
      )
    })}
</div>

      </Modal>
    </>
  );
}

export default Seller_Translations;
