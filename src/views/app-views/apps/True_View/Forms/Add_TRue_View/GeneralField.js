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
Button
} from "antd";
import { ImageSvg } from "assets/svg/icon";
import service from "auth/FetchInterceptor";
import CustomIcon from "components/util-components/CustomIcon";
import { add, indexOf } from "lodash";
import React, { useEffect, useState } from "react";
import index from "views/app-views/apps/doctors";
var Pricing=[]
var test={};
var new_array=[]
var ar=[]

const { Dragger } = Upload;
const { Option } = Select;
const main=[]
const listofProduct=[]
// console.log("main",main)
const col = (service_id, setSingleImage) => {
  // console.log("service id ",service_id)
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

// const uploadTest = async(e)=>{
//   try {
//   const imgFile= e.fileList[0].originFileObj
//   const data = new FormData();
//   data.append(imgFile)
//   const urlPath = await service.get('http://dev.farahymall.com/api/admin/upload_media')

// } catch (error) {

// }

// }
const ListOfProducts = ({
  name,
  col,
  data,
  setPostObject,
  postObject,
  setCurrentPrice,
  setPRODUCT,
  setALL_Products,

  PRODUCT
}) => {
  const [singleImage, setSingleImage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Product_details,setProduct_details]=useState({total_capacity:"",discount:"",product_id:"",variation_id:"",available_from:"",available_to:""});
  const [oldprice,setoldprice]=useState({value:""});


  const showModal = (index) => {
    // console.log("from Modal",index)
    setoldprice({...oldprice,value:index})
    // setProduct_details({total_capacity:"",discount:"",product_id:"",variation_id:"",available_from:"",available_to:""})
    setIsModalVisible(true);
  };
  
 
  const handlech = (index) => {
    // console.log("product_id",{product_id:index.id})
    console.log("INDEx",index)
    if(postObject.service_id==7){
      setPostObject({...postObject,product_id:index.variation_id})

    }
    else{
      setPostObject({...postObject,product_id:index.id})

    }
    // setProduct_details({...Product_details,variation_id:index.variation_id,product_id:index.id})

  }
  useEffect(()=>{
// console.log("maaap",Product_details)
  },[Product_details])
  return (
    <>
      <Table
        // title={() => (
        //   <Search
        //     setCurrentList={setCurrentList}
        //     prevousState={data}
        //     url={''}
        //   />
        // )}
        rowSelection={{
          type: "radio",
          onSelect:(index,data)=>handlech(index)
            
          ,
        
          getCheckboxProps: (record) => ({
            onClick: (t) => alert(record.id),
          }),
        }}
        columns={col(postObject?.service_id, setSingleImage)}
        dataSource={data}
        rowKey={(item) => (item.variation_id ? item.variation_id : item.id)}
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
    
    </>
  );
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const imageUploadProps = {
  name: "file",
  multiple: true,
  listType: "picture-card",
  showUploadList: false,

  // action:async(e)=>{
  //   const rag = {type:'Dress' , file:e}
  //   const data = new FormData();
  //   for (const key of Object.keys(rag)) {
  //     data.append(key, rag[key]);
  //   }

  // }
};

const GeneralField = ({
  category,
  setPostObject,
  postObject,
  setRequestedData,
  requestedData,
  inialOperations,
  setPackage,
  currentPackage,
  setOperation,
  operations,
  uploadLoading,
  uploadedImg,
  services,
  listofStores,
  productList,
  setProductList,
  setPRODUCT,

  PRODUCT,
  ALL_Products,
  setALL_Products

  

}) => {

  const [currentPrice, setCurrentPrice] = useState("0");
  const [Products, setProducts] = useState([]);
  const [singleImage, setSingleImage] = useState("");

 
 
 


  const sellerSelection = async (e) => {
    setPostObject( {...postObject, store_id: e });
    try {
      const data = await service.get(
        `web/products/${postObject.service_id}/${e}`
      );
      setProducts(data.data);
      // console.log(data.data)
    } catch (error) {
      <h2>{error}</h2>;
    }
  };
  const handelSelection = async (endPoint, type, typeId, input) => {
    setOperation({ ...operations, [typeId]: input });
    try {
      const data = await service.get(`/web/${endPoint}`).then((res) => res);
      setRequestedData({ ...requestedData, [type]: [...data.data] });
    } catch (error) {}
  };
  
 
   return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24}>
        <Card title="Basic Info">
         
          <Form.Item required name="service_id" label="Service Name:">
          <Select
            onPressEnter={(e) => e.preventDefault()}
            showSearch
            placeholder="Select a Service Name"
            onChange={(e) =>
              setOperation({ ...operations, service_id: e })
            }
            onSelect={(e) => setPostObject({...postObject, service_id: e })}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            rows={4}

          >
            {category?.map((element, index) => (
              <Select.Option key={element.id} value={element.value}>
                {element.type}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item required name="Store Name" label="Store Name:">
          <Select
            onPressEnter={(e) => e.preventDefault()}
            showSearch
            placeholder="Select a Store Name"
            onChange={(e) =>
              setOperation({ ...operations, service_id: e })
            }
            onSelect={(e) => {
              sellerSelection(e);
            }}
            // onSelect={(e) => setPostObject({ ...postObject, service_id: e })}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            rows={4}

          >
            {listofStores?.map((element, index) => (
              <Select.Option key={element.id} value={element.value}>
                {element.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
    
        </Card>

          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24}>
            <Card title={"Select a Product"}>
        <ListOfProducts
          col={col}
          data={Products}
          postObject={postObject}
          setPostObject={setPostObject}
          setCurrentPrice={setCurrentPrice}
          setPRODUCT={ setPRODUCT}
          setALL_Products={setALL_Products}
          PRODUCT={PRODUCT}
        />
      </Card>
      </Col>
    </Row>

      </Col>
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
     </Row>
  );
};

export default GeneralField;
