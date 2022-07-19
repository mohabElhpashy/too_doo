import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Tag,
  Tooltip,
} from "antd";
import service from "auth/FetchInterceptor";
import Flex from "components/shared-components/Flex";
import React, { useState } from "react";
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
const ItemHeader = ({ name }) => (
  <div>
    <h4 className="mb-0">{name}</h4>
    <span className="text-muted">Wedding Halls</span>
  </div>
);

const ItemInfo = ({
  attachmentCount,
  completedTask,
  totalTask,
  statusColor,
  dayleft,
}) => (
  <Flex alignItems="center">
    <div className="mr-3">
      <Tooltip title="Attachment">
        <PaperClipOutlined className="text-muted font-size-md" />
        <span className="ml-1 text-muted">{attachmentCount}</span>
      </Tooltip>
    </div>
    <div className="mr-3">
      <Tooltip title="Task Completed">
        <CheckCircleOutlined className="text-muted font-size-md" />
        <span className="ml-1 text-muted">
          {completedTask}/{totalTask}
        </span>
      </Tooltip>
    </div>
    <div>
      <Tag
        className={statusColor === "none" ? "bg-gray-lightest" : ""}
        color={statusColor !== "none" ? statusColor : ""}
      >
        <ClockCircleOutlined />
        <span className="ml-2 font-weight-semibold">{dayleft} days left</span>
      </Tag>
    </div>
  </Flex>
);

