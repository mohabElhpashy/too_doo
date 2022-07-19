import { Card, Form, Input, Row, Select } from "antd";
import service from "auth/FetchInterceptor";
import { numberValidator } from "constants/helperFunctions";
import { NUMBER_CONSTANTS } from "constants/LanguagesConstent";
import React from "react";

const { Option } = Select;

const GeneralField = ({
  postObject,
  setPostObject,
  offlineClients,
  services,
  requestedData,
  setRequestedData,
}) => {
  const handleSelection = async (id) => {
    setPostObject({ ...postObject, seller_id: id });

    try {
      const data = await service.get(`/web/products/6/${id}`);
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
            defaultValue={postObject.offline_client_id}
            onSelect={(e) =>
              setPostObject({ ...postObject, offline_client_id: e })
            }
            onChange={(e) =>
              setPostObject({ ...postObject, offline_client_id: e })
            }
            value={postObject.offline_client_id}
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
          <Select
            showSearch
            placeholder="Select a Service"
            optionFilterProp="children"
            disabled
            defaultValue={"Trips"}
            // onSelect={(e) => setPostObject({ ...postObject, service_id: e })}
            // onChange={(e) => setPostObject({ ...postObject, service_id: e })}
            value={postObject.service_id}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {services?.map((element) => (
              <Option key={element.id} value={element.id}>
                {element.name_en}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item required label="Seller Name:" name="seller_name">
          <Select
            showSearch
            placeholder="Select a Seller"
            optionFilterProp="children"
            defaultValue={postObject.seller_id}
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
          name="product_id"
          label="Product Name:"
          onPressEnter={(e) => e.preventDefault()}
        >
          <Select
            showSearch
            placeholder="Select a Product"
            optionFilterProp="children"
            defaultValue={postObject.product_id}
            onSelect={(e) => setPostObject({ ...postObject, product_id: e })}
            onChange={(e) => setPostObject({ ...postObject, product_id: e })}
            value={postObject.product_id}
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

        <Form.Item
          required
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!numberValidator(value, NUMBER_CONSTANTS)) {
                  return Promise.reject("Your Cant include Charcters");
                } else {
                  return Promise.resolve();
                }
              },
            }),
          ]}
          name="price"
          label="Price"
        >
          <Input
            onChange={(e) =>
              setPostObject({ ...postObject, price: e.target.value })
            }
            placeholder="Please Enter The Price"
            value={postObject.pirce}
            addonAfter="EGP"
          />
        </Form.Item>
      </Card>
    </Row>
  );
};

export default GeneralField;
