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
  // postObject,
  
  // uploadLoading,
  ALLL,setALLL


  

}) => {
  const { services } = useFetch("services");

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
const [Postobject,setPostobject]=useState(
  {name_ar:"",name_en:"",active:"", sort:"",type:"",banner_media_id:"",reference:"",screen_id:"",screen_service_id:"",types:null})
  useEffect(async()=>{
    // console.log("refff",ref.value)
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

  const sellerSelection = async (e) => {
    try {
      const data = await service.get(
        `web/products/${seviceID.service_id}/${e}`
      );
      setallPRODUCTS(data.data);
      console.log(data.data)
    } catch (error) {
      <h2>{error}</h2>;
    }
  };
useEffect(()=>{
console.log("asdasdasd",Postobject)
setALLL(Postobject)
},[Postobject])
 const renderSwitch=( )=> {
    switch(ref.value) {
      case 'PRODUCT':
        // alert(ref.value)
        return  <Row gutter={24 }>
        <div className="container"> 
        <Col xs={24} sm={24} md={17}>
          <Card title="Basic Info">
            <Form.Item required name="service_id" label="Service name:">
            <div key={TYPES}>

            <Select
              onPressEnter={(e) => e.preventDefault()}
              showSearch
              placeholder="Select a References"
              onChange={(e) =>
                setseviceID({ ...seviceID, service_id: e })
              }
              onSelect={(e)=>setPostobject({...Postobject,screen_service_id:e})}
        
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              rows={4}
  
            >
               {services?.map((element, index) => (
              <Select.Option key={element.id} value={element.id}>
                {element.type}
              </Select.Option>
            ))}
            </Select>
            </div>
          </Form.Item>
          
    
          <Form.Item required name="Store Name" label="Store Name:">
            <Select
              onPressEnter={(e) => e.preventDefault()}
              showSearch
              placeholder="Select a Store Name"
              onChange={(e) =>{
                // setSTORE({ ...STORE, STOREID: e })
                setSTORE({...STORE, STOREID: e })
              }
                
              }
          
              onSelect={(e) => {
                sellerSelection(e);
              }}              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              rows={4}
  
            >
              {store.map((element, index) => (
                <Select.Option key={element.id} value={element.value}>
                  {element.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
         
          </Card>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={24} lg={24}>
              <Card title={"Select a Product"}>
          <ListOfProducts
            col={col}
            data={allPRODUCTS}
            setPostobject={setPostobject}
            Postobject={Postobject}
    //         postObject={postObject}
    //         setPostObject={setPostObject}
    //         setCurrentPrice={setCurrentPrice}
    //         setPRODUCT={ setPRODUCT}
    //         setALL_Products={setALL_Products}
  
  
    // PRODUCT={PRODUCT}
          />
        </Card>
      
      </Col>
          
            </Row>
        </Col>
         
        </div>
        </Row>
        case 'OFFER':
          return <Row gutter={24 }>
          <div className="container"> 
          <Col xs={24} sm={24} md={17}>  <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24}>
          <Card title={"Select Offer"}>
      <Offers_Component
      setPostobject={setPostobject}
      Postobject={Postobject}
      />
    </Card>
  
  </Col>
      
        </Row>
         </Col>
         
         </div>
         </Row>
          case 'SELLER':
            return <Row gutter={24 }>
            <div className="container"> 
            <Col xs={24} sm={24} md={17}>  <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={24}>
            <Card title={"Select seller"}>
        <SellersComponents
          setPostobject={setPostobject}
          Postobject={Postobject}
        />
      </Card>
    
    </Col>
        
          </Row>
           </Col>
           
           </div>
           </Row>
            case 'FLASH_DEAL':
              return <Row gutter={24 }>
              <div className="container"> 
              <Col xs={24} sm={24} md={17}>  <Row gutter={16}>
              <Col xs={24} sm={24} md={24} lg={24}>
              <Card title={"Select Flash Deal"}>
          <FlashDeal_COmponents
           setPostobject={setPostobject}
           Postobject={Postobject}
          />
        </Card>
      
      </Col>
          
            </Row>
             </Col>
             
             </div>
             </Row>
              case 'SERVICE':
                // alert(ref.value)
                return    <Row gutter={24 }>
                <div className="container"> 
                <Col xs={24} sm={24} md={17}>
                    <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24}>
                <Card title="Select Service">
          <Form.Item required name="service_id" label="Services:">
          <div key={TYPES}>

          <Select
            onPressEnter={(e) => e.preventDefault()}
            showSearch
            placeholder="Select a References"
            // onChange={(e) =>
            //   setReferences({ ...ref, value: e })
            // }
            onSelect={(e) => setPostobject({ ...Postobject, screen_service_id: e })}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            rows={4}

          >
            {getservice?.map((element, index) => (
              <Select.Option key={index} value={element.id}>
                {element.name}
              </Select.Option>
            ))}
          </Select>
          </div>
        </Form.Item>
        
  
        
       
        </Card>
                </Col>
                </Row>

                  </Col>
                  </div>
                  </Row>


      default:
        return ;
    }
    
  }
  return (
    <Row gutter={24 }>
              <div className="container">

      <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
    <TabPane tab="General" key="1">
    <Row xs={24} sm={24} md={17}>
    <Col xs={24} sm={24} md={17}>
    <Card title="Basic Info" className="w-100">
        <Form.Item
          name="types"
          label="Types:"
          hasFeedback
          required
          onPressEnter={(e) => e.preventDefault()}
          // rules={[
          //   feildChecker.subject_ar
          //     ? []
          //     : ({ getFieldValue }) => ({
          //         validator(_, value) {
          //           const checkValidation = languageValidator(
          //             value,
          //             ARABIC_alpha
          //           );
          //           if (checkValidation) {
          //             setButtonChecker(true);
          //             return Promise.resolve();
          //           } else {
          //             setButtonChecker(false);
          //             return Promise.reject(
          //               "Please enter The Subject in Arabic"
          //             );
          //           }
          //         },
          //       }),
          // ]}
          style={{
            display: "inline-block",
            width: "calc(50% - 5px)",
            marginRight: 8,
          }}
        >
          <div key={TYPES}>
           <Select
            onPressEnter={(e) => e.preventDefault()}
            showSearch
            placeholder="Select a Type"
           
            onSelect={(e) => {
              setPostobject({ ...setPostobject, type: e })

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
            rules={rules.name}
            defaultValue={Postobject.name_en}
            >
            <Input
              onChange={(e) =>
                setPostobject({ ...Postobject, name_en: e.target.value })
              }
              placeholder="Name in English"
              // onPressEnter={(e) => e.preventDefault()}
            />
          </Form.Item>
          <Form.Item name="namr_ar" label="Arabic Name" rules={rules.name}  defaultValue={Postobject.name_ar}>
            <Input
              placeholder="Name in Arabic "
              // onPressEnter={(e) => e.preventDefault()}
              onChange={(e) =>
                setPostobject({ ...Postobject, name_ar: e.target.value })
              }
              rows={4}
            
            />
          </Form.Item>

          <Form.Item name="Sort" label="Sort" rules={rules.name}  defaultValue={Postobject.sort}>
            <Input
              placeholder="Sort"
              // onPressEnter={(e) => e.preventDefault()}
              onChange={(e) =>
                setPostobject({ ...Postobject, sort: e.target.value })
              }
              rows={4}
            
            />
          </Form.Item>
       
        
      </Card>
    </Col>
  
    </Row>
          </TabPane>


    <TabPane tab="References" key="2">
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item required name="service_id" label="References:">
          <Select
            onPressEnter={(e) => e.preventDefault()}
            showSearch
            placeholder="Select a References"
            onChange={(e) =>
              setReferences({ ...ref, value: e })
            }
            onSelect={(e) => setPostobject({ ...Postobject, reference: e })}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            rows={4}

          >
            {References?.map((element, index) => (
              <Select.Option key={index} value={element}>
                {element}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        
  
        
       
        </Card>
              
      </Col>
      {renderSwitch()}

     </Row>    
      </TabPane>
      {ref.value? 
      <TabPane tab="Show In" key="3">
      <ShowIn setPostobject={setPostobject}Postobject={Postobject}/>
    </TabPane>: null}
      
  </Tabs>
</div>
      
        </Row>
  );
};

export default GeneralField;