const GeneralField = ({
  category,
  setPostObject,
  postObject,
  setRequestedData,
  requestedData,
  inialOperations,
  setPackage,
  currentPackage,
  setOperation,
  operations,
  paymentMethodList,
}) => {
  const [currentPrice, setCurrentPrice] = useState("0");
  const [colorBorder, setColorBoarder] = useState(null);
  const handelSelection = async (endPoint, type, typeId, input) => {
    setOperation({ ...operations, [typeId]: input });
    try {
      const data = await service.get(`/web/${endPoint}`).then((res) => res);
      setRequestedData({ ...requestedData, [type]: [...data.data] });
    } catch (error) {}
  };

  const GridItem = ({ data, element, index }) => (
    <Card
      style={{ borderColor: index === colorBorder ? "#3e79f7" : null }}
      className="cursor-pointer"
      onClick={() => handleProduct(element, index)}
    >
      <Flex alignItems="center" justifyContent="between">
        <ItemHeader name={data.product_name} category={data.category} />
      </Flex>
      <div className="mt-2">
        <ItemInfo
          attachmentCount={10}
          completedTask={12}
          totalTask={20}
          statusColor={"red"}
          dayleft={12}
        />
      </div>
    </Card>
  );
  const handleSellerList = async (id) => {
    // setOperation({ ...operations, store: input });
    // setRequestedData({ ...requestedData, product: [0] });
    setOperation({
      ...operations,
      product_id: null,
      store_id: null,
      service_id: id,
    });

    try {
      const data = await service.get(`/web/stores/${id}`);
      // const sellerss = data.data.filter(
      //   (element) => element.service_id === id
      // );
      const sellerList = data.data.filter((element) =>
        element.payment_methods.find(
          (record) => record.payment_method_id === postObject.payment_method_id
        )
      );
      setRequestedData({ ...requestedData, store: [...sellerList] });
    } catch (error) {}
  };
  //Handel Add To Package
  const handelAddToPackage = () => {
    setPackage([...currentPackage, operations]);
    setOperation({
      service_id: "",
      store_id: "",
      product_id: "",
      new_price: "",
      product_name: "",
    });
    setPostObject({
      ...postObject,
      new_price: currentPackage.reduce(
        (acc, value) => parseFloat(acc) + parseFloat(value.new_price),
        0
      ),
    });
  };
  //Select Product
  const handleProduct = (item, index) => {
    setColorBoarder(index);
    setCurrentPrice(
      requestedData?.product[
        requestedData.product?.findIndex((element) => element.id == item.id)
      ]?.price
    );
    setOperation({
      ...operations,
      product_id: item.id,
      product_name: item.product_name,
    });
  };
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item
            name="name_en"
            label="English Name"
            rules={rules.name}
            defaultValue={postObject.name_en}
          >
            <Input
              onChange={(e) =>
                setPostObject({ ...postObject, name_en: e.target.value })
              }
              placeholder="Name in English"
              onPressEnter={(e) => e.preventDefault()}
            />
          </Form.Item>
          <Form.Item name="namr_ar" label="Arabic Name" rules={rules.name}>
            <Input
              placeholder="Name in Arabic "
              onPressEnter={(e) => e.preventDefault()}
              onChange={(e) =>
                setPostObject({ ...postObject, name_ar: e.target.value })
              }
              rows={4}
              defaultValue={postObject.name_ar}
            />
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            name="availabe_From"
            label="Avalible From"
            rules={rules.price}
          >
            <DatePicker
              showTime
              className="w-100"
              placeholder="Select Time"
              onOk={(e) =>
                setPostObject({
                  ...postObject,
                  available_from: e._d.toUTCString(),
                })
              }
            />
          </Form.Item>

          <Form.Item
            style={{ display: "inline-block", width: "calc(50% - 5px)" }}
            name="availabe_To"
            label="Avaliable To"
            required
            rules={rules.comparePrice}
          >
            <DatePicker
              showTime
              placeholder="Select Time"
              className="w-100"
              onOk={(e) =>
                setPostObject({
                  ...postObject,
                  available_to: e._d.toUTCString(),
                })
              }
            />
          </Form.Item>

          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            name="reservation_available_from"
            label="Reservation From"
            rules={rules.price}
          >
            <DatePicker
              showTime
              className="w-100"
              placeholder="Select Time"
              onOk={(e) =>
                setPostObject({
                  ...postObject,
                  reservation_available_from: e._d.toUTCString(),
                })
              }
            />
          </Form.Item>

          <Form.Item
            style={{ display: "inline-block", width: "calc(50% - 5px)" }}
            name="reservation_available_to"
            label="Reservation To"
            required
            rules={rules.comparePrice}
          >
            <DatePicker
              showTime
              placeholder="Select Time"
              className="w-100"
              onOk={(e) =>
                setPostObject({
                  ...postObject,
                  reservation_available_to: e._d.toUTCString(),
                })
              }
            />
          </Form.Item>

          <Form.Item required name="capacity" label="Capacity">
            <Input
              type="number"
              placeholder="Please enter the Capacity"
              name="capacity"
              value={postObject.capacity}
              defaultValue={postObject.capacit}
              onChange={(e) =>
                setPostObject({ ...postObject, capacity: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item required name="payment_method" label="Payment Method">
            <Select
              showSearch
              placeholder="Select a Payment Method"
              onSelect={(e) =>
                setPostObject({ ...postObject, payment_method_id: e })
              }
              optionFilterProp="children"
              className="w-100"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {paymentMethodList?.map((element) => (
                <Option key={element.id} value={element.id}>
                  {element.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card
          title="Package Summary"
          style={{
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: 320,
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}
          >
            {currentPackage.map((element, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      marginBottom: 10,
                      flex: 1,
                      fontWeight: "bold",
                    }}
                  >
                    <h5>{element.product_name}</h5>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      marginBottom: 10,
                      justifyContent: "center",
                      fontWeight: "500",
                      flex: 1,
                    }}
                  >
                    <h5>{element.new_price} EGP</h5>
                  </div>
                  <DeleteOutlined
                    className="cursor-pointer"
                    onClick={() =>
                      setPackage(
                        currentPackage.filter(
                          (product) => product.product_id !== element.product_id
                        )
                      )
                    }
                    style={{ color: "tomato", marginRight: 5 }}
                  />
                </div>
              );
            })}
          </div>
          <div
            style={{
              height: 50,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
            className="border-top"
          >
            <h3>Total Price</h3>
            <h2>
              {currentPackage.length == 0
                ? "0 "
                : currentPackage.reduce(
                    (acc, value) =>
                      parseFloat(acc) + parseFloat(value.new_price),
                    0
                  )}
              {"    "}
              EGP
            </h2>
          </div>
        </Card>
      </Col>
      <Card title="Organization" className="w-100 mr-2 ml-2">
        {/* <Form.Item name="category" label="Category">
            <Select
              showSearch
              placeholder="Select a Category"
              onSelect={(id) =>
                handelSelection(`stores/${id}`, "store", "service_id", id)
              }
              disabled={!postObject.payment_method_id}
              optionFilterProp="children"
              className="w-100"
              onChange={(e) => setOperation({ ...operations, service_id: e })}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {category?.map((element) => (
                <Option key={element.id} value={element.id}>
                  {element.name_en}
                </Option>
              ))}
            </Select>
          </Form.Item> */}

        <Form.Item required name="category" label="Category">
          <Select
            showSearch
            placeholder="Select a Category"
            onSelect={(id) => handleSellerList(id)}
            disabled={!postObject.payment_method_id}
            optionFilterProp="children"
            className="w-100"
            onChange={(e) => setOperation({ ...operations, service_id: e })}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {category?.map((element) => (
              <Option key={element.id} value={element.id}>
                {element.name_en}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item required name="stores" label="Stores">
          <Select
            showSearch
            disabled={!operations.service_id}
            placeholder="Select a Store"
            onSelect={(id) =>
              handelSelection(
                `products/${operations.service_id}/${id}`,
                "product",
                "store_id",
                id
              )
            }
            optionFilterProp="children"
            className="w-100"
            onChange={(e) => setOperation({ ...operations, store_id: e })}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {requestedData?.store?.map((element) => (
              <Option key={element.id} value={element.id}>
                {element.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* <Form.Item name="stores" label="Stores">
            <Select
              showSearch
              disabled={!operations.service_id}
              placeholder="Select a Store"
              onSelect={(id) =>
                handleSellerList(id)
              }
              optionFilterProp="children"
              className="w-100"
              onChange={(e) => setOperation({ ...operations, store_id: e })}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {requestedData?.store?.map((element) => (
                <Option key={element.id} value={element.id}>
                  {element.name}
                </Option>
              ))}
            </Select>
          </Form.Item> */}
        {operations.store_id !== null && (
          <Form.Item required name="products" label="Product">
            <Row gutter={16}>
              {requestedData?.product?.map((element, index) => (
                <Col xs={24} sm={24} lg={8} xl={8} xxl={6} key={element.id}>
                  <GridItem
                    data={element}
                    key={element.id}
                    index={index}
                    element={element}
                  />
                </Col>
              ))}
            </Row>

            {/* <Select
            showSearch
            disabled={!operations.store_id}
            placeholder="Select a Product"
            onSelect={(id, t) => {
              handleProduct(id, t);
            }}
            optionFilterProp="children"
            className="w-100"
            onChange={(e, t) => {
              setOperation({
                ...operations,
                product_id: e,
                product_name: t.children,
              });
            }}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {requestedData?.product?.map((element) => (
              <Option key={element.id} value={element.id}>
                {element.product_name}
              </Option>
            ))}
          </Select> */}
          </Form.Item>
        )}

        <Row gutter={16}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="currentPrice"
              label="Old Price"
              rules={rules.comparePrice}
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
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="comparePrice"
              label="New Price"
              rules={rules.comparePrice}
            >
              <Input
                className="w-100"
                disabled={!operations.product_id}
                onChange={(e) => {
                  setOperation({
                    ...operations,
                    new_price: e.target.value,
                  });
                }}
                addonAfter="EGP"
                onPressEnter={(e) => e.preventDefault()}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
          </Col>
        </Row>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            disabled={
              !operations.new_price ||
              operations.new_price == 0 ||
              !operations.store_id ||
              postObject.capacity == currentPackage.length
            }
            type="primary"
            onClick={handelAddToPackage}
          >
            Add To Package
          </Button>
        </div>
      </Card>
    </Row>
  );
};

export default GeneralField;
