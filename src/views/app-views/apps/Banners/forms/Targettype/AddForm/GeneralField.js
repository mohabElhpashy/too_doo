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
import Flex from "components/shared-components/Flex";
import CustomIcon from "components/util-components/CustomIcon";
import { add, indexOf } from "lodash";
import React, { useEffect, useState } from "react";
import index from "views/app-views/apps/doctors";


const { Dragger } = Upload;
const { Option } = Select;
const main=[]
const listofProduct=[]
console.log("main",main)







const GeneralField = ({
  category,
  setPostObject,
  postObject,
  
  uploadLoading,


  

}) => {

  const [Products, setProducts] = useState([]);
  const [TargetType,setTargetType]=useState({value:""})

  const  service=[  "home", "product" ,"seller" ,"service" ,"flashdeals" ,"offers" ]
useEffect(()=>{
  console.log("mohab",TargetType)
},[TargetType])
 
  return (
    <Row gutter={24 }>
 <Col xs={24} sm={24} md={7}>
        <Card title="Add Target Type" style={{ height: 365,display:Flex,justifyContent:"space-around" }}>
        <Form.Item required name="Target Type" label="Target Type:">
          <Select
            onPressEnter={(e) => e.preventDefault()}
            showSearch
            placeholder="Select a Target Type"
            // onChange={(e) =>
            //   setTargetType({ ...TargetType, value: e })
              
            // }
            onSelect={(e) => {
              setPostObject({ ...postObject, value: e })

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
            {service?.map((element, index) => (
              <Select.Option key={index} value={element} onClick={e=>console.log(element)}>
                {element}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        </Card>
       
      </Col>   
      
        </Row>
  );
};

export default GeneralField;
