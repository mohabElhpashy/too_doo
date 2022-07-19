import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Card, Col, Form, Input, Row, TimePicker, Upload } from "antd";
import { ImageSvg } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import moment from "moment";
const { Dragger } = Upload;

const StoreInfo = ({ postObject, setPostObject, checkViewMode }) => {
  console.log(postObject, "Post Object");
  return (
    <Row xs={24} sm={24} md={17}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Store Info" className="w-100">
          <Form.Item
            name="name_en"
            label="Store Name in English:"
            required
            onPressEnter={(e) => e.preventDefault()}
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
          >
            <Input
              name="name_en"
              defaultValue={postObject?.store?.store_name_en}
              disabled={true}
              onPressEnter={(e) => e.preventDefault()}
            />
          </Form.Item>
          <Form.Item
            name="name_ar"
            required
            label="Store Name in Arabic:"
            rules={[{ required: true }]}
            style={{ display: "inline-block", width: "calc(50% - 5px)" }}
          >
            <Input
              onPressEnter={(e) => e.preventDefault()}
              defaultValue={postObject?.store?.store_name_ar}
              disabled={checkViewMode}
            />
          </Form.Item>

          <Form.Item
            name="store_phone"
            required
            label="Store Phone Number:"
            onPressEnter={(e) => e.preventDefault()}
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
          >
            <Input
              name="store_phone"
              defaultValue={postObject?.store?.store_phone}
              disabled={true}
              onPressEnter={(e) => e.preventDefault()}
            />
          </Form.Item>
          <Form.Item
            name="store_address_en"
            required
            label="Store Address:"
            style={{ display: "inline-block", width: "calc(50% - 5px)" }}
          >
            <Input
              onPressEnter={(e) => e.preventDefault()}
              defaultValue={postObject?.store?.store_address_en}
              disabled={checkViewMode}
            />
          </Form.Item>

          <Form.Item
            name="category_name"
            required
            label="Service Type:"
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
          >
            <Input
              onPressEnter={(e) => e.preventDefault()}
              defaultValue={postObject?.store?.category_name}
              disabled={checkViewMode}
            />
          </Form.Item>
          <Form.Item
            name="seller_type"
            required
            label="Seller Type:"
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
            }}
          >
            <Input
              onPressEnter={(e) => e.preventDefault()}
              defaultValue={postObject?.store?.seller_type}
              disabled={checkViewMode}
            />
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            required
            name="open_at"
            label="Open At"
            // rules={rules.price}
          >
            <TimePicker
              showTime
              disabled={true}
              className="w-100"
              placeholder="Select Time"
              defaultValue={moment(postObject?.store?.open_at, "HH:mm:ss")}
            />
          </Form.Item>

          <Form.Item
            style={{ display: "inline-block", width: "calc(50% - 5px)" }}
            name="close_at"
            label="Close At"
            required
            // rules={rules.comparePrice}
          >
            <TimePicker
              showTime
              disabled={true}
              placeholder="Select Time"
              className="w-100"
              defaultValue={moment(postObject?.store?.close_at, "HH:mm:ss")}
            />
          </Form.Item>
        </Card>
      </Col>

      <Col xs={24} sm={24} md={7}>
        <Card title="Store Image" style={{ marginLeft: 15 }}>
          <Form.Item required label="Main Image">
            <Dragger
              showUploadList={false}
              name="main_image"
              // customRequest={(options) => uploadHandler(options, "main_image")}
              disabled={checkViewMode}
            >
              {postObject?.store?.main_image ? (
                <img
                  src={postObject?.store?.main_image}
                  alt="avatar"
                  className="img-fluid"
                />
              ) : (
                <div>
                  {postObject.displayImage ? (
                    <div>
                      <LoadingOutlined className="font-size-xxl text-primary" />
                      <div className="mt-3">Uploading</div>
                    </div>
                  ) : (
                    <div>
                      <CustomIcon className="display-3" svg={ImageSvg} />
                      <p>Clic k or drag file to upload</p>
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

export default StoreInfo;
