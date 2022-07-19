import { LoadingOutlined } from "@ant-design/icons";
import { Card, Col, Form, Input, message, Row, Select, Upload } from "antd";
import { ImageSvg } from "assets/svg/icon";
import service from "auth/FetchInterceptor";
import CustomIcon from "components/util-components/CustomIcon";
import { languageValidator } from "constants/helperFunctions";
import {ARABIC_alpha, ARABIC_NUMBER_CHAR, ENGLISH_ALPH, ENGLISH_Number_CHAR} from "constants/LanguagesConstent";
import React, { useState } from "react";

const { Dragger } = Upload;
const { Option } = Select;

const imageUploadProps = {
  name: "file",
  multiple: true,
  listType: "picture-card",
  showUploadList: false,
};

const GeneralField = ({
  postObject,
  setPostObject,
  serviceList,
  checkViewMode,
}) => {
  const uploadHandler = async (options, name) => {
    const key = "updatable";
    message.loading({ content: "Loading...", key, duration: 15 });

    const imageObject = { type: "Dress", file: options.file };
    const data = new FormData();
    try {
      for (const key of Object.keys(imageObject)) {
        data.append(key, imageObject[key]);
      }
      const test = await service.post(`/upload_media`, data);
      message.success({
        content: `${test.fileName} Uploaded Successfully!`,
        key,
        duration: 2,
      });
      if (name === "icon") {
        setPostObject({
          ...postObject,
          icon: test.file_url,
        });
      }
    } catch (error) {
      message.error({ content: `Error!`, key, duration: 2 });
    }
  };
  const [feildChecker, setFieldChecker] = useState({
    name_en: true,
    name_ar: true,
  });
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info" className="w-100 ">
          <Form.Item
            required
            name="name_ar"
            hasFeedback
            label="Detail Name in Arabic:"
            rules={[
              feildChecker.name_ar
                ? []
                : ({ getFieldValue }) => ({
                    validator(_, value) {
                      const checkValidation = languageValidator(
                        value.toLowerCase(),
                        // ARABIC_alpha
                          ARABIC_NUMBER_CHAR
                      );
                      if (checkValidation) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          "Please enter The Detail in Arabic"
                        );
                      }
                    },
                  }),
            ]}
          >
            <Input
              name="name_ar"
              disabled={checkViewMode}
              defaultValue={postObject?.name_ar}
              onPressEnter={(e) => e.preventDefault()}
              onChange={(e) => {
                setFieldChecker({ ...feildChecker, name_ar: false });

                setPostObject({ ...postObject, name_ar: e.target.value });
              }}
              placeholder="Please enter the Detail Name Arabic"
            />
          </Form.Item>
          <Form.Item
            required
            hasFeedback
            name="name_en"
            label="Detail Name in English:"
            rules={[
              feildChecker.name_en
                ? []
                : ({ getFieldValue }) => ({
                    validator(_, value) {
                      const checkValidation = languageValidator(
                        value.toLowerCase(),
                        // ENGLISH_ALPH
                          ENGLISH_Number_CHAR
                      );
                      if (checkValidation) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          "Please enter The Detail in English"
                        );
                      }
                    },
                  }),
            ]}
          >
            <Input
              name="name_en"
              defaultValue={postObject?.name_en}
              disabled={checkViewMode}
              onPressEnter={(e) => e.preventDefault()}
              onChange={(e) => {
                setFieldChecker({ ...feildChecker, name_en: false });

                setPostObject({ ...postObject, name_en: e.target.value });
              }}
              placeholder="Please enter the Detail Name English"
            />
          </Form.Item>
          <Form.Item
            name="service_id"
            required
            label={<span>Generic Details Type&nbsp;</span>}
          >
            <Select
              showSearch
              defaultValue={postObject?.generic_detail_type_id}
              disabled={checkViewMode}
              placeholder="Select The Type Name"
              optionFilterProp="children"
              onChange={(e) =>
                setPostObject({ ...postObject, generic_detail_type_id: e })
              }
              value={postObject?.generic_detail_type_id}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {serviceList?.map((element) => (
                <Option key={element.id} value={element.id}>
                  {element?.name_en}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Media">
          <Form.Item required label="Icon">
            <Dragger
              disabled={checkViewMode}
              name="icon"
              {...imageUploadProps}
              customRequest={(options) => uploadHandler(options, "icon")}
            >
              {postObject?.icon ? (
                <img
                  src={postObject?.icon}
                  alt="avatar"
                  className="img-fluid"
                />
              ) : (
                <div>
                  {postObject?.icon ? (
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
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
