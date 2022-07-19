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
import { languageValidator } from "constants/helperFunctions";
import { ARABIC_alpha, ENGLISH_ALPH } from "constants/LanguagesConstent";
import ServiceIdConstants from "constants/ServiceIdConstants";
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
  //Upload Seaction
  const mealType = ["full-board", "half-board"];

  const [test, setTest] = useState([]);
  const [singleImage, setSingleImage] = useState([]);
  useEffect(() => {
    const test1 = props.postObject?.images?.map((element) => {
      let newObj = {};
      newObj["url"] = element.image;
      newObj["id"] = element.id;
      return newObj;
    });
    setTest(test1);
  }, [props.postObject.images]);
  const filteredTags = props?.tagsList?.filter(
    (element) => element.service_id === ServiceIdConstants.TRIP_ID
  );
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const uploadHandler = async (options, name) => {
    const key = "updatable";
    message.loading({ content: "Loading...", key, duration: 15 });

    const imageObject = { type: "Trip", file: options.file };
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
  const [feildChecker, setFieldChecker] = useState({
    name_en: true,
    name_ar: true,
    description_ar: true,
    description_en: true,
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
              onPressEnter={(e) => e.preventDefault()}
              defaultValue={props?.postObject?.name_ar}
              disabled={props.checkView}
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
              defaultValue={props?.postObject?.name_en}
              onChange={(event) => {
                props.setPostObject({
                  ...props.postObject,
                  name_en: event.target.value,
                });
                setFieldChecker({ ...feildChecker, name_en: false });
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
              placeholder="Enter the Description in Arabic"
              defaultValue={props?.postObject?.description_ar}
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
              defaultValue={props?.postObject?.description_en}
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

          <Form.Item
            name="traveling_agency_id"
            required
            label={<span>Trip Agancy&nbsp;</span>}
          >
            <Select
              showSearch
              disabled={props.checkView}
              placeholder="Select a Travel Agancy Name"
              defaultValue={props?.postObject?.traveling_agency_id}
              optionFilterProp="children"
              onChange={(e) =>
                props.setPostObject({
                  ...props.postObject,
                  traveling_agency_id: e,
                })
              }
              value={props.postObject.traveling_agency_id}
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
            name="destination_id"
            required
            label={<span>Trip Destinations&nbsp;</span>}
          >
            <Select
              disabled={props.checkView}
              showSearch
              placeholder="Select a Travel Destination"
              optionFilterProp="children"
              defaultValue={props?.postObject?.destination_id}
              onChange={(e) =>
                props.setPostObject({ ...props.postObject, destination_id: e })
              }
              value={props.postObject.destination_id}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {props.tripsDestinations?.map((element) => (
                <Option key={element.id} value={element.id}>
                  {element?.name_en}
                </Option>
              ))}
            </Select>
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

          <Form.Item
            name="meal_type "
            required
            className="w-100"
            label={<span>Meal Type&nbsp;</span>}
          >
            <Select
              showSearch
              placeholder="Select a Meal Type"
              optionFilterProp="children"
              disabled={props.checkView}
              defaultValue={props.postObject.meal_type}
              onChange={(e) =>
                props.setPostObject({
                  ...props.postObject,
                  meal_type: e,
                })
              }
              value={props.postObject.meal_type}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {mealType?.map((element, index) => (
                <Option key={index} value={element}>
                  {element}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            required
            label="Transportation"
            name="with_transportation  "
            valuePropName="checked"
          >
            <Button
              type="primary"
              size="small"
              disabled={props.checkView}
              onClick={() => {
                props.setPostObject({
                  ...props.postObject,
                  with_transportation: !props.postObject.with_transportation,
                });
              }}
            >
              {props?.postObject?.with_transportation
                ? "With Transportation"
                : "Without Transportation"}
            </Button>
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

          <Form.Item required label="Sub Images">
            <Upload
              fileList={test}
              disabled={props.checkView}
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
              {props?.postObject?.subImages?.length >= 4 ? null : uploadButton}
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
              mode="multiple"
              optionFilterProp="children"
              defaultValue={props.postObject?.details?.map(
                (element) => element.name
              )}
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
              {props.gerericDetailesList?.TYPE?.map((elm) => (
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
