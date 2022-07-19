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

 
};

const GeneralField = ({
  category,
  setPostObject,
  postObject,
  
  uploadLoading,


  

}) => {

  const [Products, setProducts] = useState([]);

 
  return (
    <Row gutter={24 }>
 <Col xs={24} sm={24} md={7}>
        <Card title="Eng Image" style={{ height: 365 }}>
          <Dragger
          
            {...imageUploadProps}
            beforeUpload={beforeUpload}
            customRequest={async (options) => {
              const key = "updatable";
              message.loading({ content: "Loading...", key, duration: 15 });

              const imageObject = { type: "Banners", file: options.file };
              const data = new FormData();
              try {
                for (const key of Object.keys(imageObject)) {
                  data.append(key, imageObject[key]);
                }
                const test = await service.post("/upload_media", data);
                message.success({
                  content: `${test.file_url} Uploaded Successfully!`,
                  key,
                  duration: 2,
                });
                setPostObject({
                  ...postObject,
                  eng_img: test.fileName,
                  eng_img_URL:test.file_url
    
                });
              } catch (error) {
                message.error({ content: `Error!`, key, duration: 2 });
              }
            }}
          >
            {postObject.eng_img_URL ? (
              <img
                src={postObject.eng_img_URL}
                alt="avatar"
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
          </Dragger>
        </Card>
       
      </Col>   
      <Col xs={24} sm={24} md={7}>
        <Card title="Arabic Image" style={{ height: 365 }}>
          <Dragger
            {...imageUploadProps}
            beforeUpload={beforeUpload}
            customRequest={async (options) => {
              const key = "updatable";
              message.loading({ content: "Loading...", key, duration: 15 });

              const imageObject = { type: "Banners", file: options.file };
              const data = new FormData();
              try {
                for (const key of Object.keys(imageObject)) {
                  data.append(key, imageObject[key]);
                }
                const test = await service.post("/upload_media", data);
                console.log(test)
                message.success({
                  content: `${test.file_url} Uploaded Successfully!`,
                  key,
                  duration: 2,
                });
                setPostObject({
                  ...postObject,
                  arb_img: test.fileName,
                  arb_img_URL:test.file_url
                });
              } catch (error) {
                message.error({ content: `Error!`, key, duration: 2 });
              }
            }}
          >
            {postObject.arb_img_URL ? (
              <img
                src={postObject.arb_img_URL}
                alt="avatar"
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
          </Dragger>
        </Card>
       
      </Col>  
        </Row>
  );
};

export default GeneralField;
