import { Card, Form, Input, Row, Select } from "antd";
import React from "react";

const { Option } = Select;

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
            disabled={true}
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
