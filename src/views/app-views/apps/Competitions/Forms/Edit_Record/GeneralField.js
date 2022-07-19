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
  DatePicker
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
  const dateFormat = 'YYYY/MM/DD';

  const [test, setTest] = useState([]);
  const [singleImage, setSingleImage] = useState("");
  //Upload Seaction
  const filteredTags = props?.tagsList?.filter(
    (element) => element.service_id === 1
  );
  useEffect(() => {
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
            label="Name in Arabic"
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
              defaultValue={props.postObject.name_ar}
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
            label="Name in English"
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
              defaultValue={props.postObject.name_en}
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
            name="description_ar"
            label="Description in Arabic"
            // rules={[
            //   feildChecker.description_ar
            //     ? []
            //     : ({ getFieldValue }) => ({
            //         validator(_, value) {
            //           const checkValidation = languageValidator(
            //             value,
            //             ARABIC_alpha
            //           );
            //           if (checkValidation) {
            //             props.setButtonChecker(true);
            //             return Promise.resolve();
            //           } else {
            //             props.setButtonChecker(false);
            //             return Promise.reject(
            //               "Please enter The Description in Arabic"
            //             );
            //           }
            //         },
            //       }),
            // ]}
          >
            <Input.TextArea
              name="description_ar"
              disabled={props.checkView}
              placeholder="Enter the Description in Arabic"
              defaultValue={props.postObject.description_ar}
              onChange={(event) => {
                setFieldChecker({ ...feildChecker, description_ar: false });
                props.setPostObject({
                  ...props.postObject,
                  description_ar: event.target.value,
                });
              }}
              rows={4}
            />
          </Form.Item>

          <Form.Item
            required
            hasFeedback
            name="description_en"
            label="Description in English"
            // rules={[
            //   feildChecker.description_en
            //     ? []
            //     : ({ getFieldValue }) => ({
            //         validator(_, value) {
            //           const checkValidation = languageValidator(
            //             lowerCase(value),
            //             ENGLISH_ALPH
            //           );
            //           if (checkValidation) {
            //             props.setButtonChecker(true);
            //             return Promise.resolve();
            //           } else {
            //             props.setButtonChecker(false);
            //             return Promise.reject(
            //               "Please enter The Description in English"
            //             );
            //           }
            //         },
            //       }),
            // ]}
          >
            <Input.TextArea
              name="description_en"
              disabled={props.checkView}
              placeholder="Enter the Description in English"
              defaultValue={props.postObject.description_en}
              onChange={(event) => {
                setFieldChecker({ ...feildChecker, description_en: false });
                props.setPostObject({
                  ...props.postObject,
                  description_en: event.target.value,
                });
              }}
              rows={4}
            />
          </Form.Item>

           

          
          <Form.Item name="tags" required label="Type">
            <Select
              optionFilterProp="children"
              disabled={props.checkView}
              defaultValue={props?.postObject?.type}
              onChange={(e) =>
                props.setPostObject({
                  ...props.postObject,
                  tags: e,
                })
              }
              mode="multiple"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              style={{ width: "100%" }}
              placeholder="Please Select a Tag"
            >
              {filteredTags?.map((elm) => (
                <Option value={elm.id} key={elm.id}>
                  {elm.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            required
            name="open_at"
            label="Start Date"
            // rules={rules.price}
          >
             <DatePicker 
             defaultValue={moment(props?.postObject?.start_date, dateFormat)} 
             disabled
             format={dateFormat}
             placeholder="Select Time"
             className="w-100"
 
              />

          </Form.Item>
          <Form.Item
          style={{ display: "inline-block", width: "calc(50% - 5px)" }}
          name="end_date"
          label="End Date"
          required
          // rules={rules.comparePrice}
          // name={[field.id, "End_Date"]}
          // fieldKey={[field.Status, "End_Date"]}
          required
        >
 
            <DatePicker 
              disabled
             defaultValue={moment(props?.postObject?.end_date, dateFormat)} 
             format={dateFormat}
             placeholder="Select Time"
             className="w-100"
 
              />
         </Form.Item>
        </Card>
      </Col>
     
    </Row>
  );
};

export default GeneralField;
