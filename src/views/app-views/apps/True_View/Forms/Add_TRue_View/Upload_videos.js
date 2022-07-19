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
import IMG from '../../../../../../../src/Capture.PNG'
import PlayCircleOutlined from "@ant-design/icons";
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
  
  uploadLoading,


  

}) => {

  const [Products, setProducts] = useState([]);


  return (
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
                  link: test.fileName,
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
 <Col xs={24} sm={24} md={7}>
        <Card title="Thumbnail Image" style={{ height: 365 }}>
          <Dragger
          
            {...imageUploadProps}
            beforeUpload={beforeUpload}
            customRequest={async (options) => {
              const key = "updatable";
              message.loading({ content: "Loading...", key, duration: 180 });

              const imageObject = { type: "Videos", file: options.file };
              const data = new FormData();
              try {
                for (const key of Object.keys(imageObject)) {
                  data.append(key, imageObject[key]);
                }
                const test = await service.post("/upload_media", data);
                message.success({
                  content: ` Uploaded Successfully!`,
                  key,
                  duration: 2,
                });
                setPostObject({
                  ...postObject,
                  image: test.fileName,
                  image_URL:test.file_url
    
                });
              } catch (error) {
                message.error({ content: `Error!`, key, duration: 2 });
              }
            }}
          >
            {postObject.image_URL ? (
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
            )}
          </Dragger>
        </Card>
      </Col>   
     
    

        </Row>
  );
};

export default GeneralField;
