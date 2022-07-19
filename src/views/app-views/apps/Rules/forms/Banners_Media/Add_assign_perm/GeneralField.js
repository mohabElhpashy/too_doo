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
import {
  ARABIC_alpha,
  ARABIC_NUMBER_CHAR,
  ENGLISH_ALPH,
  ENGLISH_Number_CHAR,
  NUMBER_CONSTANTS,
} from "constants/LanguagesConstent";
import { languageValidator, numberValidator } from "constants/helperFunctions";

var Pricing=[]
var test={};
var new_array=[]
var ar=[]

const { Dragger } = Upload;
const { Option } = Select;
const main=[]
const listofProduct=[]
console.log("main",main)

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



 
const ListOfProducts = ({
  setPostObject,
  data,
  columns,postObject
 
}) => {
   
 
 
  console.log("values",postObject)

  const [currentList, setCurrentList] = useState([]);
  const [totalPages, settotalPages] = useState(1);

  const [loading, setloading] = useState(false);
  const handlech = (index) => {
    console.log("indexxxxxxx",index)
    var values = [...postObject];
    let filteredArray = values.filter(data => (data.id != index.id))
    console.log("first",filteredArray)
    if (filteredArray.length !== values.length) {//check if arr clicked before then
       values = values.filter(function(item) {
        return item.id !== index.id
    })
    setPostObject(values)
     }
      else{
 values.push({id:index.id,id_:Math.floor(Math.random() * 10000)})
     setPostObject(values)
      }
   
    
   
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
    try {
      const Records= await service.get(`/web/permessions?page=${page}`).then(respose=>{
        setCurrentList(respose.data.data)
        settotalPages(respose.data.last_page)
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
        pagination={{
          pageSize:10,
          total:totalPages,
          onChange:(page)=>{
              Fetch_record(page)
          }
        }}
        loading={loading}
        rowSelection={{
          type: "checkbox",
          onSelect:(index,data)=>handlech(index)
            
          ,
        
          getCheckboxProps: (record) => ({
            onClick: (t) => alert(record.id),
          }),
        }}
        columns={columns}
        dataSource={currentList}
         
        rowKey={(item) => (item.variation_id ? item.variation_id : item.id)}
      />
      
    </>
  );
};


const GeneralField = ({
  category,
  setPostObject,
  postObject,
  
  uploadLoading,
  roles
,permessions,
setid
,id__
  

}) => {

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => `# ${id}`,
    },
     
    {
      title: "method",
      dataIndex: "method",
      key: "method",
      
    },
  
    
    {
      title: "service_name",

      dataIndex: "service_name",
      key: "service_name",
      
    },
    {
      title: "uri",

      dataIndex: "uri",
      key: "uri",
      
    },
     
  
    
  ];
  const [Products, setProducts] = useState([]);

 
  return (
    <>
    <Row gutter={16}>
    <Col xs={24} sm={24} md={17}>
      <Card title="Basic Info">
        

        <Form.Item
          name="agency_id"
          required
          label={<span>Roles&nbsp;</span>}
        >
          <Select
            showSearch
            placeholder="Select a Roles"
            optionFilterProp="children"
            // disabled={props.storeIdProp ? true : false}
            // defaultValue={props.storeIdProp && parseInt(props.storeIdProp)}
            onChange={(e) =>
              setid({ ...id__, id: e })
            }
            // value={props.postObject.agency_id}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {roles?.map((element) => (
              <Option value={element.id}>{element?.name_en}</Option>
            ))}
          </Select>
        </Form.Item>
  

         
      </Card>
      
    </Col>
  </Row>
   <Row gutter={12}>
   <Col xs={24} sm={24} md={17} lg={17}>
   <Card title={"Select a Permission"}>
<ListOfProducts
 Products={Products}
  setProducts={setProducts}
 columns={columns}
 data={Products}
 postObject={postObject}
 setPostObject={setPostObject}
//  setCurrentPrice={setCurrentPrice}
//  setPRODUCT={ setPRODUCT}
//  setALL_Products={setALL_Products}


 />
</Card>
</Col>

 


 

 </Row>
 </>
  );
};

export default GeneralField;
