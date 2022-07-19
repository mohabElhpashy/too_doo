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
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price) => `${price} EGP`,
  },
  
]; 

}

const ListOfProducts = ({
  name,
  col,
  data,
  
  setPostobject,
  Postobject,
  ID_,
  PRODUCT
}) => {
  const [singleImage, setSingleImage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Product_details,setProduct_details]=useState({total_capacity:"",discount:"",product_id:"",variation_id:"",available_from:"",available_to:""});
  const [oldprice,setoldprice]=useState({value:""});


  
   

  
 
  const handlech = (index) => {
    console.log("mohahahahahb",index)
    
      setPostobject({...Postobject,screen_id:index.id})

    
  }
 console.log("id",ID_)
  return (
    <>
      <Table
        
        rowSelection={{
          type: "radio",
          // onSelect:(index,data)=>handlech(index),
          defaultSelectedRowKeys:[ID_?.ID_],
          selectedRowKeys:[ID_],
          
           
          // ,
        
          // getCheckboxProps: (record) => ({
          //   onClick: (t) => alert(record.id),
          // }),
        }}
        columns={col(Postobject?.service_id, setSingleImage)}
        dataSource={data}
        rowKey={(item) => (item.variation_id ? item.variation_id : item.id)}
      />
       
     
    </>
  );
};
const Periods = ({
  postObject,
    checkView
}) => {
  // const imgList = React.useMemo(() => (props.postObject.subImages.map((element, index) => ({ uid: index, url: element, name: 'image.png' }))))
const [allProducts,setallPRODUCTS]=useState([])
  
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
  console.log("postObject",postObject)
  return (
        <>
          
       {checkView?
       <Card title="Variants">
       <div className="mt-3">
         
           <Row   gutter={16}>
             <Col sm={24} md={11}>
          

             <Form.Item
       style={{
         display: "inline-block",
         width: "calc(100% - 5px)",
         marginRight: 8,
       }}
       required

       name="reservation_date"
       label="Name En"
       
     >
         <Input
                   name="Name En"
                   disabled
                  //  placeholder="Enter the Price"
                    // defaultValue={postObject?.name_en}
                    value={postObject?.price}
                    className="w-100"
                  />
       
      </Form.Item>
              </Col>
             <Col sm={24} md={11}>
                <Form.Item
                 label="Price"
             
                 rules={[
                   ({ getFieldValue }) => ({
                     validator(_, value) {
                       if (!numberValidator(value, NUMBER_CONSTANTS)) {
                         return Promise.reject(
                           "Your Cant include Charcters"
                         );
                       } else {
                         return Promise.resolve();
                       }
                     },
                   }),
                 ]}
                 className="w-100"
               >

                 <Input
                 value={postObject?postObject.price:"mohba"}
                   name="price"
                   placeholder="Enter the Price"
                   addonAfter="EGP"
                   required
                  //  defaultValue={postObject?.price}
                    className="w-100"
                   disabled
                  />

               </Form.Item>
              </Col>
            
           </Row>
           <Card title={"My Variation"}>
      <ListOfProducts
        col={col}
        data={postObject.variations}
        ID_={postObject.wedding_hall_variation_id}
       
 
      />
    </Card>
         
       </div></Card>:
       <>
<Row gutter={24 }>
    <div className="container"> 
    <Col xs={24} sm={24} md={24}>
      <Card title="Basic Info">
      
      

      <Form.Item required name="Store Name" label="Store Name:">
        <Select
          onPressEnter={(e) => e.preventDefault()}
          showSearch
          placeholder="Select a Store Name"
          defaultValue={postObject?.name_en}
          // onChange={(e) =>{
          //   // setSTORE({ ...STORE, STOREID: e })
          //   setSTORE({...STORE, STOREID: e })
          // }
            
          // }
      
          // onSelect={(e) => {
          //   sellerSelection(e);
          // }}             
           optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          }
          rows={4}

        >
          {/* {StoreList.map((element, index) => (
            <Select.Option key={element.id} value={element.value}>
              {element.name}
            </Select.Option>
          ))} */}
        </Select>
      </Form.Item>
     
      </Card>
      </Col>
      </div>
      </Row>
      <Card title="Variants">
       
        
         
       <div className="mt-3">
         
           <Row   gutter={16}>
             
             <Col sm={24} md={11}>
          
     
             <Form.Item
       style={{
         display: "inline-block",
         width: "calc(100% - 5px)",
         marginRight: 8,
       }}
      //  required
     
       name="reservation_date"
       label="Name En"
       
     >
         <Input
                //  value={postObject?.price}
                 defaultValue={postObject?.name_en}
                 name="price"
                 placeholder="Enter the Price"
                //  addonAfter="EGP"
                //  required
                //  defaultValue={postObject?.price}
                  className="w-100"
                  />
       
      </Form.Item>
              </Col>
             <Col sm={24} md={11}>
                <Form.Item
                 label="Price"
             required
                 rules={[
                   ({ getFieldValue }) => ({
                     validator(_, value) {
                       if (!numberValidator(value, NUMBER_CONSTANTS)) {
                         return Promise.reject(
                           "Your Cant include Charcters"
                         );
                       } else {
                         return Promise.resolve();
                       }
                     },
                   }),
                 ]}
                 className="w-100"
               >
     
                 <Input
                 value={postObject?.price}
                   name="price"
                   placeholder="Enter the Price"
                   addonAfter="EGP"
                   required
                  //  defaultValue={postObject?.price}
                    className="w-100"
                   
                  />
     
               </Form.Item>
              </Col>
            
           </Row>
           {/* <Card title={"My Variation"}>
      <ListOfProducts
        col={col}
        data={postObject.variations}
        ID_={postObject.wedding_hall_variation_id}
       
     
      />
     </Card> */}
         
       </div>
     
     
     
     </Card>
      </>
 }
        </>
     
   
  );
};

export default Periods;
