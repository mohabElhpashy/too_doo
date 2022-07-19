import { PlusOutlined } from "@ant-design/icons";
import { Button, message, Modal, Tag, Upload, Tooltip,Input,Popconfirm,
  Row,
  Comment,
  Col,
  Card,
  Form,} from "antd";
  import  {BellOutlined,MessageOutlined,KeyOutlined,QuestionCircleOutlined} from "@ant-design/icons";

import service from "auth/FetchInterceptor";
import { convertingServiceId } from "constants/helperFunctions";
import ServiceIdConstants from "constants/ServiceIdConstants";
import { useFetch } from "hooks";
import { lowerCase } from "lodash";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CustomTable from "../Components/Custome_table_for_perm";

const handleSelection = (service_id) => {
  switch (service_id) {
    case 8:
      return `makeup/AddMakeupService`;
    case 7:
      return `dresses/AddDress`;
    case 6:
      return `trips/AddTripForm`;

    case 5:
      return `photographer/AddPhotoSession`;

    case 4:
      return `beauty/AddBeautyCenterServices`;

    case 3:
      return `doctors/AddCheckUPs`;

    case 2:
      return `hotel/addWedding`;

    case 1:
      return `cars/AddCar`;

    default:
      break;
  }
};
const Seller = () => {
  const key = "updatable";

  // const { services, refetch, error, isSuccess } = useFetch("sellers");
  const [singleImage, setSingleImage] = useState("");
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
  const history = useHistory();
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
      topic:"singleSeller",
      target_id:ID
    }
    // console.log("x",x)
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
    // console.log("x",x)
    try {
      await service.post(`/web/singleSms/SELLER`,x).then(res=>  setMessage(false)
      );
      // refetch();
      message.success({ content: "Message Send!", key, duration: 2 });

     } catch (error) {
     }
  }
  const GetPhone_RecoverPass =async(elm)=>{
    try {
      await service.post(`/web/sendPassword`,{phone:elm.phone,type:"SELLER"}).then(res=> 
         console.log("res",res)
      );
      // refetch();
      message.success({ content: "Password Changed!", key, duration: 2 });
     } catch (error) {
     }
  
    // console.log("elm",elm.id)
      }
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
          const Records= await service.get(`/web/sellers?itemsPerPage=10&page=${1}`).then(respose=>{
            setCurrentList(respose.records)
            settotalPages(respose.paginationInfo.totalRecords)
            setloading(false)
          }) ;
        }
        else{
          try {
    
            const Records= await service.get(`/web/sellers?itemsPerPage=10&page=${page}`).then(respose=>{
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

  const changeStatus = async (record) => {
    const key = "updatable!";
    message.loading({ content: "Loading...", key, duration: 15 });

    try {
      await service.put(`/web/sellers/change-status/${record.id}`);
      message.success({ content: "Done!", key, duration: 2 });
      // refetch();
    } catch (error) {
      message.error({ content: "Error Occured!", key, duration: 2 });
    }
  };
  let filteredServiceName = [];
  for (const key in ServiceIdConstants) {
    filteredServiceName.push({
      value: ServiceIdConstants[key],
      text: key
        .split("_")[0]
        .split("")
        .map((element, index) => {
          if (index > 0) {
            return lowerCase(element);
          }
          if (index === 0) {
            return element;
          }
        })
        .join(""),
    });
  }
  
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: " Name ",
      dataIndex: "name",
      key:  "name",
      render: (text, Obj) => (
        <Comment
          // actions={[
          //   <span key=' key="comment-basic-dislike"'>
             
          //   </span>,
          // ]}
     
          content={
          // <p>{Obj.seller_first_name}{" "}{Obj.seller_last_name}</p>
          (
            <a
              onClick={() =>{
                // if(Obj.target_type=="seller"){
                  history.push(`veForm?name=view&id=${Obj.id}`)
                // } 
                // else{history.push(`ReadClient?name=view&id=${Obj.target_id}`)}
              }
              }
              
            >
              {/* {Obj.first_name || Obj.first_name +Obj.last_name} */}
              {Obj.first_name}{" "}{Obj.last_name}
            </a>
          )

        }
        
        />
      ),
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Main Image ",
      dataIndex: "main_image",
      key: "main_image",
      render: (text, obj) => {
        return (
          <Upload
            disabled={true}
            // fileList={props?.postObject?.images}
            fileList={[
              {
                uid: obj.id,
                name: obj.name_en,
                status: "done",
                url: obj.main_image,
              },
            ]}
            onPreview={(t) => setSingleImage(obj.main_image)}
            listType="picture-card"
          />
        );
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Service Name",
      // sorter: (a, b) => a.service_id - b.service_id,
      // filters:  [{ text: "test", value: "Woa" }],
      filters: filteredServiceName,
      filterMultiple: false,
      onFilter: (value, record) => record.service_id === value,
      render: (_, obj) => {
        return convertingServiceId(obj.service_id);
      },
    },

    {
      title: "Number Of Followers",
      key: "number_of_followers",
      align: "center",
      dataIndex: "number_of_followers",
      render: (number, record) => {
        return (
          <div className=" d-flex align-items-center justify-content-center">
            <Link
              to={{
                pathname: `/app/apps/social/followers`,
                state: {
                  record_id: record.id,
                },
              }}
            >
              <Button
                disabled={number == 0 || !number ? true : false}
                className="ant-btn-lg "
                style={{
                  fontSize: 12,
                  backgroundColor: "transparent",
                  borderColor: "#699dff",
                }}
              >
                <span
                  style={{ fontWeight: "400", fontSize: 18 }}
                  className=" mr-1"
                >
                  {!number ? "0" : number}
                </span>
                {number == 1 ? "Follower" : `Followers`}
              </Button>
            </Link>
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (text, record) => {
        if (text) {
          return (
            <Tag
              className="cursor-pointer"
              onClick={() => changeStatus(record)}
              color="green"
            >
              Approve
            </Tag>
          );
        } else {
          return (
            <Tag
              className="cursor-pointer "
              onClick={() => changeStatus(record)}
              color="red"
            >
              UnApproved
            </Tag>
          );
        }
      },
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          <Tooltip title="Add Product to This Seller">
            <Link
              to={{
                pathname: `/app/apps/${handleSelection(elm.service_id)}`,
                search: `?store_id=${elm?.store_id}&seller_id=${elm.id}`,
              }}
            >
              <Button
                icon={<PlusOutlined />}
                style={{ justifyContent: "center", alignItems: "center" }}
              />
            </Link>
          </Tooltip>
        </div>
      ),
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
        pageTitle="Sellers list"
        dataRender={currentList}
        coloumRender={columns}
        isLoading={!isSuccess}
        prevousState={services} 
        setCurrentList={setCurrentList}
        refetch={refetch}
        error={error}
        endPoint="sellers"
        addEndPoint="CRM/addForm"
        editEndPoint="CRM/veForm"
        searchUrl="seller/search?seller_search"
        hasNotification={"Seller"}
      /> */}
           <CustomTable
        loading={loading}
         Fetch_record={(page)=>Fetch_record(page)}
        totalPages={totalPages}
        pageTitle="Sellers list"
        dataRender={currentList}
        coloumRender={columns}
        // isLoading={!isSuccess}
        prevousState={currentList}
        setCurrentList={setCurrentList}
        // refetch={refetch}
        // error={error}
        endPoint="sellers"
        addEndPoint="CRM/addForm"
        editEndPoint="CRM/veForm"
        searchUrl="seller/search?seller_search"
        hasNotification={"Seller"}
      />
      <Modal
        visible={singleImage.length > 0}
        footer={null}
        onCancel={() => setSingleImage("")}
      >
        <img
          alt="image"
          style={{ width: "100%", height: 350 }}
          src={singleImage}
        />
      </Modal>
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
};

export default Seller;
