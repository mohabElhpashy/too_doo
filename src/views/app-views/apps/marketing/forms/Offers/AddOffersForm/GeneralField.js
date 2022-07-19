import {
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Upload,
} from "antd";
import service from "auth/FetchInterceptor";
import { numberValidator } from "constants/helperFunctions";
import React, { useState } from "react";
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
  const [currentPrice, setCurrentPrice] = useState("0");
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
              {props.services?.map((element, index) => (
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
            label="Store Name"
            rules={rules.price}
          >
            <Select
              onPressEnter={(e) => e.preventDefault()}
              showSearch
              placeholder={"Please Select a Store"}
              onSelect={(e) => {
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
            required
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            name="capacity"
            label="Capacity"
            rules={[
              {
                whitespace: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (numberValidator(value) === true) {
                    props.setButtonChecker(false);
                    return Promise.resolve();
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
              name="capacity"
              placeholder="Enter the Capacity"
              onChange={(event) =>
                props.setPostObject({
                  ...props.postObject,
                  capacity: event.target.value,
                })
              }
              className="w-100"
            />
          </Form.Item>

          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
            }}
            required
            name="offer_date"
            label="Offer Period"
          >
            <DatePicker.RangePicker
              className="w-100"
              showTime
              onOk={(event) => {
                // console.log(event, "This is the Event");
                // const offerFrom = moment(event[0]);
                // console.log(offerFrom?._d.toUTCString(), "TESTTT");
                // const offerTo = moment(event[1]).format(
                //   DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ
                // );
                props.setPostObject({
                  ...props.postObject,
                  offer_to: event[1]?._d.toUTCString(),
                  offer_from: event[0]?._d.toUTCString(),
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
            setCurrentPrice={setCurrentPrice}
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
            <div key={currentPrice}>
              <Input
                disabled={true}
                defaultValue={currentPrice}
                value={currentPrice}
                addonAfter="EGP"
                className="w-100"
              />
            </div>
          </Form.Item>
          <Form.Item
            required
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
            }}
            name="discount"
            label="Discount"
            rules={[
              ({ getFieldValue }) => ({
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
              placeholder="Enter the Discount"
              addonAfter="%"
              onChange={(event) => {
                props.setPostObject({
                  ...props.postObject,
                  discount: event.target.value,
                });
                // props.setPostObject({
                //   ...props.postObject,

                // });
              }}
              className="w-100"
            />
          </Form.Item>

          {/* <Form.Item
            // style={{
            //   display: "inline-block",
            //   width: "calc(50% - 5px)",
            //   marginRight: 8,
            // }}
            name="discount"
            label="Discount"
          >
            <div key={props.postObject.discount}>
              <Input
                disabled={true}
                defaultValue={props.postObject.discount}
                value={props.postObject.discount}
                addonAfter="%"
                className="w-100"
              />
            </div>
          </Form.Item> */}
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
