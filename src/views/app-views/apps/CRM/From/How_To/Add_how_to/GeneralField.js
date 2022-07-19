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
import IMG from '../../../../../../../../src/Capture.PNG'

var Pricing=[]
var test={};
var new_array=[]
var ar=[]

const { Dragger } = Upload;
const { Option } = Select;
const main=[]
const listofProduct=[]
// console.log("main",main)
 
 
 
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "video/mp4" || file.type === "image/jpg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload MP4 or JPG file!");
  }
  const isLt2M = file.size / 10000 / 10000 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 10MB!");
  }
  return isJpgOrPng && isLt2M;
};

const imageUploadProps = {
  name: "file",
  multiple: true,
  listType: "picture-card",
  showUploadList: false,

 
};

const GeneralField = ({
  category,
  setPostObject,
  postObject,
  setRequestedData,
  requestedData,
 
  setOperation,
  operations,
  uploadLoading
   

  

}) => {

  const [currentPrice, setCurrentPrice] = useState("0");
  const [Products, setProducts] = useState([]);
  const [singleImage, setSingleImage] = useState("");

 console.log("postObject",postObject)
 
 


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
     <>
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
         
    
        </Card>

     

      </Col>
     
     </Row>
      <Row style={{display:"flex",justifyContent:"space-around"}} gutter={12}>
      <Col xs={24} sm={24} md={7}>
   <Card title="Video" style={{ height: 365 }}>
       <Dragger
       
         {...imageUploadProps}
         beforeUpload={beforeUpload}
         customRequest={async (options) => {
           const key = "updatable";
           message.loading({ content: "Loading...", key, duration: 1000000 });

           const imageObject = { type: "Videos", video: options.file };
           const data = new FormData();
           try {
             for (const key of Object.keys(imageObject)) {
               data.append(key, imageObject[key]);
             }
             const test = await service.post("/upload_media", data);
             console.log("mohab",test)
             message.success({
               content: `Uploaded Successfully!`,
               key,
               duration: 2,
             });
             setPostObject({
               ...postObject,
               video_url: test.fileName,
               link_URL:test.file_url
 
             });
           } catch (error) {
             message.error({ content: `Error!`, key, duration: 2 });
           }
         }}
       >
         {postObject.link_URL ? (
           <img
             src={IMG}
             alt={IMG}
             className="img-fluid"
           />
         ) : (
           <div>
             {uploadLoading ? (
               <div>
                 <LoadingOutlined className="font-size-xxl text-primary" />
                 <div className="mt-3">Uploading</div>
               </div>
             ) : (
               <div>
                 <CustomIcon className="display-3" svg={ImageSvg} />
                 <p>Click or drag file to upload</p>
               </div>
             )}
           </div>
         )}

           {/* {postObject.image_URL ? (
           <img
             src={postObject.image_URL}
             alt="avatar"
             className="img-fluid"
           />
         ) : 
         (
           <div>
             {uploadLoading ? (
               <div>
                 <LoadingOutlined className="font-size-xxl text-primary" />
                 <div className="mt-3">Uploading</div>
               </div>
             ) : (
               <div>
                 <CustomIcon className="display-3" svg={ImageSvg} />
                 <p>Click or drag file to upload</p>
               </div>
             )}
           </div>
         )} */}
       </Dragger>
     </Card>
    
   </Col>  
   
  
 

     </Row>
     </>
  );
};

export default GeneralField;
