import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Upload,
} from "antd";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks";
import React, { useState, useMemo } from "react";
import { UploadOutlined } from "@ant-design/icons";

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

const GeneralField = ({ postObject, setPostObject, countryList }) => {
  return (
    <Row xs={24} sm={24} md={17}>
      <Card title="Basic Info" className="w-100">
        <Form.Item
          name="name_ar"
          label="Name in Arabic:"
          onPressEnter={(e) => e.preventDefault()}
          rules={[{ required: true, message: "Please enter Name in Arabic" }]}
        >
          <Input
            placeholder="Please enter the Name in Arabic "
            onChange={(e) =>
              setPostObject({ ...postObject, name_ar: e.target.value })
            }
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>
        <Form.Item
          name="name_en"
          label="Name in English:"
          onPressEnter={(e) => e.preventDefault()}
          rules={[{ required: true, message: "Please enter Name in English" }]}
        >
          <Input
            placeholder="Please enter the Name in English "
            onChange={(e) =>
              setPostObject({ ...postObject, name_en: e.target.value })
            }
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>

        <Form.Item required name="country_id" label="Country:">
          <Select
            onPressEnter={(e) => e.preventDefault()}
            showSearch
            onSelect={(e) => setPostObject({ ...postObject, country_id: e })}
            placeholder="Select a Country"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {countryList?.map((element, index) => (
              <Select.Option key={index} value={element.id}>
                {element?.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Card>
    </Row>
  );
};

export default GeneralField;
