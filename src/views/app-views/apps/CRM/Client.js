import { message, Tag ,Button,Modal,Input,
  Row,
  Col,
  Card,
  Popconfirm,

  Form,} from "antd";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks";
import React, { useEffect, useState } from "react";
import CustomTable from "../Components/Custome_table_for_perm";
import  {BellOutlined,MessageOutlined,KeyOutlined,QuestionCircleOutlined} from "@ant-design/icons";


function Client() {
  // const { services, isLoading, isError, refetch, error, isSuccess } =
  //   useFetch("clients");
  const key = "updatable";
   const [ID,setID]=useState()
  const [phone,setPhone]=useState()
  const [PostObjects,setPostObjects]=useState({
        title_ar:"",
        title_en:"",
        body_ar:"",
        body_en:"",
  })
  const [PostMessage,setPostMessage]=useState({
    message_ar:"",
    message_en:"",
     
})
const [ShowNotifi,setShowNotifi]=useState(false)
const [ShowMessage,setMessage]=useState(false)
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
      const Records= await service.get(`/web/clients?itemsPerPage=10&page=${1}`).then(respose=>{
        setCurrentList(respose.records)
        settotalPages(respose.paginationInfo.totalRecords)
        setloading(false)
      }) ;
    }
    else{
      try {

        const Records= await service.get(`/web/clients?itemsPerPage=10&page=${page}`).then(respose=>{
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
  // const handleStatus = (text)=>{

  // }
  const changeStatus = async (record) => {
    message.loading({ content: "Loading...", key, duration: 15 });

    try {
      await service.put(`/web/clients/changeStatus/${record.id}`);
      // refetch();
      message.success({ content: "Done!", key, duration: 2 });
    } catch (error) {
      message.error({ content: "Error Occured!", key, duration: 2 });
    }
  };
  const GetID=(elm)=>{
    // console.log("ID",elm)
    setID(elm.id)
    setShowNotifi(true)
  }
  const GetPhone=(elm)=>{
    // console.log("ID",elm)
    setPhone(elm.phone)
    setMessage(true)
  }
  const PostNotifi=async()=>{
    const x={
      title_ar:PostObjects.title_ar,
      title_en:PostObjects.title_en,
      body_ar:PostObjects.body_ar,
      body_en:PostObjects.body_en,
      type:"statement",
      topic:"singleClient",
      target_id:ID
    }
    console.log("x",x)
    try {
      await service.post(`/web/notifications`,x).then(res=>  setShowNotifi(false)
      );
      // refetch();
      message.success({ content: "notification Send!", key, duration: 2 });

     } catch (error) {
     }
  }
  const Post_Message=async()=>{
    const x={
      message_ar:PostMessage.message_ar,
      message_en:PostMessage.message_en,
      phone: phone    
    }
    console.log("x",x)
    try {
      await service.post(`/web/singleSms/CLIENT`,x).then(res=>  setMessage(false)
      );
      // refetch();
      message.success({ content: "Message Send!", key, duration: 2 });

     } catch (error) {
     }
  }
  const GetPhone_RecoverPass =async(elm)=>{
    try {
      await service.post(`/web/sendPassword`,{phone:elm.phone,type:"CLIENT"}).then(res=> 
         console.log("res",res)
      );
      // refetch();
      
      message.success({ content: "Password Changed!", key, duration: 2 });
     } catch (error) {
     }
  
    console.log("elm",elm.id)
      }
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // sorter: (a, b) => a.first_name.length - b.first_name.length,
      // filterDropdown: (
      //   <Search
      //     setCurrentList={setCurrentList}
      //     dataIndex={"Name"}
      //     prevousState={services}npm start
      //   />
      // ),
      // filterIcon: (filtered) => (
      //   <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      // ),
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => (email ? email : "N/A"),
      // filterDropdown: (
      //   <Search
      //     setCurrentList={setCurrentList}
      //     dataIndex={"Email"}
      //     prevousState={services}
      //     url="/search?client_search"
      //   />
      // ),
      // filterIcon: (filtered) => (
      //   <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      // ),
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      // filterDropdown: (
      //   <Search
      //     setCurrentList={setCurrentList}
      //     dataIndex={"Phone Number"}
      //     prevousState={services}
      //     url="/search?client_search"
      //   />
      // ),
      // filterIcon: (filtered) => (
      //   <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      // ),
    },
    {
      title: "User Agent ",
      dataIndex: "user_agent",
      key: "user_agent",
    
    },
    {
      title: "Login Method ",
      dataIndex: "first_login",
      key: "first_login",
    
    },
    {
      title: "Date Of Reigstration",
      dataIndex: "created_at",
      key: "created_at",
      // filterDropdown: (
      //   <Search
      //     setCurrentList={setCurrentList}
      //     dataIndex={"Phone Number"}
      //     prevousState={services}
      //     url="/search?client_search"
      //   />
      // ),
      // filterIcon: (filtered) => (
      //   <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      // ),
    },
    {
      title: "Status",
      dataIndex: "active",
      align: "center",
      key: "active",
      render: (text, record) => {
        console.log("my txt",text)
        if (text) {
          return (
            <div className="d-flex align-items-center justify-content-center">
              <Tag
                className="cursor-pointer"
                onClick={() => changeStatus(record)}
                color="green"
              >
                Active
              </Tag>
            </div>
          );
        } else {
          return (
            <div className="d-flex align-items-center justify-content-center">
              <Tag
                className="cursor-pointer "
                onClick={() => changeStatus(record)}
                color="red"
              >
                InActive
              </Tag>
            </div>
          );
        }
      },
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => {
        // console.log("my Item=>",elm)
        return(
        <div className="text-right">
<Button onClick={()=>GetID(elm)}><BellOutlined /> </Button>      
  </div>
      )}
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => {
        // console.log("my Item=>",elm)
        return(
        <div className="text-right">
<Button onClick={()=>GetPhone(elm)}><MessageOutlined /> </Button>      
  </div>
      )}
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => {
        // console.log("my Item=>",elm)
        return(
        <div className="text-right">
           <Popconfirm
                    title="Are you sure？"
                    onConfirm={()=>GetPhone_RecoverPass(elm)}
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                   <Button ><KeyOutlined /> </Button>   
                  </Popconfirm>
   
  </div>
      )}
    },
  ];
  return (
    <div>
      {/* <CustomTable
        pageTitle="Online Clients list"
        dataRender={currentList}
        coloumRender={columns}
        isLoading={isLoading}
        noAddOption={true}
        noDeleteAction={true}
        refetch={refetch}
        error={error}
        setCurrentList={setCurrentList}
        prevousState={services}
        editEndPoint="CRM/veClientForm"
        readClient={"CRM/ReadClient"}
        searchUrl="search?client_search"
        hasNotification={"Client"}
      /> */}
       <CustomTable
        loading={loading}
         Fetch_record={(page)=>Fetch_record(page)}
        totalPages={totalPages}
        pageTitle="Online Clients list"
        dataRender={currentList}
        coloumRender={columns}
        // isLoading={isLoading}
        noAddOption={true}
        noDeleteAction={true}
        // refetch={refetch}
        // error={error}
        setCurrentList={setCurrentList}
        prevousState={currentList}
        editEndPoint="CRM/veClientForm"
        readClient={"CRM/ReadClient"}
        searchUrl="search?client_search"
        hasNotification={"Client"}
      />
       <Modal
        title={  "Send Notifications" }
        visible={ShowNotifi}
        destroyOnClose={true}
       
        // afterClose={() => }
        onCancel={() => {
          setShowNotifi(false)
        }}
        // okButtonProps='disabled'
        okButtonProps={{
          disabled: PostObjects.title_ar
            ? !PostObjects.body_en
            : !PostObjects.body_ar || !PostObjects. title_en,
        }}
        onOk={PostNotifi}
      >
       <Row gutter={16}>
      <Col xs={24} sm={24} md={24}>
      
          <Form.Item
            required
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            name="name_ar"
            hasFeedback
            label="Name in Arabic"
            // rules={[
            //   ({ getFieldValue }) => ({
            //     validator(_, value) {
            //       if (!value)
            //         return Promise.reject("Please enter The Name in Arabic");

            //       const checkValidation = languageValidator(
            //         value.toLowerCase(),
            //         ARABIC_alpha
            //       );
            //       if (checkValidation) {
            //         return Promise.resolve();
            //       } else {
            //         return Promise.reject("Please enter The Name in Arabic");
            //       }
            //     },
            //   }),
            // ]}
          >
            <Input
              onPressEnter={(e) => e.preventDefault()}
              onChange={(event) =>
                setPostObjects({
                  ...PostObjects,
                  title_ar: event.target.value,
                })
              }
              placeholder="Please enter Product Name in Arabic"
            />
          </Form.Item>

          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
            }}
            required
            name="name_en"
            label="Name in English"
            hasFeedback
            // rules={[
            //   ({ getFieldValue }) => ({
            //     validator(_, value) {
            //       const checkValidation = languageValidator(
            //         value.toLowerCase(),
            //         ENGLISH_ALPH
            //       );
            //       if (checkValidation) {
            //         return Promise.resolve();
            //       } else {
            //         return Promise.reject("Please enter The Name in English");
            //       }
            //     },
            //   }),
            // ]}
          >
            <Input
              onPressEnter={(e) => e.preventDefault()}
              onChange={(event) =>
                setPostObjects({
                  ...PostObjects,
                  title_en: event.target.value,
                })
              }
              placeholder="Please enter Product Name in English"
            />
          </Form.Item>

          <Form.Item
            required
            name="description_ar"
            label="Description in Arabic"
            // rules={[
            //   ({ getFieldValue }) => ({
            //     validator(_, value) {
            //       if (!value)
            //         return Promise.reject(
            //           "Please enter The Description in Arabic"
            //         );

            //       const checkValidation = languageValidator(
            //         value.toLowerCase(),
            //         ARABIC_alpha
            //       );
            //       if (checkValidation) {
            //         return Promise.resolve();
            //       } else {
            //         return Promise.reject(
            //           "Please enter The Description in Arabic"
            //         );
            //       }
            //     },
            //   }),
            // ]}
          >
            <Input.TextArea
              placeholder="Enter the Description in Arabic"
              onChange={(event) =>
                setPostObjects({
                  ...PostObjects,
                  body_ar: event.target.value,
                })
              }
              rows={4}
            />
          </Form.Item>

          <Form.Item
            required
            name="description_en"
            label="Description in English"
            // rules={[
            //   ({ getFieldValue }) => ({
            //     validator(_, value) {
            //       const checkValidation = languageValidator(
            //         value.toLowerCase(),
            //         ENGLISH_ALPH
            //       );
            //       if (checkValidation) {
            //         return Promise.resolve();
            //       } else {
            //         return Promise.reject(
            //           "Please enter The Description in English"
            //         );
            //       }
            //     },
            //   }),
            // ]}
          >
            <Input.TextArea
              placeholder="Enter the Description in English"
              onChange={(event) =>
                setPostObjects({
                  ...PostObjects,
                  body_en: event.target.value,
                })
              }
              rows={4}
            />
          </Form.Item>
        
          </Col>
          </Row>
      {/* <Button onClick={PostNotifi} type="primary">POST</Button> */}
    {/* </div> */}
   
    
              
       </Modal>

{/* //Send message// */}

<Modal
        title={  "Send Message" }
        visible={ShowMessage}
        destroyOnClose={true}
       
        // afterClose={() => }
        onCancel={() => {
          setMessage(false)
        }}
        // okButtonProps='disabled'
        okButtonProps={{
          disabled: PostObjects.title_ar
            ? !PostMessage.message_ar
            : !PostMessage.message_en 
        }}
        onOk={Post_Message}
      >
       <Row gutter={16}>
      <Col xs={24} sm={24} md={24}>
      
        

          <Form.Item
            required
            name="description_ar"
            label="Message En"
            // rules={[
            //   ({ getFieldValue }) => ({
            //     validator(_, value) {
            //       if (!value)
            //         return Promise.reject(
            //           "Please enter The Description in Arabic"
            //         );

            //       const checkValidation = languageValidator(
            //         value.toLowerCase(),
            //         ARABIC_alpha
            //       );
            //       if (checkValidation) {
            //         return Promise.resolve();
            //       } else {
            //         return Promise.reject(
            //           "Please enter The Description in Arabic"
            //         );
            //       }
            //     },
            //   }),
            // ]}
          >
            <Input.TextArea
              placeholder="Enter the Message in Arabic"
              onChange={(event) =>
                setPostMessage({
                  ...PostMessage,
                  message_ar: event.target.value,
                })
              }
              rows={4}
            />
          </Form.Item>

          <Form.Item
            required
            name="description_en"
            label="Message Ar"
            // rules={[
            //   ({ getFieldValue }) => ({
            //     validator(_, value) {
            //       const checkValidation = languageValidator(
            //         value.toLowerCase(),
            //         ENGLISH_ALPH
            //       );
            //       if (checkValidation) {
            //         return Promise.resolve();
            //       } else {
            //         return Promise.reject(
            //           "Please enter The Description in English"
            //         );
            //       }
            //     },
            //   }),
            // ]}
          >
            <Input.TextArea
              placeholder="Enter the Message in English"
              onChange={(event) =>
                setPostMessage({
                  ...PostMessage,
                  message_en: event.target.value,
                })
              }
              rows={4}
            />
          </Form.Item>
        
          </Col>
          </Row>
      {/* <Button onClick={PostNotifi} type="primary">POST</Button> */}
    {/* </div> */}
   
    
              
       </Modal>



    </div>
  );
}

export default Client;
