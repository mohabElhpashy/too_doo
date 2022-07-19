import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Upload,
  Modal,
  Button,
  DatePicker,
  Tabs
} from "antd";
import moment from 'moment';

import { ImageSvg } from "assets/svg/icon";
import service from "auth/FetchInterceptor";
import CustomIcon from "components/util-components/CustomIcon";
import { languageValidator, numberValidator } from "constants/helperFunctions";
import {
  ARABIC_alpha,
  ENGLISH_ALPH,
  NUMBER_CONSTANTS,
} from "constants/LanguagesConstent";
import Product from './MY_products'
import { useFetch } from "hooks";
import { lowerCase } from "lodash";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const { Dragger } = Upload;
const { Option } = Select;

const imageUploadProps = {
  name: "file",
  multiple: true,
  listType: "picture-card",
  showUploadList: false,
};

const GeneralField = (props) => {
  const { TabPane } = Tabs;

  const dateFormat = 'YYYY/MM/DD';

  const [test, setTest] = useState([]);
  const [singleImage, setSingleImage] = useState("");
  //Upload Seaction
  const filteredTags = props?.tagsList?.filter(
    (element) => element.service_id === 1
  );
  // useEffect(() => {
  //   const test1 = props.postObject?.images?.map((element) => {
  //     let newObj = {};
  //     newObj["url"] = element.image;
  //     newObj["id"] = element.id;
  //     return newObj;
  //   });
  //   setTest(test1);
  // }, [props.postObject.images]);
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
    const data = new FormData();
    try {
      for (const key of Object.keys(imageObject)) {
        data.append(key, imageObject[key]);
      }
      const uploadResponse = await service.post("/upload_media", data);
      message.success({
        content: `${uploadResponse.fileName} Uploaded Successfully!`,
        key,
        duration: 2,
      });
      if (name === "main_image") {
        props.setPostObject({
          ...props.postObject,
          main_image: uploadResponse.fileName,
          custom_image: uploadResponse.file_url,
        });
      } else {
        props.setPostObject({
          ...props.postObject,
          images: [
            ...props.postObject.images,
            {
              id: Math.floor(Math.random() * 10000),
              image: uploadResponse.file_url,
            },
          ],
        });
      }
    } catch (error) {
      message.error({ content: ` Error!`, key, duration: 2 });
    }
  };
  const [feildChecker, setFieldChecker] = useState({
    name_en: true,
    name_ar: true,
    description_ar: true,
    description_en: true,
    no_of_seats: true,
  });
  return (
    <Row gutter={16}>
      {props.checkView?
      <>
       <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item
            required
            hasFeedback
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            name="name_ar"
            label="Product Name Ar"
            rules={[
              feildChecker.name_ar
                ? []
                : ({ getFieldValue }) => ({
                    validator(_, value) {
                      const checkValidation = languageValidator(
                        value,
                        ARABIC_alpha
                      );
                      if (checkValidation) {
                        props.setButtonChecker(true);
                        return Promise.resolve();
                      } else {
                        props.setButtonChecker(false);
                        return Promise.reject(
                          "Please enter The Name in Arabic"
                        );
                      }
                    },
                  }),
            ]}
          >
            <Input
              name="name_ar"
              disabled={props.checkView}
              defaultValue={props.postObject.product_name_ar}
              onPressEnter={(e) => e.preventDefault()}
              onChange={(event) => {
                setFieldChecker({ ...feildChecker, name_ar: false });
                props.setPostObject({
                  ...props.postObject,
                  name_ar: event.target.value,
                });
              }}
              placeholder="Please enter Product Name in Arabic"
            />
          </Form.Item>

          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
            }}
            hasFeedback
            required
            name="name_en"
            label="Product Name En"
            rules={[
              feildChecker.name_en
                ? []
                : ({ getFieldValue }) => ({
                    validator(_, value) {
                      const checkValidation = languageValidator(
                        lowerCase(value),
                        ENGLISH_ALPH
                      );
                      if (checkValidation) {
                        props.setButtonChecker(true);
                        return Promise.resolve();
                      } else {
                        props.setButtonChecker(false);
                        return Promise.reject(
                          "Please enter The Name in English"
                        );
                      }
                    },
                  }),
            ]}
          >
            <Input
              name="name_en"
              disabled={props.checkView}
              onPressEnter={(e) => e.preventDefault()}
              defaultValue={props.postObject.product_name_en}
              onChange={(event) => {
                setFieldChecker({ ...feildChecker, name_en: false });
                props.setPostObject({
                  ...props.postObject,
                  name_en: event.target.value,
                });
              }}
              placeholder="Please enter Product Name in English"
            />
          </Form.Item>

          <Form.Item
            required
            hasFeedback
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            name="name_ar"
            label="service Name"
            rules={[
              feildChecker.name_ar
                ? []
                : ({ getFieldValue }) => ({
                    validator(_, value) {
                      const checkValidation = languageValidator(
                        value,
                        ARABIC_alpha
                      );
                      if (checkValidation) {
                        props.setButtonChecker(true);
                        return Promise.resolve();
                      } else {
                        props.setButtonChecker(false);
                        return Promise.reject(
                          "Please enter The Name in Arabic"
                        );
                      }
                    },
                  }),
            ]}
          >
            <Input
              name="name_ar"
              disabled={props.checkView}
              defaultValue={props.postObject.service_name}
              onPressEnter={(e) => e.preventDefault()}
              onChange={(event) => {
                setFieldChecker({ ...feildChecker, name_ar: false });
                props.setPostObject({
                  ...props.postObject,
                  name_ar: event.target.value,
                });
              }}
              placeholder="Please enter Product Name in Arabic"
            />
          </Form.Item>

          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
            }}
            hasFeedback
            required
            name="name_en"
            label="Store Name"
            rules={[
              feildChecker.name_en
                ? []
                : ({ getFieldValue }) => ({
                    validator(_, value) {
                      const checkValidation = languageValidator(
                        lowerCase(value),
                        ENGLISH_ALPH
                      );
                      if (checkValidation) {
                        props.setButtonChecker(true);
                        return Promise.resolve();
                      } else {
                        props.setButtonChecker(false);
                        return Promise.reject(
                          "Please enter The Name in English"
                        );
                      }
                    },
                  }),
            ]}
          >
            <Input
              name="name_en"
              disabled={props.checkView}
              onPressEnter={(e) => e.preventDefault()}
              defaultValue={props.postObject.store}
              onChange={(event) => {
                setFieldChecker({ ...feildChecker, name_en: false });
                props.setPostObject({
                  ...props.postObject,
                  name_en: event.target.value,
                });
              }}
              placeholder="Please enter Product Name in English"
            />
          </Form.Item>


          
          
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Thumbnail Image">
          <Form.Item required label="Main Image">
            <Dragger
              disabled={props.checkView}
              name="main_image"
              {...imageUploadProps}
              customRequest={(options) => uploadHandler(options, "main_image")}
            >
              { props.postObject.thumbnail_image ? (
                <img
                  src={
                    props.postObject.thumbnail_image
                      ? props.postObject.thumbnail_image
                      : props.postObject.thumbnail_image
                  }
                  alt="avatar"
                  className="img-fluid"
                />
              ) : (
                <div>
                  {props.postObject.thumbnail_image ? (
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
       
      </Col>
      </>:<></>
  }
     
    </Row>
  );
};

export default GeneralField;
