import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  Card,
Col,
DatePicker,
Form,
Input,
Modal,
Row,
Select,
Table,
Upload,
message,
Button,
Tabs 
} from "antd";
import { ImageSvg } from "assets/svg/icon";
import service from "auth/FetchInterceptor";
import CustomIcon from "components/util-components/CustomIcon";
import { add, indexOf } from "lodash";
import React, { useEffect, useState } from "react";
import index from "views/app-views/apps/doctors";
import { useFetch } from "hooks";
import Offers_Component from "./Offers_Component";
import SellersComponents from "./SellersComponents";
import FlashDeal_COmponents from "./FlashDeal_COmponents";
import ShowIn from "./ShowIn";


const { Dragger } = Upload;
const { Option } = Select;



const rules = {
  name: [
    {
      required: true,
      message: "Please enter name",
    },
  ],
  description: [
    {
      required: true,
      message: "Please enter product description",
    },
  ],
  price: [
    {
      required: true,
      message: "Please enter product price",
    },
  ],
  ratio_discount:[
    {
      required: true,
      message: "Please enter ratio discount",
    }
  ],
  comparePrice: [],
  taxRate: [
    {
      required: true,
      message: "Please enter tax rate",
    },
  ],
  cost: [
    {
      required: true,
      message: "Please enter item cost",
    },
  ],
  capacity: [
    {
      required: true,
      message: "Please enter capacity",
    },
  ],
  discount: [
    {
      required: true,
      message: "Please enter discount",
    },
  ],
};

const { TabPane } = Tabs;
const col = (service_id, setSingleImage) => {
  // console.log("service id",service_id.id)

  return[
  {
    title: "ID",
    
    key: "id",
    render: (_, obj) => `# ${obj.variation_id ? obj.variation_id : obj.id}`,
  },
  {
    title: "Name",
    dataIndex: "product_name",
    key: "product_name",
    // sorter: (a, b) => a.product_name.length - b.product_name.length,
  },

  service_id == 7
    ? {   
        title: "Purchase Type",
        key: "variation_type",
        render: (_, obj) => `${obj.variation_type}`,
      }
    : service_id == 1
    ? {
        title: "Number of Hours",
        key: "VariationType",
        render: (_, obj) => `${obj.variation_type} Hours`,
      }
    : service_id == 6
    ? {
        title: "Number of Days",
        key: "VariationType",
        render: (_, obj) => `${obj.variation_type} Days`,
      }
    : service_id == 2
    ? {
        title: "Varation Name",
        key: "VariationType",
        render: (_, obj) => `${obj.variation_type}`,
      }
    : {},
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
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price) => `${price} EGP`,
  },
  // {
  //   title: "Price",
  //   dataIndex: "price",
  //   key: "price",
  //   render: (price) => `${price} EGP`,
  // },
]; }

const ListOfProducts = ({
  name,
  col,
  data,
  
  setPostobject,
  Postobject,

  PRODUCT
}) => {
  const [singleImage, setSingleImage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Product_details,setProduct_details]=useState({total_capacity:"",discount:"",product_id:"",variation_id:"",available_from:"",available_to:""});
  const [oldprice,setoldprice]=useState({value:""});


  
   

  
 
  const handlech = (index) => {
    console.log(index)
    
      setPostobject({...Postobject,screen_id:index.id})

    
  }
 
  return (
    <>
      <Table
        
        rowSelection={{
          type: "radio",
          onSelect:(index,data)=>handlech(index)
           
          ,
        
          getCheckboxProps: (record) => ({
            onClick: (t) => alert(record.id),
          }),
        }}
        columns={col(Postobject?.service_id, setSingleImage)}
        dataSource={data}
        rowKey={(item) => (item.variation_id ? item.variation_id : item.id)}
      />
       
     
    </>
  );
};

