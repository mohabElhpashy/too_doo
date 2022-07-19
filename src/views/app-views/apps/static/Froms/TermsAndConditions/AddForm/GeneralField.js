import { Card, Form, Input, Row, Select } from "antd";
import React from "react";

const { Option } = Select;

const TYPE_ARRAY = [
  { id: 0, type: "General" },
  { id: 1, type: "Secondary" },
];

const GeneralField = ({ postObject, setPostObject }) => {
  return (
    <Row xs={24} sm={24} md={17}>
      <Card title="Basic Info" className="w-100">
        <Form.Item name="type" required label={<span>Type&nbsp;</span>}>
          <Select
            showSearch
            placeholder="Select The Type"
            defaultValue={postObject?.type}
            optionFilterProp="children"
            onSelect={(e) =>
              setPostObject({ ...postObject, type: e.toUpperCase() })
            }
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {TYPE_ARRAY?.map((element) => (
              <Option key={element.id} value={element.type}>
                {element?.type}
              </Option>
            ))}
          </Select>
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
