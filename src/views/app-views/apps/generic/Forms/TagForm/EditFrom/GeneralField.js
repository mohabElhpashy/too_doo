import { Card, Col, Form, Input, InputNumber, Row, Select, Upload } from "antd";
import { useFetch } from "hooks";
import React, { useState, useMemo } from "react";
import countryList from "react-select-country-list";

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
  serviceList,
  checkViewMode,
}) => {
  return (
    <Row xs={24} sm={24} md={17}>
      <Card title="Basic Info" className="w-100">
        <Form.Item
          required
          name="name"
          label="Tag Name:"
          // rules={[{ required: true }]}
        >
          <Input
            onPressEnter={(e) => e.preventDefault()}
            defaultValue={postObject?.name}
            disabled={checkViewMode}
            onChange={(e) =>
              setPostObject({ ...postObject, name: e.target.value })
            }
            placeholder="Please enter the Tag Name"
          />
        </Form.Item>
        <Form.Item
          name="service_id"
          required
          label={<span>Service Name&nbsp;</span>}
        >
          <Select
            showSearch
            placeholder="Select The Service Name"
            disabled={checkViewMode}
            optionFilterProp="children"
            onChange={(e) => setPostObject({ ...postObject, service_id: e })}
            defaultValue={postObject?.service_id}
            value={postObject?.service_id}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {serviceList?.map((element) => (
              <Option key={element.id} value={element.id}>
                {element?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Card>
    </Row>
  );
};

export default GeneralField;
