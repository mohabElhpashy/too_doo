import React from "react";
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
} from "antd";
import { ImageSvg } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import service from "auth/FetchInterceptor";
import { useRef } from "react";
import { languageValidator } from "constants/helperFunctions";
import { ARABIC_alpha, ENGLISH_ALPH } from "constants/LanguagesConstent";

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

const GeneralField = (props) => {
  //Upload Seaction

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const uploadHandler = async (options, name) => {
    const key = "updatable";
    message.loading({ content: "Loading...", key, duration: 15 });

    const imageObject = { type: "Hotel", file: options.file };
    const data = new FormData();
    try {
      for (const key of Object.keys(imageObject)) {
        data.append(key, imageObject[key]);
      }
      const test = await service.post("/upload_media", data);
      message.success({
        content: `${test.file_name} Uploaded Successfully!`,
        key,
        duration: 2,
      });
      if (name === "main_image") {
        props.setPostObject({
          ...props.postObject,
          main_image: test.file_url,
        });
      } else {
        props.setPostObject({
          ...props.postObject,
          subImages: [...props.postObject.subImages, test.file_url],
        });
      }
    } catch (error) {
      message.error({ content: `${test.file_name} Error!`, key, duration: 2 });
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
            rules={[
              {
                whitespace: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const checkValidation = languageValidator(
                    value.toLowerCase(),
                    ARABIC_alpha
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
            // rules={rules.name_en}
            rules={[
              {
                whitespace: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const checkValidation = languageValidator(
                    value.toLowerCase(),
                    ENGLISH_ALPH
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
            rules={rules.description_ar}
          >
            <Input.TextArea
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
            onChange={(event) =>
              props.setPostObject({
                ...props.postObject,
                description_en: event.target.value,
              })
            }
            label="Description in English"
            rules={rules.description_en}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item name="price" label="Price" rules={rules.price}>
            <Input
              onChange={(event) =>
                props.setPostObject({
                  ...props.postObject,
                  price: event.target.value,
                })
              }
              addonAfter="EGP"
              onPressEnter={(e) => e.preventDefault()}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item
            name="hotel_id"
            required
            label={<span>Hotel Name&nbsp;</span>}
          >
            <Select
              showSearch
              placeholder="Select a Hotel Name"
              optionFilterProp="children"
              onChange={(e) =>
                props.setPostObject({ ...props.postObject, hotel_id: e })
              }
              value={props.postObject.hotel_id}
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
              {props.postObject.main_image ? (
                <img
                  src={props.postObject.main_image}
                  alt="avatar"
                  className="img-fluid"
                />
              ) : (
                <div>
                  {props.postObject.main_image ? (
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
              onRemove={(t) =>
                props.postObject.subImages.filter((element) => element !== t)
              }
              customRequest={(options) => uploadHandler(options, "subImages")}
              listType="picture-card"
            >
              {props.postObject.subImages.length >= 4 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Card>
        <Card title="Organization">
          <Form.Item name="options" label="Options">
            <Select
              optionFilterProp="children"
              onChange={(e) =>
                props.setPostObject({ ...props.postObject, options: e })
              }
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Options"
            >
              {props.gerericOptionsList?.map((elm) => (
                <Option value={elm.id} key={elm.id}>
                  {elm.title_en}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="tags" label="Tags">
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
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Tags"
            >
              {props.tagsList?.map((elm) => (
                <Option value={elm.id} key={elm.id}>
                  {elm.name_en}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
