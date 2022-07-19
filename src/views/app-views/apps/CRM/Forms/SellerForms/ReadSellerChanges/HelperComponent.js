import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Col, Form, Input, Row, Select, Upload } from "antd";
import { ImageSvg } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
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
          {props?.postObject?.first_name && (
            <Form.Item
              required
              hasFeedback
              style={{
                display: "inline-block",
                width: "calc(50% - 5px)",
                marginRight: 8,
              }}
              name="first_name"
              label="Name in Arabic"
            >
              <Input
                name="first_name"
                disabled={true}
                defaultValue={props.postObject.first_name}
                onPressEnter={(e) => e.preventDefault()}
                placeholder="Please enter Seller First Name "
              />
            </Form.Item>
          )}
          {props?.postObject?.last_name && (
            <Form.Item
              style={{
                display: "inline-block",
                width: "calc(50% - 5px)",
              }}
              required
              name="last_name"
              hasFeedback
              label="Name in English"
            >
              <Input
                name="last_name"
                disabled={true}
                onPressEnter={(e) => e.preventDefault()}
                defaultValue={props.postObject.last_name}
                placeholder="Please enter Seller Last Name "
              />
            </Form.Item>
          )}

          {props?.postObject?.email && (
            <Form.Item required hasFeedback name="email" label="Email">
              <Input
                name="email"
                disabled={true}
                placeholder="Enter the Seller Email"
                defaultValue={props.postObject.email}
                rows={4}
              />
            </Form.Item>
          )}
          {props?.postObject?.phone && (
            <Form.Item required hasFeedback name="phone" label="Phone Number">
              <Input
                name="phone"
                disabled={true}
                defaultValue={props.postObject.phone}
                rows={4}
              />
            </Form.Item>
          )}
          {props?.postObject?.country_code && (
            <Form.Item
              required
              hasFeedback
              name="country_code"
              label="Country Code"
            >
              <Input
                name="country_code"
                disabled={true}
                defaultValue={props.postObject.country_code}
                rows={4}
              />
            </Form.Item>
          )}

          {props?.postObject?.service_id && (
            <Form.Item
              name="service_id"
              required
              label={<span>Service Type&nbsp;</span>}
            >
              <Select
                showSearch
                name="service_id"
                disabled={true}
                defaultValue={props?.postObject?.service_id}
                placeholder="Select a Service"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {props.services?.map((element) => (
                  <Option key={element.id} value={element.id}>
                    {element?.name}
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
        </Card>
      </Col>

      <Col xs={24} sm={24} md={7}>
        {props?.postObject?.main_image && (
          <Card title="Media">
            {props?.postObject?.main_image && (
              <Form.Item required label="Main Image">
                <Dragger
                  disabled={true}
                  name="main_image"
                  {...imageUploadProps}
                >
                  {props?.postObject?.main_image ? (
                    <img
                      src={props?.postObject?.main_image}
                      alt="avatar"
                      className="img-fluid"
                    />
                  ) : (
                    <div>
                      {props?.postObject?.main_image ? (
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
          </Card>
        )}
      </Col>
    </Row>
  );
};

export default HelperComponent;
