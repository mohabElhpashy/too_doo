import { Card, Form, Input, Row, Select } from "antd";
import React from "react";

const { Option } = Select;

const GeneralField = ({ postObject, setPostObject, services }) => {
  return (
    <Row xs={24} sm={24} md={17}>
      <Card title="Basic Info" className="w-100">
        <Form.Item
          required
          name="name_ar"
          label="Details Type Name in Arabic:"
          // rules={[{ required: true }]}
        >
          <Input
            onPressEnter={(e) => e.preventDefault()}
            onChange={(e) =>
              setPostObject({ ...postObject, name_ar: e.target.value })
            }
            placeholder="Please enter the Tag Name"
          />
        </Form.Item>
        <Form.Item
          required
          name="name_en"
          label="Details Type Name in English:"
          // rules={[{ required: true }]}
        >
          <Input
            onPressEnter={(e) => e.preventDefault()}
            onChange={(e) =>
              setPostObject({ ...postObject, name_en: e.target.value })
            }
            placeholder="Please enter the Details Type"
          />
        </Form.Item>
        <Form.Item
          name="service_id"
          required
          label={<span>Service Name&nbsp;</span>}
        >
          <Select
            showSearch
            disabled={true}
            placeholder="Select The Service Name"
            optionFilterProp="children"
            onChange={(e) => setPostObject({ ...postObject, service_id: e })}
            value={"MakeUp Artist"}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {services?.map((element) => (
              <Option key={element.id} value={element.id}>
                {element?.name_en}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Card>
    </Row>
  );
};

export default GeneralField;
