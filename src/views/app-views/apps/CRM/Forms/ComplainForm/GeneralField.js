import { Card, Form, Input, Row, Select, Upload } from "antd";
import { useFetch } from "hooks";
import React, { useMemo, useState } from "react";
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
          name="user_name"
          label="User Name:"
          onPressEnter={(e) => e.preventDefault()}
        >
          <Input
            disabled={checkViewMode === true}
            defaultValue={postObject?.user_name}
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>

        <Form.Item name="type" label="Type:">
          <Input
            defaultValue={postObject?.type}
            disabled={checkViewMode === true}
          />
        </Form.Item>

        <Form.Item
          name="message"
          label="User Complain:"
          onPressEnter={(e) => e.preventDefault()}
        >
          <Input
            disabled={checkViewMode === true}
            defaultValue={postObject?.message}
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>
      </Card>
    </Row>
  );
};

export default GeneralField;
