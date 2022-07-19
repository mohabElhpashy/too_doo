import { Card, Form, Input, Row, Select, Upload } from "antd";
import service from "auth/FetchInterceptor";
import React from "react";

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

const GeneralField = ({
  postObject,
  setPostObject,
  checkViewMode,
  setRequestedData,
  requestedData,
  offlineClients,
}) => {
  const handleSelection = async (id) => {
    setPostObject({ ...postObject, seller_id: id });

    try {
      const data = await service.get(`/web/products/1/${id}`);
      setRequestedData({ ...requestedData, product: data.data });
    } catch (error) {}
  };
  return (
    <Row xs={24} sm={24} md={17}>
      <Card title="Basic Info" className="w-100">
        <Form.Item
          required
          name="client_name"
          label="Client Name:"
          onPressEnter={(e) => e.preventDefault()}
        >
          <Select
            showSearch
            placeholder="Select an Offline Client"
            optionFilterProp="children"
            disabled={checkViewMode}
            defaultValue={postObject?.offline_client_id}
            onSelect={(e) =>
              setPostObject({ ...postObject, offline_client_id: e })
            }
            onChange={(e) =>
              setPostObject({ ...postObject, offline_client_id: e })
            }
            value={postObject?.offline_client_id}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {offlineClients?.map((element) => (
              <Option key={element.id} value={element.id}>
                {element.name_en}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item required label="Service Name:" name="service_name">
          <Input
            defaultValue={"Cars"}
            placeholder="Enter Service Name"
            disabled={true}
          />
        </Form.Item>

        <Form.Item required label="Seller Name:" name="seller_name">
          <Select
            showSearch
            placeholder="Select a Seller"
            optionFilterProp="children"
            disabled={checkViewMode}
            defaultValue={postObject?.seller_id}
            onSelect={(e) => handleSelection(e)}
            onChange={(e) => setPostObject({ ...postObject, seller_id: e })}
            value={postObject.seller_id}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {requestedData.store?.map((element) => (
              <Option key={element.id} value={element.id}>
                {element.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          required
          name="product_name"
          label="Product Name:"
          onPressEnter={(e) => e.preventDefault()}
        >
          <Select
            showSearch
            placeholder="Select a Product"
            optionFilterProp="children"
            disabled={checkViewMode}
            defaultValue={postObject?.product_name}
            onSelect={(e) => setPostObject({ ...postObject, product_id: e })}
            onChange={(e) => setPostObject({ ...postObject, product_id: e })}
            value={postObject?.product_id}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {requestedData.product?.map((element) => (
              <Option key={element.id} value={element.id}>
                {element.product_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="price" label="Price">
          <Input
            onChange={(e) =>
              setPostObject({ ...postObject, price: e.target.value })
            }
            placeholder="Please Enter The Price"
            value={postObject.pirce}
            addonAfter="EGP"
            disabled={checkViewMode}
          />
        </Form.Item>
      </Card>
    </Row>
  );
};

export default GeneralField;
