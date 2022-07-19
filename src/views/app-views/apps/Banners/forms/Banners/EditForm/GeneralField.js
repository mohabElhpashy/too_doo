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
  row_default,
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
          onSelect:(index,data)=>handlech(index),
          defaultSelectedRowKeys:[row_default]
           
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
// console.log("postObject.screen_name_arpostObject.screen_name_ar",postObject)
  const TYPES=["Banners","Adds","Slider","Carts"]
  // const [Banner_Media,setBanner_Media]=useState([])
  const [Banner_Media,setBanner_Media]=useState([])
  const [seviceID,setseviceID]=useState({service_id:""})
  const References=["PRODUCT","OFFER","SELLER","SERVICE","FLASH_DEAL","COMPETITION" ];
  const [ref,setReferences]=useState({value:""})
  const [store,setStore]=useState([])
  const [Offers,setOffers]=useState([])
  const [Products, setProducts] = useState([]);

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
    if (Postobject.screen_service_id) {
      try {
        const data = await service.get(`web/stores/${Postobject.screen_service_id}`);
        setStore(data.data);
        const Product = await service.get(
          `web/products/${Postobject.screen_service_id}/${Postobject.store_id}`
        );
        setProducts(Product.data);
      } catch (error) {
        <h2>{error}</h2>;
      }
    }
  
  
  },[seviceID,ref],[allPRODUCTS])

  const sellerSelection = async (e) => {
    try {
      const data = await service.get(
        `web/products/${Postobject.screen_service_id}/${e}`
      );
      setProducts(data.data);
      console.log(data.data)
    } catch (error) {
      <h2>{error}</h2>;
    }
  };

 const renderSwitch=(Postobject)=> {
  console.log("mohahahahah")
  //  alert("from my render")
  //  return <h1>{postObject.reference}</h1>
  //  if(postObject.reference!=""){ 
     console.log("from my render ana goaaa",Postobject.reference)
            //  setPostobject({...Postobject,screen_service_id:Postobject.screen_service_id})

    switch(Postobject.reference) {
      case 'PRODUCT':
        // setPostobject({...Postobject,screen_service_id:Postobject.screen_service_id})
        // setSTORE({...STORE, STOREID: e })


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
              defaultValue={Postobject.screen_service_id}
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
              defaultValue={Postobject.store_name_en}
              placeholder="Select a Store Name"
              onChange={(e) =>{
                // setSTORE({ ...STORE, STOREID: e })
                setSTORE({...STORE, STOREID: e })
                console.log("store",e)
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
            data={Products}
            setPostobject={setPostobject}
            Postobject={Postobject}
            row_default={Postobject.screen_id}
            // setPostobject={setPostobject}
            // setCurrentPrice={setCurrentPrice}
            // setPRODUCT={ setPRODUCT}
            // setALL_Products={setALL_Products}
  
  
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
  //  }
  // else{
  //   switch(ref.value) {
  //     case 'PRODUCT':
  //       // alert(ref.value)
  //       return  <Row gutter={24 }>
  //       <div className="container"> 
  //       <Col xs={24} sm={24} md={17}>
  //         <Card title="Basic Info">
  //           <Form.Item required name="service_id" label="Service name:">
  //           <div key={TYPES}>

  //           <Select
  //             onPressEnter={(e) => e.preventDefault()}
  //             showSearch
  //             placeholder="Select a References"
  //             onChange={(e) =>
  //               setseviceID({ ...seviceID, service_id: e })
                
  //             }
  //             onSelect={(e)=>setPostobject({...Postobject,screen_service_id:e})}
        
  //             optionFilterProp="children"
  //             filterOption={(input, option) =>
  //               option.props.children
  //                 .toLowerCase()
  //                 .indexOf(input.toLowerCase()) >= 0
  //             }
  //             rows={4}
  
  //           >
  //              {services?.map((element, index) => (
  //             <Select.Option key={element.id} value={element.id}>
  //               {element.type}
  //             </Select.Option>
  //           ))}
  //           </Select>
  //           </div>
  //         </Form.Item>
          
    
  //         <Form.Item required name="Store Name" label="Store Name:">
  //           <Select
  //             onPressEnter={(e) => e.preventDefault()}
  //             showSearch
  //             placeholder="Select a Store Name"
  //             onChange={(e) =>{
  //               // setSTORE({ ...STORE, STOREID: e })
  //               setSTORE({...STORE, STOREID: e })
  //             }
                
  //             }
          
  //             onSelect={(e) => {
  //               sellerSelection(e);
  //             }}              optionFilterProp="children"
  //             filterOption={(input, option) =>
  //               option.props.children
  //                 .toLowerCase()
  //                 .indexOf(input.toLowerCase()) >= 0
  //             }
  //             rows={4}
  
  //           >
  //             {store.map((element, index) => (
  //               <Select.Option key={element.id} value={element.value}>
  //                 {element.name}
  //               </Select.Option>
  //             ))}
  //           </Select>
  //         </Form.Item>
         
  //         </Card>
  //           <Row gutter={16}>
  //             <Col xs={24} sm={24} md={24} lg={24}>
  //             <Card title={"Select a Product"}>
  //         <ListOfProducts
  //           col={col}
  //           data={allPRODUCTS}
  //           setPostobject={setPostobject}
  //           Postobject={Postobject}
  //   //         postObject={postObject}
  //   //         setPostObject={setPostObject}
  //   //         setCurrentPrice={setCurrentPrice}
  //   //         setPRODUCT={ setPRODUCT}
  //   //         setALL_Products={setALL_Products}
  
  
  //   // PRODUCT={PRODUCT}
  //         />
  //       </Card>
      
  //     </Col>
          
  //           </Row>
  //       </Col>
         
  //       </div>
  //       </Row>
  //       case 'OFFER':
  //         return <Row gutter={24 }>
  //         <div className="container"> 
  //         <Col xs={24} sm={24} md={17}>  <Row gutter={16}>
  //         <Col xs={24} sm={24} md={24} lg={24}>
  //         <Card title={"Select Offer"}>
  //     <Offers_Component
  //     setPostobject={setPostobject}
  //     Postobject={Postobject}
  //     />
  //   </Card>
  
  // </Col>
      
  //       </Row>
  //        </Col>
         
  //        </div>
  //        </Row>
  //         case 'SELLER':
  //           return <Row gutter={24 }>
  //           <div className="container"> 
  //           <Col xs={24} sm={24} md={17}>  <Row gutter={16}>
  //           <Col xs={24} sm={24} md={24} lg={24}>
  //           <Card title={"Select seller"}>
  //       <SellersComponents
  //         setPostobject={setPostobject}
  //         Postobject={Postobject}
  //       />
  //     </Card>
    
  //   </Col>
        
  //         </Row>
  //          </Col>
           
  //          </div>
  //          </Row>
  //           case 'FLASH_DEAL':
  //             return <Row gutter={24 }>
  //             <div className="container"> 
  //             <Col xs={24} sm={24} md={17}>  <Row gutter={16}>
  //             <Col xs={24} sm={24} md={24} lg={24}>
  //             <Card title={"Select Flash Deal"}>
  //         <FlashDeal_COmponents
  //          setPostobject={setPostobject}
  //          Postobject={Postobject}
  //         />
  //       </Card>
      
  //     </Col>
          
  //           </Row>
  //            </Col>
             
  //            </div>
  //            </Row>
  //             case 'SERVICE':
  //               // alert(ref.value)
  //               return    <Row gutter={24 }>
  //               <div className="container"> 
  //               <Col xs={24} sm={24} md={17}>
  //                   <Row gutter={16}>
  //               <Col xs={24} sm={24} md={24} lg={24}>
  //               <Card title="Select Service">
  //         <Form.Item required name="service_id" label="Services:">
  //         <div key={TYPES}>

  //         <Select
  //           onPressEnter={(e) => e.preventDefault()}
  //           showSearch
  //           placeholder="Select a References"
  //           // onChange={(e) =>
  //           //   setReferences({ ...ref, value: e })
  //           // }
  //           onSelect={(e) => setPostobject({ ...Postobject, screen_service_id: e })}
  //           optionFilterProp="children"
  //           filterOption={(input, option) =>
  //             option.props.children
  //               .toLowerCase()
  //               .indexOf(input.toLowerCase()) >= 0
  //           }
  //           rows={4}

  //         >
  //           {getservice?.map((element, index) => (
  //             <Select.Option key={index} value={element.id}>
  //               {element.name}
  //             </Select.Option>
  //           ))}
  //         </Select>
  //         </div>
  //       </Form.Item>
        
  
        
       
  //       </Card>
  //               </Col>
  //               </Row>

  //                 </Col>
  //                 </div>
  //                 </Row>


  //     default:
  //       return ;
  //   }
  // }
   
    
  }
  return (
    <Row  gutter={16}>
      {checkView?     
<> 
 <Col xs={24} sm={24} md={17}>
   <Card title="Basic Info">
     <Form.Item required name="service_id" label="References:">
     <Select
     defaultValue={Postobject.reference}
     disabled={checkView}
       onPressEnter={(e) => e.preventDefault()}
       showSearch
       placeholder="Select a References"
       
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
    

   <Form.Item
     name="types"
     label="Product_name_ar:"
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
       placeholder="Product_name_eng"
       defaultValue={Postobject.name_ar}
      
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
       {/* {TYPES?.map((element, index) => (
         <Select.Option key={index} value={element} >
           {element}
         </Select.Option>
       ))} */}
     </Select>
     </div>
   </Form.Item>
   <Form.Item
     hasFeedback
     name="banner_media"
     label="Product_name_ar"
     required

     style={{ display: "inline-block", width: "calc(50% - 5px)" }}
   >
    <Select
       onPressEnter={(e) => e.preventDefault()}
       showSearch
       placeholder="Select a Product name ar"
      defaultValue={Postobject.name_en}
     disabled={checkView}
       onSelect={(e) => setPostobject({ ...Postobject, banner_media_id:e })}
        optionFilterProp="children"
       filterOption={(input, option) =>
         option.props.children
           .toLowerCase()
           .indexOf(input.toLowerCase()) >= 0
       }
       rows={4}

     >
       {/* {  Banner_Media.map((element, index) => (
         <Select.Option key={index} value={element.id} >
        <div style={{display:"flex",justifyContent:"space-around"}}>
          <span>{"#"}{element.id}</span>
        <img src={element.image_ar} style={{width:"100px",height:"50px",border:"1px solid black"}} />
        <img src={element.image_en} style={{width:"100px",height:"50px",border:"1px solid black"}}/>

          </div>  
         </Select.Option>
       ))} */}
     </Select>
   </Form.Item>
   
   </Card>
   
         
 </Col>
 <Col xs={24} sm={24} md={7}>
        <Card >
          <Form.Item required label="Product Image">
            <Dragger
              disabled={checkView}
              name="main_image"
              style={{ display: "inline-block", width: "calc(100% - 3px)" }}

              >
               
                <img
                   src={
                    Postobject.product_image
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
       
      </Col>

   

 
        
        </>:     

<div className="container">
 
 <Col xs={24} sm={24} md={17}>
   <Card title="Basic Info">
     <Form.Item required name="service_id" label="References:">
     <Select
     defaultValue={Postobject.reference}
     disabled={checkView}
       onPressEnter={(e) => e.preventDefault()}
       showSearch
       placeholder="Select a References"
       onChange={(e) => setPostobject({ ...Postobject, reference: e })}
        

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
 {renderSwitch(Postobject)}

   

 
</div>}
         
      
        </Row>
  );
};

export default GeneralField;
