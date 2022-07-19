import React, { useState } from "react";
import {
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Table,
  Upload,
  Modal,
} from "antd";
import service from "auth/FetchInterceptor";
import { DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ } from "constants/DateConstant";
import { numberValidator } from "constants/helperFunctions";
import moment from "moment";
import { NUMBER_CONSTANTS } from "constants/LanguagesConstent";
const { Option } = Select;

const col = (service_id, setSingleImage) => [
  {
    title: "ID",

    key: "id",
    render: (_, obj) => `# ${obj.variation_id ? obj.variation_id : obj.id}`,
  },
  {
    title: "Name",
    dataIndex: "product_name",
    key: "product_name",
    // sorter: (a, b) => a.product_name.length - b.product_name.length,
  },

  service_id === 7
    ? {
        title: "Purchase Type",
        key: "VariationType",
        render: (_, obj) => `${obj.variation_type}`,
      }
    : service_id === 1
    ? {
        title: "Number of Hours",
        key: "VariationType",
        render: (_, obj) => `${obj.variation_type} Hours`,
      }
    : service_id === 6
    ? {
        title: "Number of Days",
        key: "VariationType",
        render: (_, obj) => `${obj.variation_type} Days`,
      }
    : service_id === 2
    ? {
        title: "Varation Name",
        key: "VariationType",
        render: (_, obj) => `${obj.variation_type}`,
      }
    : {},
  {
    title: "Main Image ",
    dataIndex: "main_image",
    key: "main_image",
    render: (text, obj) => {
      return (
        <Upload
          disabled={true}
          // fileList={props?.postObject?.images}
          fileList={[
            {
              uid: obj.id,
              name: obj.name_en,
              status: "done",
              url: obj.main_image,
            },
          ]}
          onPreview={(t) => setSingleImage(obj.main_image)}
          listType="picture-card"
        />
      );
    },
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price) => `${price} EGP`,
  },
];

// const rowSelection = {
//   onChange: (modual_id) => {
//     setPostObject({ ...postObject, model_id: modual_id[0] });
//   },
// };
const ListOfProducts = ({
  name,
  col,
  data,
  setPostObject,
  postObject,
  setCurrentPrice,
}) => {
  const [singleImage, setSingleImage] = useState("");

  return (
    <>
      <Table
        // title={() => (
        //   <Search
        //     setCurrentList={setCurrentList}
        //     prevousState={data}
        //     url={''}
        //   />
        // )}
        rowSelection={{
          type: "radio",
          onChange: (modual_id, obj) => {
            setPostObject({
              ...postObject,
              product_id: obj[0].variation_id ? obj[0].id : modual_id[0],
              variation_id: obj[0].variation_id ? modual_id[0] : null,
            });
            setCurrentPrice(obj[0].price);
          },
          getCheckboxProps: (record) => ({
            onClick: (t) => console.log(t, "Hopeeee", record, "Hope Tany"),
          }),
        }}
        columns={col(postObject?.service_id, setSingleImage)}
        dataSource={data}
        rowKey={(item) => (item.variation_id ? item.variation_id : item.id)}
      />
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
    </>
  );
};

