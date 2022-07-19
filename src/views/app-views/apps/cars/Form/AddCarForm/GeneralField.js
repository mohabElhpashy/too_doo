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
  Checkbox 
} from "antd";
import { ImageSvg } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import service from "auth/FetchInterceptor";
import IMG from '../../../../../../../src/Capture.PNG'

import {
  ARABIC_alpha,
  ARABIC_NUMBER_CHAR,
  ENGLISH_ALPH,
  ENGLISH_Number_CHAR,
  NUMBER_CONSTANTS,
} from "constants/LanguagesConstent";
import { languageValidator, numberValidator } from "constants/helperFunctions";

const { Dragger } = Upload;
const { Option } = Select;
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

const GeneralField = (props) => {
  // const imgList = React.useMemo(() => (props.postObject.subImages.map((element, index) => ({ uid: index, url: element, name: 'image.png' }))))

  const [test, setTest] = useState([]);
  const [singleImage, setSingleImage] = useState("");
  const filteredTags = props?.tagsList?.filter(
    (element) => element.service_id === 1
  );
  //Upload Seaction
  // const  required=() =>
  // {
  //   if (props.postObject.name_ar.length == 0)
  //    { 
  //       // alert("message");  	
  //       return false; 
  //    }  	
  //    return true; 
  //  } 
  const onChange=(e)=> {
    console.log(`checked = ${e.target.checked}`);
    props.setPostObject({
      ...props.postObject,
      true_view:e.target.checked
    });
  }
  const imagehandelchnge=async(e)=>{
    let x=[];

// console.log("files",options.file)
if(e.target.files){
  const fileArray=Array.from(e.target.files)
   
   console.log("fileArray",fileArray)
   let i =0;
   while (  i < fileArray.length){

    const imageObject = { type: "Car", file: fileArray[i] };
    console.log("imageObject",imageObject)  
 
    const data = new FormData();
    try {
     for (const key of Object.keys(imageObject)) {
 
       console.log("imageObject[key]",imageObject[key])
       data.append(key, imageObject[key]);
     }
     const test = await service.post("/upload_media", data);
     message.success({
       content: `${test.fileName} Uploaded Successfully!`,
       // key,
       duration: 2,
       
     });
     x.push({image:test.file_url, 
      id: Math.floor(Math.random() * 10000),
     })
 
       i++
    } 
    catch (error) {
     // message.error({ content: ` Error!`, key, duration: 2 });
   }
   }
   
   props.setPostObject({
    ...props.postObject,
    images: x,
  });
  
}

  }
  console.log("props.postObject",props.postObject)
  useEffect(() => {
    // required()
    const test1 = props.postObject?.images?.map((element) => {
      let newObj = {};
      newObj["url"] = element.image;
      newObj["id"] = element.id;
      return newObj;
    });
    setTest(test1);
  }, [props.postObject.images]);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const uploadHandler = async (options, name) => {
    const key = "updatable";
    message.loading({ content: "Loading...", key, duration: 15 });

    const imageObject = { type: "Car", file: options.file };
    console.log("image ob=>>>>>>>>",imageObject)
    const data = new FormData();
    try {
      for (const key of Object.keys(imageObject)) {
        data.append(key, imageObject[key]);
        console.log("data.append(key, imageObject[key])",key,imageObject[key] )
      }
      const test = await service.post("/upload_media", data);
      message.success({
        content: `${test.fileName} Uploaded Successfully!`,
        key,
        duration: 2,
      });
      if (name === "main_image") {
        props.setPostObject({
          ...props.postObject,
          main_image: test.fileName,
          preview_image: test.file_url,
        });
      } else {
        props.setPostObject({
          ...props.postObject,
          images: [
            ...props.postObject.images,
            { 
              id: Math.floor(Math.random() * 10000),
              image: test.file_url,
            },
          ],
        });
      }
    } catch (error) {
      message.error({ content: ` Error!`, key, duration: 2 });
    }
  };
  return (
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
              name="name_ar"
              onPressEnter={(e) => e.preventDefault()}
              onChange={(event) =>
                props.setPostObject({
                  ...props.postObject,
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
              onPressEnter={(e) => e.preventDefault()}
              onChange={(event) =>
                props.setPostObject({
                  ...props.postObject,
                  name_en: event.target.value,
                })
              }
              placeholder="Please enter Product Name in English"
            />
          </Form.Item>

          <Form.Item
            required
            name="description_ar"
            label="Description in Arabic"
            // rules={[
            //   {
            //     whitespace: true,
            //   },
            //   ({ getFieldValue }) => ({
            //     validator(_, value) {
            //       const checkValidation = languageValidator(
            //         value.toLowerCase(),
            //         ARABIC_NUMBER_CHAR
            //       );
            //       if (checkValidation) {
            //         return Promise.resolve();
            //       } else {
            //         return Promise.reject(
            //           "Please enter The Description in Arabic"
            //         );
            //       }
            //     },
            //   }),
            // ]}
          >
            <Input.TextArea
              placeholder="Enter the Description in Arabic"
              onChange={(event) =>
                props.setPostObject({
                  ...props.postObject,
                  description_ar: event.target.value,
                })
              }
              rows={4}
            />
          </Form.Item>

          <Form.Item
            required
            name="description_en"
            label="Description in English"
            // rules={[
            //   ({ getFieldValue }) => ({
            //     validator(_, value) {
            //       const checkValidation = languageValidator(
            //         value.toLowerCase(),
            //         ENGLISH_Number_CHAR
            //       );
            //       if (checkValidation) {
            //         return Promise.resolve();
            //       } else {
            //         return Promise.reject(
            //           "Please enter The Description in English"
            //         );
            //       }
            //     },
            //   }),
            // ]}
          >
            <Input.TextArea
              placeholder="Enter the Description in English"
              onChange={(event) =>
                props.setPostObject({
                  ...props.postObject,
                  description_en: event.target.value,
                })
              }
              rows={4}
            />
          </Form.Item>

          <Form.Item
            name="agency_id"
            required
            label={<span>Car Agancy&nbsp;</span>}
          >
            <Select
              showSearch
              placeholder="Select a Car Agancy Name"
              optionFilterProp="children"
              disabled={props.storeIdProp ? true : false}
              defaultValue={props.storeIdProp && parseInt(props.storeIdProp)}
              onChange={(e) =>
                props.setPostObject({ ...props.postObject, agency_id: e })
              }
              value={props.postObject.agency_id}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {props.services?.map((element) => (
                <Option value={element.id}>{element?.name_en}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            required
            label="Number of Seats"
            name="no_of_seats "
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!numberValidator(value, NUMBER_CONSTANTS)) {
                    return Promise.reject("Your Cant include Charcters");
                  } else {
                    return Promise.resolve();
                  }
                },
              }),
            ]}
            className="w-100"
          >
            <Input
              name="no_of_seats"
              placeholder="Enter Number of Seats "
              addonAfter="Seats"
              onChange={(e) => {
                props.setPostObject({
                  ...props.postObject,
                  no_of_seats: e.target.value,
                });
              }}
              className="w-100"
            />
          </Form.Item>
          <Form.Item required name="tags" label="Tags">
            <Select
              optionFilterProp="children"
              onChange={(e) =>
                props.setPostObject({ ...props.postObject, tags: e })
              }
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please Select Your Tags"
            >
              {filteredTags?.map((elm) => (
                <Option value={elm.id} key={elm.id}>
                  {elm.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {/* <Form.Item
            required
            label="Captian"
            name="with_captain "
            valuePropName="checked"
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
          >
            <Button
              type="primary"
              size="small"
              onClick={() => {
                props.setPostObject({
                  ...props.postObject,
                  with_captain: !props.postObject.with_captain,
                });
              }}
            >
              {props?.postObject?.with_captain
                ? "With Captian"
                : "Without Captian"}
            </Button>
          </Form.Item>
          <Form.Item
            required
            label="Decoration"
            name="with_decoration  "
            valuePropName="checked"
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
            }}
          >
            <Button
              type="primary"
              size="small"
              onClick={() => {
                props.setPostObject({
                  ...props.postObject,
                  with_decoration: !props.postObject.with_decoration,
                });
              }}
            >
              {props?.postObject?.with_decoration
                ? "With Decoration"
                : "Without Decoration"}
            </Button>
          </Form.Item> */}
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Media">
          <Form.Item required label="Main Image">
            <Dragger
              name="main_image"
              {...imageUploadProps}
              customRequest={(options) => uploadHandler(options, "main_image")}
            >
              {props.postObject.preview_image ? (
                <img
                  src={props.postObject.preview_image}
                  alt="avatar"
                  className="img-fluid"
                />
              ) : (
                <div>
                  {props.postObject.preview_image ? (
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
          <Form.Item required label="Sub Images">
            <Upload 
            multiple
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
              customRequest={(options) => imagehandelchnge(options, "images")}
              listType="picture-card"
            >
              {/* {props.postObject?.images?.length >= 80 ? null : uploadButton} */}
            </Upload>
            <div style={{display:"flex"}}>
            <input style={{position:"relative",zIndex:2,opacity: 0,
    width: "64px",
    height: "44px",cursor:"pointer"}} type="file" multiple onChange={imagehandelchnge}/>
                 <Button style={{position:"absolute",zIndex:1}}>
                 <PlusOutlined  /> 

                 </Button>
            </div>
          </Form.Item>
          <Form.Item required label="Main Video">
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
               message.success({
                content: `Uploaded Successfully!`,
                key,
                duration: 2,
              });
              props.setPostObject({
                ...props.postObject,
                video_link: test.fileName,
                video_link_URL:test.file_url
  
              });
            } catch (error) {
              message.error({ content: `Error!`, key, duration: 2 });
            }
          }}
        >
          {props.postObject.video_link_URL ? (
            <img
              src={IMG}
              alt={IMG}
              className="img-fluid"
            />
          ) : (
            <div>
              {props.uploadLoading ? (
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
          </Form.Item>
          <Form.Item ><Checkbox style={{textDecoration: "underline"}} onChange={onChange}>show video In True View</Checkbox></Form.Item> 
          <Form.Item required label="Thumbnail Image">
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
              props.setPostObject({
                ...props.postObject,
                thumbnail_image: test.fileName,
                image_URL:test.file_url
  
              });
            } catch (error) {
              message.error({ content: `Error!`, key, duration: 2 });
            }
          }}
        >
          {props.postObject.image_URL ? (
            <img
              src={props.postObject.image_URL}
              alt="avatar"
              className="img-fluid"
            />
          ) : 
          (
            <div>
              {props.uploadLoading ? (
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
        {/* <Card title="Organization">
          <Form.Item name="details" label="Details">
            <Select
              optionFilterProp="children"
              onChange={(e) =>
                props.setPostObject({ ...props.postObject, details: e })
              }
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              style={{ width: "100%" }}
              placeholder="Please Select a Detail"
            >
              {props.gerericDetailesList?.map((elm) => (
                <Option value={elm.id} key={elm.id}>
                  {elm.name_en}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
        </Card> */}
      </Col>
    </Row>
  );
};

export default GeneralField;
