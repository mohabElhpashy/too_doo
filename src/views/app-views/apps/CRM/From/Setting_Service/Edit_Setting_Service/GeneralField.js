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
  setPostObject,
   checkView,

  postObject,
  

  

}) => {

 
  const [singleImage, setSingleImage] = useState("");

 console.log("postObject",postObject)
 
 

const uploadHandler = async (options, name) => {
  const key = "updatable";
  message.loading({ content: "Loading...", key, duration: 15 });

  const imageObject = { type: "Car", file: options.file };
  const data = new FormData();
  try {
    for (const key of Object.keys(imageObject)) {
      data.append(key, imageObject[key]);
    }
    const test = await service.post("/upload_media", data);
    message.success({
      content: `${test.fileName} Uploaded Successfully!`,
      key,
      duration: 2,
    });
    if (name === "main_image") {
       setPostObject({
         ...postObject,
         icon: test.fileName,
         iconsURL: test.file_url,
      });
    }
    // else {
    //   props.setPostObject({
    //     ...props.postObject,
    //     images: [
    //       ...props.postObject.images,
    //       {
    //         id: Math.floor(Math.random() * 10000),
    //         image: test.file_url,
    //       },
    //     ],
    //   });
    // }
  } catch (error) {
    message.error({ content: ` Error!`, key, duration: 2 });
  }
};
 
  
 
   return (
     <>
    <Row gutter={16}>
       <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item
            required
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            name="name_ar"
            label="Name in Arabic"
            hasFeedback
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const checkValidation = languageValidator(
                    value.toLowerCase(),
                    ARABIC_NUMBER_CHAR
                  );
                  if (checkValidation) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("Please enter The Name in Arabic");
                  }
                },
              }),
            ]}
          >
            <Input
       disabled={checkView}
       defaultValue={postObject.name_ar}

              name="name_ar"
              onPressEnter={(e) => e.preventDefault()}
              onChange={(event) =>
                setPostObject({
                   ...postObject,
                  name_ar: event.target.value,
                })
              }
              placeholder="Please enter Product Name in Arabic"
            />
          </Form.Item>

          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
            }}
            required
            name="name_en"
            label="Name in English"
            hasFeedback
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const checkValidation = languageValidator(
                    value.toLowerCase(),
                    ENGLISH_Number_CHAR
                  );
                  if (checkValidation) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("Please enter The Name in English");
                  }
                },
              }),
            ]}
          >
            <Input
            defaultValue={postObject.name_en}
            disabled={checkView}
              onPressEnter={(e) => e.preventDefault()}
              onChange={(event) =>
                setPostObject({
                   ...postObject,
                   name_en: event.target.value,
                })
              }
              placeholder="Please enter Product Name in English"
            />
          </Form.Item>


     
          </Card>

      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Media">
          <Form.Item required label="Main Image">
            <Dragger
                        disabled={checkView}

              name="main_image"
              {...imageUploadProps}
              customRequest={(options) => uploadHandler(options, "main_image")}
            >
              {postObject.iconsURL ? (
                <img
                  src={postObject.iconsURL}
                  alt="avatar"
                  className="img-fluid"
                />
              ) : (
                <div>
                  { postObject.iconsURL ? (
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
          </Form.Item>
          {/* <Form.Item required label="Sub Images">
            <Upload 
              disabled={props.checkView}
              // fileList={props?.postObject?.images}
              fileList={test}
              onPreview={(t) => setSingleImage(t.url)}
              onRemove={(t) => {
                props.setPostObject({
                  ...props.postObject,
                  images: props?.postObject?.images?.filter(
                    (element) => element.id !== t.id
                  ),
                });
              }}
              customRequest={(options) => uploadHandler(options, "images")}
              listType="picture-card"
            >
              {props.postObject?.images?.length >= 80 ? null : uploadButton}
            </Upload>
          </Form.Item> */}

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
        </Card>
     
      </Col>
      </Row>
      
     </>
  );
};

export default GeneralField;
