


import { Avatar, Comment, notification, Rate, Table, Tag, Tooltip,Form,Input ,Badge, Button,Card,Modal} from "antd";
import Search from "antd/lib/transfer/search";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks";
import moment from "moment";
import React, { useState,useEffect } from "react";
import { useHistory } from "react-router";
import TestError from "../../../../../auth-views/errors/error-page-2";

function Client_Translations() {
  // const { services, refetch, isLoading, isError } = useFetch("complains");
  const [OpenChat, setOpenChat] = useState(false);
  const history = useHistory();
    const [allChat,setallchat]=useState([])
    
    const[Update_Key,setUpdate]=useState({key:"",eng:"",ara:""})

    const [Change,setChange]=useState({input_key:"",input_eng:"",input_ara:""})
    const [add_trans,setadd_trans]=useState(false)
    const [search,setsearch]=useState("")
    const [ADD_NEW_REC,setADD_NEW_REC]=useState({
      type:"ClientApp",
      key:"",
      en_value:"",
      ar_value:""
    })

  const Update=async(test)=>{
    // console.log("CLIENT,SELLER",test.conversation_id,test.client_first_name,test.seller_first_name)
    // console.log(test)
    setUpdate(
      {key:test.key,
        eng:test.en_value,
        ara:test.ar_value
    })

    setOpenChat(true)


// console.log("tst",test)
  }
  const Add_Record=()=>{
    setadd_trans(true)
  }
  const showModal = ( ) => {
    // setProduct_details({total_capacity:"",discount:"",product_id:"",variation_id:"",available_from:"",available_to:""})
    setOpenChat(true);
  };
  const handleOk =async () => {
    const Updated={
      type:"ClientApp",
      key:Update_Key.key,
      en_value:Update_Key.eng,
      ar_value:Update_Key.ara
    }
    // console.log("Updated",Updated)
    try {
      const Records= await service.put("/web/translation/addKey",Updated)
      openNotificationWithIcon("success");
      history.push("Translations")

     } catch (error) {
       // setSubmitLoading(false);
     }
    setOpenChat(false);
  };
  const add_handleOk=async()=>{
   
    // console.log("Updated",ADD_NEW_REC)
    try {
      const Records= await service.put("/web/translation/addKey",ADD_NEW_REC)
      openNotificationWithIcon("success");
      history.push("Translations")

     } catch (error) {
       // setSubmitLoading(false);
     }
    setadd_trans(false)

  }
   const add_handleCancel=()=>{
    setadd_trans(false)

   }

  const handleCancel = () => {
    setOpenChat(false);
  };
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done Successfully!",
    });
  };
  useEffect(async()=>{
    // console.log("serach",search)
     
    if(search==""){ try {
      const Records= await service.get("/web/translation/byAppType?type=ClientApp")
       
       setallchat(Records.records)
     } catch (error) {
      
     }}
     else{
      try {
        const Records= await service.get(`/web/translation/search?type=ClientApp&key=${search}`)
         
         setallchat(Records.records)
       } catch (error) {
        
       }
     }
   
  },[search])
  
   
  const columns = [
    {
      title: "KEY",
      dataIndex: "key",
      key: "key",
      render: (key) => `# ${key}`.substring(0,20),
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

   

  
    {
      title: "Actions",
      key: "Seen",
      render: (test, record) => ( <div style={{ display: "flex" }}>
        <Button onClick={()=>Update(test)}>Update</Button>
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
        title={() => <div style={{display:"flex",justifyContent:"space-between"}}>
          <h2> Client Translations </h2>
          <Input style={{width:"280px"}} placeholder="Serach By Key" value={search} onChange={(e)=>setsearch(e.target.value)}/>
        <Button type="primary" onClick={Add_Record}>Add New Record</Button>
        </div>}
      ></Table>
        <Modal title="Update Translation" visible={OpenChat} onOk={handleOk} onCancel={handleCancel}>

 
        <Card >
          {/* {dta.AuthorId} */}
          
          <Form.Item
            label="KEY"
            >
             <div key={Update_Key.key}>

            <Input
            disabled={true}
            autoFocus="autoFocus"

            onChange={(e)=>setUpdate({...Update_Key,key:e.target.value})}     
                   value={Update_Key.key}
  
            />
            </div>
          </Form.Item>
            
          <Form.Item
            label="Eng"
            >
              <div key={Update_Key.eng}>
              <Input
                          autoFocus="autoFocus"

            defaultValue={Update_Key.eng}
            // value={Update_Key.eng}
            onChange={(e)=>setUpdate({...Update_Key,eng:e.target.value})}
            // value={Update_Key.key}
             

            />
              </div>
           
          </Form.Item>
          
          <Form.Item
            label="ARB"
            >
          <div key={Update_Key.ara}>

            <Input
            // disabled={true}
            // defaultValue={}
            autoFocus="autoFocus"

            value={Update_Key.ara}
            onChange={(e)=>setUpdate({...Update_Key,ara:e.target.value})}
            defaultValue={Update_Key.ara}
             

            />
            </div>
          </Form.Item>
          
          </Card>
     
      </Modal>
      <Modal title="Add Translation" visible={add_trans} onOk={add_handleOk} onCancel={add_handleCancel}>

 
        <Card >
          {/* {dta.AuthorId} */}
          
          <Form.Item
            label="KEY"
            >
             <div key={Update_Key.key}>

            <Input
            onChange={(e)=>setADD_NEW_REC({...ADD_NEW_REC,key:e.target.value})}     
  
            />
            </div>
          </Form.Item>
            
          <Form.Item
            label="Eng"
            >
              <div key={Update_Key.eng}>
              <Input
   onChange={(e)=>setADD_NEW_REC({...ADD_NEW_REC,en_value:e.target.value})}     />
              </div>
           
          </Form.Item>
          
          <Form.Item
            label="ARB"
            >
          <div key={Update_Key.ara}>

            <Input
  onChange={(e)=>setADD_NEW_REC({...ADD_NEW_REC,ar_value:e.target.value})}      />
            </div>
          </Form.Item>
          
          </Card>
     
      </Modal>
    </>
  );
}

export default Client_Translations;


 
// import { useFetch } from "hooks";
// import { useHistory } from "react-router";
// import { Link } from "react-router-dom";
// import CustomTable from "../../../Components/CustomTable";
// import { Modal, Upload } from "antd";
// import service from "auth/FetchInterceptor";

// const Banner = () => {
//   const { services, refetch, isLoading, error, isSuccess } =
//     useFetch("translation/byAppType?type=ClientApp");
//   const [singleImage, setSingleImage] = useState("");

//   const [currentList, setCurrentList] = useState([]);
//    useEffect(() => {
//      if(isSuccess){
//       setCurrentList(services)

//     }
//   }
//   , [isSuccess, services]);

//   const history = useHistory();

//     const columns = [
//     {
//       title: "KEY",
//       dataIndex: "key",
//       key: "key",
//       render: (key) => `# ${key}`.substring(0,20),
//     },
//     {
//       title: "ENG",
//       dataIndex: "en_value",
//       key: "en_value",
 
//     },

    
//     {
//       title: "ARB",
//       dataIndex: "ar_value",
//       key: "ar_value",
   
//     },

   
//    ];

//   return (
//     <>
//       <CustomTable
//         pageTitle="List of clients Translations "
//         // endPoint={"translation/byAppType?type=ClientApp"}
//         // addEndPoint="Banners/AddBanners"
//         editEndPoint={()=>alert("hi")}
//         // dataRender={services}
//         coloumRender={columns}
//         refetch={refetch}
//         isLoading={isLoading}
//         error={error}
//         dataRender={services}
//         prevousState={services}
//         setCurrentList={setCurrentList}
//         refetch={refetch}
//         error={error}
//         noDeleteAction
//         noViewAction
//       />
     
    
//     </>
//   );
// };


// export default Banner;