const GeneralField = ({
  // category,
  // setPostObject,
  Postobject,
  setPostobject,

  // uploadLoading,
  checkView,

  ALLL,setALLL


  

}) => {
  const { services } = useFetch("services");
// console.log("SingleBanner",postObject)
  const TYPES=["Banners","Adds","Slider","Carts"]
  // const [Banner_Media,setBanner_Media]=useState([])
  const [Banner_Media,setBanner_Media]=useState([])
  const [seviceID,setseviceID]=useState({service_id:""})
  const References=["PRODUCT","OFFER","SELLER","SERVICE","FLASH_DEAL","COMPETITION" ];
  const [ref,setReferences]=useState({value:""})
  const [store,setStore]=useState([])
  const [Offers,setOffers]=useState([])
  const [STORE,setSTORE]=useState({STOREID:""})
  const [allPRODUCTS,setallPRODUCTS]=useState("")
  const getservice=[{name:"Dresses",id:1},{name:"Cars",id:2},{name:"Hotels",id:3},
  {name:"Doctors",id:4},{name:"MakeUp",id:5},{name:"Beauty Center",id:6}
,{name:"Photographer",id:7},{name:"Trips",id:8}]

  useEffect(async()=>{
    try {
    const banner_media=  await service.get("web/banners/media")
    setBanner_Media(banner_media.records)
    const Offers =await service.get("web/offers")
    // console.log("offers",Offers.data)
    setOffers(Offers.data)
 
      // openNotificationWithIcon("success");
      // history.push("targetType");
      // setSubmitLoading(false);
    } catch (error) {
      // setSubmitLoading(false);
    }
    if (seviceID.service_id) {
      try {
        const data = await service.get(`web/stores/${seviceID.service_id}`);
        setStore(data.data);
      } catch (error) {
        <h2>{error}</h2>;
      }
    }
  
  
  },[seviceID,ref],[allPRODUCTS])

//   const sellerSelection = async (e) => {
//     try {
//       const data = await service.get(
//         `web/products/${seviceID.service_id}/${e}`
//       );
//       setallPRODUCTS(data.data);
//       console.log(data.data)
//     } catch (error) {
//       <h2>{error}</h2>;
//     }
//   };
// useEffect(()=>{
//   console.log("refff",postObject)
//   // console.log("postObjectpostObjectpostObjectpostObjectpostObject",postObject.active)

//   setALLL(Postobject)
// },[postObject])
  
  return (
    <Row gutter={24}>
              < >
{checkView?
<>
<Col xs={24} sm={24} md={17}>
    <Card title="Basic Info" className="w-100">
        <Form.Item
          name="types"
          label="Types:"
          hasFeedback
          required
          onPressEnter={(e) => e.preventDefault()}
       
          style={{
            display: "inline-block",
            width: "calc(100% - 5px)",
            marginRight: 8,
          }}
        >
          <div key={TYPES}>
           <Select
          //  disabled={true}
          disabled={checkView}
            onPressEnter={(e) => e.preventDefault()}
            showSearch
            placeholder="Select a Type"
            defaultValue={Postobject.type}
           
           
             optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            rows={4}

          >
            {TYPES?.map((element, index) => (
              <Select.Option key={index} value={element} >
                {element}
              </Select.Option>
            ))}
          </Select>
          </div>
        </Form.Item>
       
        
        <Form.Item
            name="namr_en"
            label="English Name"
            // rules={rules.name}
            >
            <Input
            disabled={checkView}
            defaultValue={Postobject.name_en}
             
              placeholder="Name in English"
              // onPressEnter={(e) => e.preventDefault()}
            />
          </Form.Item>
          <Form.Item
           name="namr_ar" label="Arabic Name"
            // rules={rules.name}  
           defaultValue={"Postobject.name_ar"}>
            <Input
            disabled={checkView}
              placeholder="Name in Arabic "
              // onPressEnter={(e) => e.preventDefault()}
              defaultValue={Postobject.name_ar}
              
              rows={4}
            
            />
          </Form.Item>

          <Form.Item 
          name="Sort" label="Sort" 
          // rules={rules.name}  
          defaultValue={"Postobject.sort"}>
            <Input
            disabled={checkView}
              placeholder="Sort"
              defaultValue={Postobject.sort}
              // onPressEnter={(e) => e.preventDefault()}
               
              rows={4}
            
            />
          </Form.Item>
       
        
      </Card>
    </Col>
    <Col xs={24} sm={24} md={7}>
        <Card >
          <Form.Item required label="Image arabic ">
            <Dragger
              disabled={checkView}
              name="main_image"
              style={{ display: "inline-block", width: "calc(100% - 3px)" }}

              >
               
                <img
                   src={
                    Postobject.image_ar
                  }
                  alt="avatar"
                  className="img-fluid"
                />
              
            </Dragger>
            {/* <Dragger
              disabled={checkView}
              name="main_image"
              >
               
                <img
                  src={
                    postObject.product_image
                  }
                  alt="avatar"
                  className="img-fluid"
                />
              
            </Dragger> */}
          </Form.Item>
          <Form.Item required label="Image Eng">
            <Dragger
              disabled={checkView}
              name="main_image"
              style={{ display: "inline-block", width: "calc(100% - 3px)" }}

              >
               
                <img
                   src={
                    Postobject.image_en
                  }
                  alt="avatar"
                  className="img-fluid"
                />
              
            </Dragger>
            {/* <Dragger
              disabled={checkView}
              name="main_image"
              >
               
                <img
                  src={
                    postObject.product_image
                  }
                  alt="avatar"
                  className="img-fluid"
                />
              
            </Dragger> */}
          </Form.Item>

          
          
        </Card>
       
      </Col></>:
      <>
      <Col xs={24} sm={24} md={17}>
    <Card title="Basic Info" className="w-100">
        <Form.Item
          name="types"
          label="Types:"
          hasFeedback
          required
          onPressEnter={(e) => e.preventDefault()}
       
          style={{
            display: "inline-block",
            width: "calc(50% - 5px)",
            marginRight: 8,
          }}
        >
          <div key={TYPES}>
           <Select
          //  disabled={true}
          disabled={checkView}
            onPressEnter={(e) => e.preventDefault()}
            showSearch
            placeholder="Select a Type"
            defaultValue={Postobject.type}
           
            onSelect={(e) => {
              setPostobject({ ...Postobject, type: e })

          }}
             optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            rows={4}

          >
            {TYPES?.map((element, index) => (
              <Select.Option key={index} value={element} >
                {element}
              </Select.Option>
            ))}
          </Select>
          </div>
        </Form.Item>
        <Form.Item
          hasFeedback
          name="banner_media"
          label="Banner_Media:"
          required
     
          style={{ display: "inline-block", width: "calc(50% - 5px)" }}
        >
         <Select
            onPressEnter={(e) => e.preventDefault()}
            showSearch
            placeholder="Select a Banner Media"
          //  defaultValue={postObject.image_en}
          disabled={checkView}
          defaultValue={<img style={{height: "27px",
            width: "187px"}} src={Postobject.image_en}/>}
            onSelect={(e) => setPostobject({ ...Postobject, banner_media_id:e })}
             optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            rows={4}

          >
            {  Banner_Media.map((element, index) => (
              <Select.Option key={index} value={element.id} >
             <div style={{display:"flex",justifyContent:"space-around"}}>
               <span>{"#"}{element.id}</span>
             <img src={element.image_ar} style={{width:"100px",height:"50px",border:"1px solid black"}} />
             <img src={element.image_en} style={{width:"100px",height:"50px",border:"1px solid black"}}/>

               </div>  
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        
        <Form.Item
            name="namr_en"
            label="English Name"
            // rules={rules.name}
            >
            <Input
            disabled={checkView}
            defaultValue={Postobject.name_en}
              onChange={(e) =>
                setPostobject({ ...Postobject, name_en: e.target.value })
              }
              placeholder="Name in English"
              // onPressEnter={(e) => e.preventDefault()}
            />
          </Form.Item>
          <Form.Item
           name="namr_ar" label="Arabic Name" 
          //  rules={rules.name}  
           defaultValue={"Postobject.name_ar"}>
            <Input
            disabled={checkView}
              placeholder="Name in Arabic "
              // onPressEnter={(e) => e.preventDefault()}
              defaultValue={Postobject.name_ar}
              onChange={(e) =>
                setPostobject({ ...Postobject, name_ar: e.target.value })
              }
              rows={4}
            
            />
          </Form.Item>

          <Form.Item 
          name="Sort" label="Sort"
          //  rules={rules.name}  
          defaultValue={"Postobject.sort"}>
            <Input
            disabled={checkView}
              placeholder="Sort"
              defaultValue={Postobject.sort}
              // onPressEnter={(e) => e.preventDefault()}
              onChange={(e) =>
                setPostobject({ ...Postobject, sort: e.target.value })
              }
              rows={4}
            
            />
          </Form.Item>
       
        
      </Card>
    </Col></>}
    
    
  
  

    
      
      
      
  
</ >
      
        </Row>
  );
};

export default GeneralField;