const GeneralField = (props) => {
  const sellerSelection = async (e) => {
    props.setPostObject({ ...props.postObject, store_id: e });
    try {
      const data = await service.get(
        `web/products/${props.postObject.service_id}/${e}`
      );
      props.setProductList(data.data);
    } catch (error) {
      <h2>{error}</h2>;
    }
  };
  // const [currentPrice, setCurrentPrice] = useState("0");
  const [feildChecker, setFeildChecker] = useState({
    capacity: true,
    discount: true,
  });
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24} xl={24}>
        <Card title="Basic Info">
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            required
            name="service_id"
            label="Service Name"
          >
            <Select
              onPressEnter={(e) => e.preventDefault()}
              showSearch
              disabled={true}
              defaultValue={props?.postObject?.service_id}
              value={props?.postObject?.service_id}
              placeholder="Please Select a Service"
              onSelect={(e) => {
                if (props.postObject.product_id) {
                  props.setPostObject({
                    ...props.postObject,
                    product_id: null,
                    store_id: null,
                    variation_id: null,
                  });
                } else {
                  props.setProductList([]);
                  props.setPostObject({ ...props.postObject, service_id: e });
                }
              }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {props?.listOfServices?.map((element, index) => (
                <Option key={element.id} value={element.id}>
                  {element?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
            }}
            name="seller_id"
            required
            label="Store Name"
          >
            <Select
              onPressEnter={(e) => e.preventDefault()}
              showSearch
              disabled={true}
              defaultValue={props?.postObject?.store?.store_name_en}
              placeholder={"Please Select a Store"}
              onChange={(e) => {
                sellerSelection(e);
              }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {props.listofStores?.map((element, index) => (
                <Option key={element.id} value={element.id}>
                  {element?.name}
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
            name="product_name"
            required
            label="Product Name"
          >
            <Select
              onPressEnter={(e) => e.preventDefault()}
              showSearch
              disabled={true}
              defaultValue={props?.postObject?.product?.product_name_en}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {props?.productList?.map((element, index) => (
                <Option key={element.id} value={element.id}>
                  {element?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            required
            hasFeedback
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
            }}
            name="capacity"
            label="Capacity"
            rules={[
              feildChecker.capacity
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
          >
            <Input
              name="capacity"
              disabled={props.checkViewMode}
              placeholder="Enter the Capacity"
              defaultValue={props?.postObject?.capacity}
              onChange={(event) => {
                setFeildChecker({ ...feildChecker, capacity: false });

                props.setPostObject({
                  ...props.postObject,
                  capacity: event.target.value,
                });
              }}
              className="w-100"
            />
          </Form.Item>

          <Form.Item required name="offer_date" label="Offer Period">
            <DatePicker.RangePicker
              className="w-100"
              showTime
              disabled={props.checkViewMode}
              defaultValue={[
                moment(
                  props?.postObject?.offer_to,
                  DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ
                ),
                moment(
                  props?.postObject?.offer_from,
                  DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ
                ),
              ]}
              onOk={(event) => {
                const offerFrom = moment(event[0]).format(
                  DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ
                );
                const offerTo = moment(event[1]).format(
                  DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ
                );
                props.setPostObject({
                  ...props.postObject,
                  offer_to: offerTo,
                  offer_from: offerFrom,
                });
              }}
            />
          </Form.Item>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={24} lg={24}>
        <Card title={"Select a Product"}>
          <ListOfProducts
            col={col}
            data={props.productList}
            postObject={props.postObject}
            setPostObject={props.setPostObject}
            setCurrentPrice={props.setCurrentPrice}
          />
        </Card>
        <Card title="Pricing">
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            name="currentPrice"
            label="Old Price"
          >
            <div key={props.currentPrice}>
              <Input
                disabled={true}
                defaultValue={props.currentPrice}
                value={props.currentPrice}
                addonAfter="EGP"
                className="w-100"
              />
            </div>
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
            }}
            name="discount"
            label="Discount"
            rules={[
              feildChecker.discount
                ? []
                : ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (numberValidator(value) === true) {
                        if (parseInt(value) > 100 || parseInt(value) < 0) {
                          props.setButtonChecker(true);

                          return Promise.reject(
                            "The Discount Cant be  Greater than 100 %"
                          );
                        } else {
                          props.setButtonChecker(false);
                          return Promise.resolve();
                        }
                      } else {
                        props.setButtonChecker(true);
                        return Promise.reject(
                          "Please enter a the Correct Format of a Number"
                        );
                      }
                    },
                  }),
            ]}
          >
            <Input
              name="discount"
              disabled={props.checkViewMode}
              defaultValue={props?.postObject?.discount}
              addonAfter="%"
              onChange={(event) => {
                setFeildChecker({ ...feildChecker, discount: false });
                props.setPostObject({
                  ...props.postObject,
                  discount: event.target.value,
                });
              }}
              className="w-100"
            />
          </Form.Item>
          <Form.Item name="price" label="New Price">
            <Input
              name="price"
              placeholder="Enter the Price"
              addonAfter="EGP"
              disabled={true}
              defaultValue={Math.round(props?.postObject?.new_price)}
              // onChange={(event) => {
              //   const new_Discount =
              //     (1 - event.target.value / props.currentPrice) * 100;
              //   props.setPostObject({
              //     ...props.postObject,
              //     discount: Math.round(new_Discount),
              //     price: event.target.value,
              //   });
              //   // props.setPostObject({
              //   //   ...props.postObject,

              //   // });
              // }}
              className="w-100"
            />
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
