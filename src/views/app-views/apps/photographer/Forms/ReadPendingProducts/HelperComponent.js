import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Col, Form, Input, Modal, Row, Select, Upload } from "antd";
import { ImageSvg } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import ServiceIdConstants from "constants/ServiceIdConstants";
import React, { useEffect, useState } from "react";
const { Dragger } = Upload;
const { Option } = Select;

const imageUploadProps = {
  name: "file",
  multiple: true,
  listType: "picture-card",
  showUploadList: false,
};

const HelperComponent = (props) => {
  // const imgList = React.useMemo(() => (props.postObject.images.map((element, index) => ({ uid: index, url: element, name: 'image.png' }))))
  //Upload Seaction
  const [test, setTest] = useState([]);
  const [singleImage, setSingleImage] = useState("");
  //Upload Seaction
  const filteredTags = props?.tagsList?.filter(
    (element) => element.service_id === ServiceIdConstants.Photographers_Id
  );
  useEffect(() => {
    const test1 = props.postObject?.images?.map((element) => {
      let newObj = {};
      newObj["url"] = element.image;
      newObj["id"] = element.id;
      return newObj;
    });
    setTest(test1);
  }, [props?.postObject?.images]);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info" style={{ minHeight: 525 }}>
          {props?.postObject?.name_ar && (
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
            >
              <Input
                name="name_ar"
                disabled={true}
                defaultValue={props.postObject.name_ar}
                onPressEnter={(e) => e.preventDefault()}
                placeholder="Please enter Product Name in Arabic"
              />
            </Form.Item>
          )}
          {props?.postObject?.name_en && (
            <Form.Item
              style={{
                display: "inline-block",
                width: "calc(50% - 5px)",
              }}
              required
              name="name_en"
              hasFeedback
              label="Name in English"
            >
              <Input
                name="name_en"
                disabled={true}
                onPressEnter={(e) => e.preventDefault()}
                defaultValue={props.postObject.name_en}
                placeholder="Please enter Product Name in English"
              />
            </Form.Item>
          )}

          {props?.postObject?.description_ar && (
            <Form.Item
              required
              hasFeedback
              name="description_ar"
              label="Description in Arabic"
            >
              <Input.TextArea
                name="description_ar"
                disabled={true}
                placeholder="Enter the Description in Arabic"
                defaultValue={props.postObject.description_ar}
                rows={4}
              />
            </Form.Item>
          )}
          {props.postObject.description_en && (
            <Form.Item
              required
              name="description_en"
              hasFeedback
              label="Description in English"
            >
              <Input.TextArea
                name="description_en"
                disabled={true}
                placeholder="Enter the Description in English"
                defaultValue={props.postObject.description_en}
                rows={4}
              />
            </Form.Item>
          )}
          {props.postObject.price && (
            <Form.Item required name={"price"} label="Price">
              <Input
                defaultValue={props?.postObject.price}
                disabled={true}
                value={props.postObject.price}
              />
            </Form.Item>
          )}
          {props.postObject.photos_count !== undefined && (
            <Form.Item required name={"photos_count"} label="Photo Count">
              <Input
                addonAfter={"Photos"}
                defaultValue={props?.postObject.photos_count}
                disabled={true}
                value={props.postObject.photos_count}
              />
            </Form.Item>
          )}
          {props.postObject.photographer_id && (
            <Form.Item
              name="photographer_id"
              required
              label={<span>PhotoGrapher Name&nbsp;</span>}
            >
              <Select
                showSearch
                name="photographer_id"
                disabled={true}
                defaultValue={props?.postObject?.photographer_id}
                placeholder="Select a Clinic Name"
                optionFilterProp="children"
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
          )}
          {props.postObject?.tags && (
            <Form.Item name="tags" required label="Tags">
              <Select
                optionFilterProp="children"
                disabled={true}
                defaultValue={props?.postObject?.tags}
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
          )}

          {/* {props.newChange && props.postObject.details && (
            <h4 style={{ fontWeight: "bold" }}>Details</h4>
          )}
          {props.newChange &&
            props.postObject.details &&
            props.postObject.details.map((element) => (
              <>
                <Form.Item
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 5px)",
                    marginRight: 8,
                  }}
                  required
                  name="name"
                  hasFeedback
                  label="Detail Type"
                >
                  <Input
                    name="detail_Type"
                    disabled={true}
                    onPressEnter={(e) => e.preventDefault()}
                    defaultValue={element?.parent_name?.name_en}
                    // placeholder="Please enter Product Name in English"
                  />
                </Form.Item>
                <Form.Item
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 5px)",
                  }}
                  required
                  name="Generic_Details"
                  hasFeedback
                  label="Generic Details"
                >
                  <Input
                    name="generic_details"
                    disabled={true}
                    onPressEnter={(e) => e.preventDefault()}
                    defaultValue={element.generic_details_name_en}
                    // placeholder="Please enter Product Name in English"
                  />
                </Form.Item>
              </>
            ))} */}
          {/* {props.newChange && props.postObject.variations && (
            <h4 style={{ fontWeight: "bold" }}>Variations</h4>
          )}
          {props.newChange &&
            props.postObject.variations &&
            props.postObject.variations.map((element) => (
              <>
                <Form.Item
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 5px)",
                    marginRight: 8,
                  }}
                  required
                  name="number_of_days"
                  hasFeedback
                  label="Number of Days"
                >
                  <Input
                    name="name"
                    disabled={true}
                    onPressEnter={(e) => e.preventDefault()}
                    defaultValue={element.number_of_days}
                    placeholder="Please enter Product Name in English"
                  />
                </Form.Item>
                <Form.Item
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 5px)",
                  }}
                  required
                  name="price"
                  hasFeedback
                  label="Price"
                >
                  <Input
                    name="price"
                    disabled={true}
                    addonAfter={"EGP"}
                    onPressEnter={(e) => e.preventDefault()}
                    defaultValue={element.price}
                    placeholder="Please enter Product Name in English"
                  />
                </Form.Item>
              </>
            ))} */}
        </Card>
      </Col>

      {/* <Col xs={24} sm={24} md={10}>
        {props.postObject.variation && (
          <Card title="Variation">
            {props.postObject.variation.map((element) => (
              <>
                <Form.Item
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 5px)",
                    marginRight: 8,
                  }}
                  required
                  name="name"
                  hasFeedback
                  label="Type of Vartaion"
                >
                  <Input
                    name="name"
                    disabled={true}
                    onPressEnter={(e) => e.preventDefault()}
                    defaultValue={element.name}
                    placeholder="Please enter Product Name in English"
                  />
                </Form.Item>
                <Form.Item
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 5px)",
                  }}
                  required
                  name="price"
                  hasFeedback
                  label="Price"
                >
                  <Input
                    name="price"
                    disabled={true}
                    onPressEnter={(e) => e.preventDefault()}
                    defaultValue={element.price}
                    placeholder="Please enter Product Name in English"
                  />
                </Form.Item>
              </>
            ))}
          </Card>
        )}
      </Col> */}

      {/* {props.postObject.variation &&
        props.postObject.variation.map((element) => (
          <Card title="Vartaions ">
            <Form.Item
              style={{
                display: "inline-block",
                width: "calc(50% - 5px)",
                marginRight: 8,
              }}
              required
              name="name"
              hasFeedback
              label="Type of Vartaion"
            >
              <Input
                name="name"
                disabled={true}
                onPressEnter={(e) => e.preventDefault()}
                defaultValue={element.name}
                placeholder="Please enter Product Name in English"
              />
            </Form.Item>
            <Form.Item
              style={{
                display: "inline-block",
                width: "calc(50% - 5px)",
              }}
              required
              name="price"
              hasFeedback
              label="Price"
            >
              <Input
                name="price"
                disabled={true}
                onPressEnter={(e) => e.preventDefault()}
                defaultValue={element.price}
                placeholder="Please enter Product Name in English"
              />
            </Form.Item>
          </Card>
        ))} */}
      <Col xs={24} sm={24} md={7}>
        {(props.postObject.main_image || props.postObject.images) && (
          <Card title="Media">
            {props.postObject.main_image && (
              <Form.Item required label="Main Image">
                <Dragger
                  disabled={true}
                  name="main_image"
                  {...imageUploadProps}
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
            )}

            {props.postObject.images && (
              <Form.Item required label="Sub Images">
                <Upload
                  disabled={true}
                  // fileList={props?.postObject?.images}
                  fileList={test}
                  onPreview={(t) => setSingleImage(t.url)}
                  listType="picture-card"
                >
                  {props.postObject?.images?.length >= 4 ? null : uploadButton}
                </Upload>
              </Form.Item>
            )}

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
        )}

        {props.newChange && props.postObject.details && (
          <Card title="Details">
            {props.newChange &&
              props.postObject.details &&
              props.postObject.details.map((element) => (
                <>
                  <Form.Item
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 5px)",
                      marginRight: 8,
                    }}
                    required
                    name="name"
                    hasFeedback
                    label="Detail Type"
                  >
                    <Input
                      name="detail_Type"
                      disabled={true}
                      onPressEnter={(e) => e.preventDefault()}
                      defaultValue={element?.parent_name?.name_en}
                      // placeholder="Please enter Product Name in English"
                    />
                  </Form.Item>
                  <Form.Item
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 5px)",
                    }}
                    required
                    name="Generic_Details"
                    hasFeedback
                    label="Generic Details"
                  >
                    <Input
                      name="generic_details"
                      disabled={true}
                      onPressEnter={(e) => e.preventDefault()}
                      defaultValue={element.generic_details_name_en}
                      // placeholder="Please enter Product Name in English"
                    />
                  </Form.Item>
                </>
              ))}
          </Card>
        )}
      </Col>
    </Row>
  );
};

export default HelperComponent;
