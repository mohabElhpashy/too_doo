


import { Avatar, Comment, message, Rate, Table, Tag, Tooltip,Form,Input
     ,Badge, Button,Card,Modal,Row,Tabs} from "antd";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks";
import moment from "moment";
import React, { useState,useEffect } from "react";
import { useHistory } from "react-router";
import Clients from './Forms/ClientTrans/Clients_Trans'
import Seller from './Forms/SellerTrans/Seller_Trans'
const { TabPane } = Tabs;

function Translations() {

  // const { services, refetch, isLoading, isError } = useFetch("complains");
  const [OpenChat, setOpenChat] = useState(false);
  const history = useHistory();
    const [allChat,setallchat]=useState([])
    const[chating,setchating]=useState([])
    const [clint,setclint]=useState()
//   const ReadChat=async(test)=>{
//     // console.log("CLIENT,SELLER",test.conversation_id,test.client_first_name,test.seller_first_name)

//     try {
  
//   const chat = await service.get(`http://188.34.154.127:8081/api/room/${test.conversation_id}`).then(
//     res=>  {
      
//       console.log("res",res)
//       setclint(test)
//       setchating(res)
//       setOpenChat(true);

//     }
//   )
// } catch (error) {
//   }


// // console.log("tst",test)
//   }
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
   

  
   
   
  return (
    <>
        <Row gutter={24 }>
              <div className="container">

      <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
    
      <TabPane tab="Clients Translations" key="1">
    <Clients />
      </TabPane>

    <TabPane tab="Seller Translations" key="2">
    <Seller />
      </TabPane>
      
      
      
  </Tabs>
</div>
      
        </Row>
    </>
  );
}

export default Translations;
