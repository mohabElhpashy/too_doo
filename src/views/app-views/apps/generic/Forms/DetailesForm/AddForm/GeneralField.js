import { LoadingOutlined } from "@ant-design/icons";
import { Card, Col, Form, Input, message, Row, Select, Upload } from "antd";
import { ImageSvg } from "assets/svg/icon";
import service from "auth/FetchInterceptor";
import CustomIcon from "components/util-components/CustomIcon";
import { API_URL } from "configs/EnvironmentConfig";
import { languageValidator } from "constants/helperFunctions";
import { ARABIC_alpha, ENGLISH_ALPH } from "constants/LanguagesConstent";
import React from "react";

const { Dragger } = Upload;
const { Option } = Select;

const rules = {
  name: [
    {
      required: true,
      message: "Please enter product name",
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
};
const imageUploadProps = {
  name: "file",
  multiple: true,
  listType: "picture-card",
  showUploadList: false,
};

const GeneralField = ({ postObject, setPostObject, services }) => {
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
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const checkValidation = languageValidator(
                    value.toLowerCase(),
                    ARABIC_alpha
                  );
                  if (checkValidation) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("Please enter The Detail in Arabic");
                  }
                },
              }),
            ]}
          >
            <Input
              name="name_ar"
              onPressEnter={(e) => e.preventDefault()}
              onChange={(e) =>
                setPostObject({ ...postObject, name_ar: e.target.value })
              }
              placeholder="Please enter the Detail Name Arabic"
            />
          </Form.Item>
          <Form.Item
            required
            name="name_en"
            hasFeedback
            label="Detail Name in English:"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const checkValidation = languageValidator(
                    value.toLowerCase(),
                    ENGLISH_ALPH
                  );
                  if (checkValidation) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("Please enter The Detail in English");
                  }
                },
              }),
            ]}
          >
            <Input
              name="name_en"
              onPressEnter={(e) => e.preventDefault()}
              onChange={(e) =>
                setPostObject({ ...postObject, name_en: e.target.value })
              }
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
              placeholder="Select The Type Name"
              optionFilterProp="children"
              onChange={(e) =>
                setPostObject({ ...postObject, generic_detail_type_id: e })
              }
              value={postObject.generic_detail_type_id}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {services?.map((element) => (
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
              name="icon"
              {...imageUploadProps}
              customRequest={(options) => uploadHandler(options, "icon")}
            >
              {postObject.icon ? (
                <img src={postObject.icon} alt="avatar" className="img-fluid" />
              ) : (
                <div>
                  {postObject.icon ? (
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
