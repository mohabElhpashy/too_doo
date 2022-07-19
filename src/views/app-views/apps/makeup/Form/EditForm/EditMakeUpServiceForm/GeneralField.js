import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import { ImageSvg } from "assets/svg/icon";
import service from "auth/FetchInterceptor";
import CustomIcon from "components/util-components/CustomIcon";
import { languageValidator, numberValidator } from "constants/helperFunctions";
import IMG from '../../../../../../../../src/Capture.PNG'

import {
  ARABIC_alpha,
  ENGLISH_ALPH,
  NUMBER_CONSTANTS,
} from "constants/LanguagesConstent";
import { lowerCase } from "lodash";
import React, { useEffect, useState } from "react";

const { Dragger } = Upload;
const { Option } = Select;

const imageUploadProps = {
  name: "file",
  multiple: true,
  listType: "picture-card",
  showUploadList: false,
};

const GeneralField = (props) => {
  const [test, setTest] = useState([]);
  const [singleImage, setSingleImage] = useState("");

  // const imgList = React.useMemo(() => (props.postObject.images.map((element,index)=> ({ uid:index,url:element ,name:'image.png'}) )))
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
  //Upload Seaction
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
  const filteredTags = props?.tagsList?.filter(
    (element) => element.service_id === 8
  );
  const uploadHandler = async (options, name) => {
    const key = "updatable";
    message.loading({ content: "Loading...", key, duration: 15 });

    const imageObject = { type: "Makeup", file: options.file };
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
      message.error({ content: `Error!`, key, duration: 2 });
    }
  };
  const [feildChecker, setFeildChecker] = useState({
    name_en: true,
    name_ar: true,
    description_ar: true,
    description_en: true,
    price: true,
    down_payment_value: true,
  });
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
                setFeildChecker({ ...feildChecker, name_ar: false });
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
              defaultValue={props.postObject.name_en}
              onPressEnter={(e) => e.preventDefault()}
              onChange={(event) => {
                setFeildChecker({ ...feildChecker, name_en: false });
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
              defaultValue={props.postObject.description_ar}
              placeholder="Enter the Description in Arabic"
              onChange={(event) => {
                setFeildChecker({ ...feildChecker, description_ar: false });
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
              defaultValue={props.postObject.description_en}
              placeholder="Enter the Description in English"
              onChange={(event) => {
                setFeildChecker({ ...feildChecker, description_en: false });
                props.setPostObject({
                  ...props.postObject,
                  description_en: event.target.value,
                });
              }}
              rows={4}
            />
          </Form.Item>

          <Form.Item
            required
            label="Price"
            name="price"
            rules={[
              feildChecker.price
                ? []
                : ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!numberValidator(value, NUMBER_CONSTANTS)) {
                        props.setButtonChecker(false);
                        return Promise.reject("Your Cant include Charcters");
                      } else {
                        props.setButtonChecker(true);

                        return Promise.resolve();
                      }
                    },
                  }),
            ]}
            className="w-100"
          >
            <Input
              name="price"
              placeholder="Enter the Price"
              addonAfter="EGP"
              disabled={props.checkView}
              defaultValue={props.postObject?.price}
              onChange={(e) => {
                setFeildChecker({ ...feildChecker, price: false });
                props.setPostObject({
                  ...props.postObject,
                  price: e.target.value,
                });
              }}
              className="w-100"
            />
          </Form.Item>
          {/* <Form.Item required label="Veil" name="Veil" valuePropName="checked">
            <Button
              type="primary"
              size="small"
              disabled={props.checkView}
              onClick={() => {
                props.setPostObject({
                  ...props.postObject,
                  with_veil: !props.postObject.with_veil,
                });
              }}
            >
              {props?.postObject?.with_veil ? "With Veil" : "Without Viel"}
            </Button>
          </Form.Item> */}
          <Form.Item
            name="makeup_id"
            required
            label={<span>Make Up &nbsp;</span>}
          >
            <Select
              showSearch
              defaultValue={props.postObject.makeup_name_en}
              disabled={props.checkView}
              placeholder="Select a Service"
              optionFilterProp="children"
              onChange={(e) =>
                props.setPostObject({ ...props.postObject, makeup_id: e })
              }
              value={props.postObject.makeup_id}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {props.services?.map((element) => (
                <Option key={element.id} value={element.id}>
                  {element?.name_en}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Down Payment"
            name="down_payment_value"
            rules={[
              feildChecker.down_payment_value
                ? []
                : ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!numberValidator(value, NUMBER_CONSTANTS)) {
                        return Promise.reject("Your Cant include Charcters");
                      } else if (value > 100) {
                        return Promise.reject(
                          "Your Cant Number Cant be Greater Than 100"
                        );
                      } else {
                        return Promise.resolve();
                      }
                    },
                  }),
            ]}
            className="w-100"
          >
            <Input
              name="down_payment_value"
              placeholder="Enter the Down Payment"
              defaultValue={props.postObject?.down_payment_value}
              disabled={props.checkView}
              addonAfter={"%"}
              onChange={(event) => {
                setFeildChecker({ ...feildChecker, down_payment_value: false });
                props.setPostObject({
                  ...props.postObject,
                  down_payment_value: event.target.value,
                });
              }}
              className="w-100"
            />
          </Form.Item>
          <Form.Item name="tags" required label="Tags">
            <Select
              optionFilterProp="children"
              disabled={props.checkView}
              defaultValue={props?.postObject?.tags}
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
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Media">
          <Form.Item required label="Main Image">
            <Dragger
              disabled={props.checkView}
              name="main_image"
              {...imageUploadProps}
              customRequest={(options) => uploadHandler(options, "main_image")}
            >
              {props.postObject.main_image ? (
                <img
                  src={
                    props.postObject.custom_image
                      ? props.postObject.custom_image
                      : props.postObject.main_image
                  }
                  alt="avatar"
                  className="img-fluid"
                />
              ) : (
                <div>
                  {props.postObject.custom_image ? (
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
          <Form.Item label="Video">
          <Dragger
           disabled={props.checkView}

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
                link: test.fileName,
                link_URL:test.file_url
  
              });
            } catch (error) {
              message.error({ content: `Error!`, key, duration: 2 });
            }
          }}
        >
          {props.postObject.link_URL ? (
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
                       <img
            defaultValue={props.postObject.thumbnail_image}
              src={props.postObject.thumbnail_image}
              alt={props.postObject.thumbnail_image}
              className="img-fluid"
            />
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
          <Form.Item label="Thumbnail Image">
          <Dragger
         disabled={props.checkView}

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
            defaultValue={props.postObject.thumbnail_image}
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
                  {/* <CustomIcon className="display-3" svg={ImageSvg} />
                  <p>Click or drag file to upload</p> */}
                   <img
            defaultValue={props.postObject.thumbnail_image}
              src={props.postObject.thumbnail_image}
              alt={props.postObject.thumbnail_image}
              className="img-fluid"
            />
                </div>
              )}
            </div>
          )}
        </Dragger>
          </Form.Item>

          <Form.Item required label="Sub Images">
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
              disabled={props.checkView}
              mode="tags"
              optionFilterProp="children"
              defaultValue={props.postObject?.details?.map(
                (element) => element.name
              )}
              onChange={(e) => {
                props.setPostObject({ ...props.postObject, details: e });
              }}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              style={{ width: "100%" }}
              placeholder="Please Select a Detail"
            >
              {props.gerericDetailesList?.TYPE?.map((elm) => (
                <Option value={elm.id} key={elm.id}>
                  {elm.name_en}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Select
              disabled={props.checkView}
              optionFilterProp="children"
              defaultValue={props?.postObject?.tags.map(
                (element) => element.id
              )}
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
              placeholder="Please Select Your Tags"
            >
              {props.tagsList?.map((elm) => (
                <Option value={elm.id} key={elm.id}>
                  {elm.name}
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
