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

const marital_status = [
  { id: 0, status: "Single" },
  { id: 1, status: "Married" },
  { id: 2, status: "Divorced" },
  { id: 3, status: "Widowed" },
];
const gender = [
  { id: 0, gender: "Male" },
  { id: 1, gender: "Female" },
  { id: 2, gender: "Other" },
];
const GeneralField = ({ postObject, setPostObject, checkViewMode }) => {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const { services } = useFetch("services");
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}></Select>
    </Form.Item>
  );
  return (
    <Row xs={24} sm={24} md={17}>
      <Card title="Basic Info" className="w-100">
        <Form.Item
          name="title_ar"
          label="Title in Arabic:"
          onPressEnter={(e) => e.preventDefault()}
          rules={[{ required: true, message: "Please enter Title in Arabic" }]}
          style={{
            display: "inline-block",
            width: "calc(50% - 5px)",
            marginRight: 8,
          }}
        >
          <Input
            placeholder="Please enter the Title in Arabic "
            onChange={(e) =>
              setPostObject({ ...postObject, title_ar: e.target.value })
            }
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>
        <Form.Item
          name="title_en"
          label="Title in English:"
          rules={[{ required: true, message: "Please enter the Latitude" }]}
          style={{ display: "inline-block", width: "calc(50% - 5px)" }}
        >
          <Input
            onPressEnter={(e) => e.preventDefault()}
            onChange={(e) =>
              setPostObject({ ...postObject, title_en: e.target.value })
            }
            placeholder="Please enter the Title in English"
          />
        </Form.Item>

        <Form.Item
          name="body_ar"
          label="Body in Arabic:"
          onPressEnter={(e) => e.preventDefault()}
          rules={[{ required: true, message: "Please enter Body" }]}
        >
          <Input.TextArea
            placeholder="Please enter the Body in Arabic "
            onChange={(e) =>
              setPostObject({ ...postObject, body_ar: e.target.value })
            }
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>

        <Form.Item
          name="body_en"
          label="Body in English:"
          rules={[{ required: true, message: "Please enter the Latitude" }]}
        >
          <Input.TextArea
            onPressEnter={(e) => e.preventDefault()}
            onChange={(e) =>
              setPostObject({ ...postObject, body_en: e.target.value })
            }
            placeholder="Please enter the Body in English"
          />
        </Form.Item>
      </Card>
    </Row>
  );
};

export default GeneralField;
