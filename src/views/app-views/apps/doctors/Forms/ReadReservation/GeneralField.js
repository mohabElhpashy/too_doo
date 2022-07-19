import React from "react";
import { Card, Form, Input, Row, Col, Upload } from "antd";
import { ImageSvg } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import { LoadingOutlined } from "@ant-design/icons";
const { Dragger } = Upload;
const GeneralField = ({ postObject, setPostObject, checkViewMode }) => {
  console.log(postObject, "Post Object");
  return (
    <Row xs={24} sm={24} md={17}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info" className="w-100">
          <Form.Item
            name="payment_method_name_en"
            label="Payment Method:"
            required
            onPressEnter={(e) => e.preventDefault()}
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
          >
            <Input
              name="payment_method_name_en"
              defaultValue={postObject.payment_method_name_en}
              disabled={true}
              onPressEnter={(e) => e.preventDefault()}
            />
          </Form.Item>
          <Form.Item
            name="status_name_en"
            required
            label="Reservation Status:"
            rules={[{ required: true }]}
            style={{ display: "inline-block", width: "calc(50% - 5px)" }}
          >
            <Input
              onPressEnter={(e) => e.preventDefault()}
              defaultValue={postObject.status_name_en}
              disabled={checkViewMode}
            />
          </Form.Item>

          <Form.Item
            name="date"
            required
            label="Reservation Date:"
            onPressEnter={(e) => e.preventDefault()}
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
          >
            <Input
              name="date"
              defaultValue={postObject?.date}
              disabled={true}
              onPressEnter={(e) => e.preventDefault()}
            />
          </Form.Item>
          {/* <Form.Item
            name="pickup_date"
            required
            label="PickUp Date:"
            style={{ display: "inline-block", width: "calc(50% - 5px)" }}
          >
            <Input
              onPressEnter={(e) => e.preventDefault()}
              defaultValue={postObject?.pickup_date?.split(" ")[0]}
              disabled={checkViewMode}
            />
          </Form.Item>
 */}
          <Form.Item
            name="total_price"
            required
            label="Down Payment Value:"
            onPressEnter={(e) => e.preventDefault()}
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
            }}
          >
            <Input
              name="total_price"
              addonAfter="EGP"
              defaultValue={postObject?.variations?.down_payment_value}
              disabled={true}
              onPressEnter={(e) => e.preventDefault()}
            />
          </Form.Item>

          {/* <Form.Item
            name="total_paid_amount"
            required
            label="Total Paid Amount:"
            onPressEnter={(e) => e.preventDefault()}
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
            }}
          >
            <Input
              name="total_paid_amount"
              addonAfter="EGP"
              defaultValue={postObject?.total_paid_amount}
              disabled={true}
              onPressEnter={(e) => e.preventDefault()}
            />
          </Form.Item> */}
          <Form.Item
            name="contact_name"
            label="Contact Name:"
            required
            onPressEnter={(e) => e.preventDefault()}
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
          >
            <Input
              name="contact_name"
              defaultValue={postObject.contact_name}
              disabled={true}
              onPressEnter={(e) => e.preventDefault()}
            />
          </Form.Item>
          <Form.Item
            name="contact_phone"
            required
            label="Contact Phone:"
            rules={[{ required: true }]}
            style={{ display: "inline-block", width: "calc(50% - 5px)" }}
          >
            <Input
              onPressEnter={(e) => e.preventDefault()}
              defaultValue={postObject.contact_phone}
              disabled={checkViewMode}
            />
          </Form.Item>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Product Image" style={{ marginLeft: 15 }}>
          <Form.Item required label="Main Image">
            <Dragger
              showUploadList={false}
              name="main_image"
              // customRequest={(options) => uploadHandler(options, "main_image")}
              disabled={checkViewMode}
            >
              {postObject?.product_image ? (
                <img
                  src={postObject?.product_image}
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

      <Col xs={24} sm={24} md={17}>
        <Card title="Product Info" className="w-100">
          <Form.Item
            name="name_en"
            label="Product Name:"
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
              defaultValue={postObject?.product_name}
              disabled={true}
              onPressEnter={(e) => e.preventDefault()}
            />
          </Form.Item>
          <Form.Item
            name="service_name_en"
            required
            label="Service Name:"
            rules={[{ required: true }]}
            style={{ display: "inline-block", width: "calc(50% - 5px)" }}
          >
            <Input
              onPressEnter={(e) => e.preventDefault()}
              defaultValue={"Doctor"}
              disabled={checkViewMode}
            />
          </Form.Item>

          <Form.Item
            name="price"
            required
            label="Product Price:"
            onPressEnter={(e) => e.preventDefault()}
          >
            <Input
              name="price"
              addonAfter="EGP"
              defaultValue={postObject?.product_price}
              disabled={true}
              onPressEnter={(e) => e.preventDefault()}
            />
          </Form.Item>
          {(postObject?.product?.has_flash ||
            postObject?.product?.has_offer ||
            postObject?.product?.has_package) && (
            <Form.Item
              name="special_deal"
              required
              label="Special Deals:"
              onPressEnter={(e) => e.preventDefault()}
            >
              <Input
                name="special_deal"
                defaultValue={
                  postObject?.product?.has_flash
                    ? "Has Flash Deal"
                    : postObject?.product?.has_offer
                    ? "Has Offer"
                    : postObject?.product?.has_package
                    ? "Has Package"
                    : "None"
                }
                disabled={true}
                onPressEnter={(e) => e.preventDefault()}
              />
            </Form.Item>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
