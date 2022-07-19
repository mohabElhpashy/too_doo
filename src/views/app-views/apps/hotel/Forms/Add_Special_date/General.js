import React, { useRef, useState, useEffect } from "react";
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  InputNumber,
  message,
  Select,
  Modal,
  Button,
  Table
} from "antd";
import { ImageSvg } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import service from "auth/FetchInterceptor";
import {
  ARABIC_alpha,
  ARABIC_NUMBER_CHAR,
  ENGLISH_ALPH,
  ENGLISH_Number_CHAR,
  NUMBER_CONSTANTS,
} from "constants/LanguagesConstent";
import { languageValidator, numberValidator } from "constants/helperFunctions";
 
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
  setVARIATIONS,

  PRODUCT
}) => {
  const [singleImage, setSingleImage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Product_details,setProduct_details]=useState({total_capacity:"",discount:"",product_id:"",variation_id:"",available_from:"",available_to:""});
  const [oldprice,setoldprice]=useState({value:""});


  
   

  
 
  const handlech = async(index) => {
    try {
      const data = await service.get(
        `web/weddingHall/listVariations/${index.id}`
      );
      console.log("mohahahahahb",data.record)

      setVARIATIONS(data.record)
    } catch (error) {
      <h2>{error}</h2>;
    }
    
      // setPostobject({...Postobject,screen_id:index.id})

    
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
const col_2 = (service_id, setSingleImage) => {
  // console.log("service id",service_id.id)

  return[
  {
    title: "ID",
    
    key: "id",
    render: (_, obj) => `# ${obj.variation_id ? obj.variation_id : obj.id}`,
  },
  {
    title: "name_ar",
    dataIndex: "name_ar",
    key: "name_ar",
    // sorter: (a, b) => a.product_name.length - b.product_name.length,
  },
  {
    title: "name_en",
    dataIndex: "name_en",
    key: "name_en",
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

const ListOfProducts_2 = ({
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


  
   

  
 
  const handlech = async(index) => {
   
setPostobject({wedding_hall_variation_id:index.id})
    console.log("form inisde ",index)
    
      // setPostobject({...Postobject,screen_id:index.id})

    
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
const Periods = ({
    setPRODUCT,
    PRODUCT,
    StoreList,
    setPostobject,
    Postobject,
    VARIATIONS ,
    setVARIATIONS
}) => {
  // const imgList = React.useMemo(() => (props.postObject.subImages.map((element, index) => ({ uid: index, url: element, name: 'image.png' }))))
const [allProducts,setallPRODUCTS]=useState([])
  const [variation,setvariation]=useState([])
  const sellerSelection = async (e) => {
    try {
      const data = await service.get(
        `web/products/2/${e}`
      );
      setallPRODUCTS(data.data);
      console.log("web/products/2/",data.data)
    } catch (error) {
      <h2>{error}</h2>;
    }
  }; 
// useEffect(async()=>{

// },[])
  return (
    <Row gutter={24 }>
    <div className="container"> 
    <Col xs={24} sm={24} md={17}>
      <Card title="Basic Info">
      
      

      <Form.Item required name="Store Name" label="Store Name:">
        <Select
          onPressEnter={(e) => e.preventDefault()}
          showSearch
          placeholder="Select a Store Name"
          // onChange={(e) =>{
          //   // setSTORE({ ...STORE, STOREID: e })
          //   setSTORE({...STORE, STOREID: e })
          // }
            
          // }
      
          onSelect={(e) => {
            sellerSelection(e);
          }}             
           optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          }
          rows={4}

        >
          {StoreList.map((element, index) => (
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
        data={allProducts}
        setPostobject={setPostobject}
        Postobject={Postobject}
        setVARIATIONS={setVARIATIONS}
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
        
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24}>
          <Card title={"Select a Variations"}>
      <ListOfProducts_2
        col={col_2}
        data={VARIATIONS}
        setPostobject={setPostobject}
        Postobject={Postobject}
        variation={variation}
        setvariation={setvariation}
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
  );
};

export default Periods;
