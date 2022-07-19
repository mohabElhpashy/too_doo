import React, { useState } from "react";
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
  Button,
  DatePicker,
} from "antd";
import { ImageSvg } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import { LoadingOutlined } from "@ant-design/icons";
import { useFetch } from "hooks";
import { DeleteOutlined } from "@ant-design/icons";
import service from "auth/FetchInterceptor";
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
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const { RangePicker } = DatePicker;

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
}) => {
  const [currentPrice, setCurrentPrice] = useState("0");
  const handelSelection = async (endPoint, type, typeId, input) => {
    setOperation({ ...operations, [typeId]: input });
    try {
      const data = await service.get(`/web/${endPoint}`).then((res) => res);
      setRequestedData({ ...requestedData, [type]: [...data.data] });
    } catch (error) {}
  };
  //Handel Add To Package
  const handelAddToPackage = () => {
    setPackage([...currentPackage, operations]);
    setOperation({
      service_id: "",
      store_id: "",
      product_id: "",
      newPrice: "",
      product_name: "",
    });
  };
  //Select Product
  const handleProduct = (id, t) => {
    setCurrentPrice(
      requestedData?.product[
        requestedData.product?.findIndex((element) => element.id == id)
      ]?.price
    );
    setOperation({ ...operations, product_id: id, product_name: t.children });
  };
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item
            name="namr_en"
            label="English Name"
            rules={rules.name}
            defaultValue={postObject.name_en}
          >
            <Input
              onChange={(e) =>
                setPostObject({ ...postObject, name_en: e.target.value })
              }
              placeholder="Name in Enlgish"
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
        </Card>
        {/* <Card title="Pricing">
				<Row gutter={16}>
				<Col xs={24} sm={24} md={12}>
						<Form.Item   name="currentPrice" label="Current price" rules={rules.comparePrice}>
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
						<Form.Item name="comparePrice" label="After Package price" rules={rules.comparePrice}>
							<Input
								className="w-100"
								disabled={!postObject.product_id}
								addonAfter="EGP"
								onPressEnter={(e)=> e.preventDefault()}
								value={0}
								parser={value => value.replace(/\$\s?|(,*)/g, '')}
							/>
						</Form.Item>
					</Col> */}
        {/* <Col xs={24} sm={24} md={12}>
						<Form.Item name="cost" label="Cost per item" rules={rules.cost}>
							<InputNumber
								className="w-100"
								formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								parser={value => value.replace(/\$\s?|(,*)/g, '')}
							/>
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={12}>
						<Form.Item name="taxRate" label="Tax rate" rules={rules.taxRate}>
							<InputNumber
								className="w-100"
								min={0}
								max={100}
								formatter={value => `${value}%`}
								parser={value => value.replace('%', '')}
							/>
						</Form.Item>
					</Col> */}
        {/* </Row>
			</Card> */}
      </Col>
      <Col xs={24} sm={24} md={7}>
        {/* <Card title="Media">
				<Dragger {...imageUploadProps} beforeUpload={beforeUpload} onChange={e=> props.handleUploadChange(e)}>
					{
						props.uploadedImg ? 
						<img src={props.uploadedImg} alt="avatar" className="img-fluid" /> 
						: 
						<div>
							{
								props.uploadLoading ? 
								<div>
									<LoadingOutlined className="font-size-xxl text-primary"/>
									<div className="mt-3">Uploading</div>
								</div> 
								: 
								<div>
									<CustomIcon className="display-3" svg={ImageSvg}/>
									<p>Click or drag file to upload</p>
								</div>
							}
						</div>
					}
				</Dragger>
			</Card> */}
        <Card title="Organization">
          <Form.Item name="category" label="Category">
            <Select
              showSearch
              placeholder="Select a Category"
              onSelect={(id) =>
                handelSelection(`stores/${id}`, "store", "service_id", id)
              }
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

          <Form.Item name="stores" label="Stores">
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

          <Form.Item name="products" label="Product">
            <Select
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
            </Select>
          </Form.Item>
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
                    setOperation({ ...operations, newPrice: e.target.value });
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
            <Button type="primary" onClick={handelAddToPackage}>
              Add To Package
            </Button>
          </div>
        </Card>
        <Card
          title="Package Summary"
          style={{
            maxHeight: 250,
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: 120,
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
                    flex: 1,
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
                    <h8>{element.product_name}</h8>
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
                    <h8>{element.newPrice} EGP</h8>
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
                      parseFloat(acc) + parseFloat(value.newPrice),
                    0
                  )}
              {"    "}
              EGP
            </h2>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
