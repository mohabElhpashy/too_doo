import { Card, Form, Input, Row } from "antd";
import React from "react";

const ClientInfo = ({ postObject, checkViewMode }) => {
  console.log(postObject, "Post Object");
  return (
    <Row xs={24} sm={24} md={17}>
      <Card title="Client Info" className="w-100">
        <Form.Item
          name="first_name"
          label="Client First Name:"
          required
          onPressEnter={(e) => e.preventDefault()}
          style={{
            display: "inline-block",
            width: "calc(50% - 5px)",
            marginRight: 8,
          }}
        >
          <Input
            name="first_name"
            defaultValue={postObject?.client_name.split(" ")[0]}
            disabled={true}
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>
        <Form.Item
          name="last_name"
          required
          label="Client Last Name:"
          rules={[{ required: true }]}
          style={{ display: "inline-block", width: "calc(50% - 5px)" }}
        >
          <Input
            onPressEnter={(e) => e.preventDefault()}
            defaultValue={postObject?.client_name.split(" ")[1]}
            disabled={checkViewMode}
          />
        </Form.Item>

        <Form.Item
          name="email"
          required
          label="Email:"
          onPressEnter={(e) => e.preventDefault()}
          style={{
            display: "inline-block",
            width: "calc(50% - 5px)",
            marginRight: 8,
          }}
        >
          <Input
            name="email"
            defaultValue={postObject?.client_email}
            disabled={true}
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>
        <Form.Item
          name="phone"
          required
          label="Phone Number:"
          style={{ display: "inline-block", width: "calc(50% - 5px)" }}
        >
          <Input
            onPressEnter={(e) => e.preventDefault()}
            defaultValue={postObject?.client_phone}
            disabled={checkViewMode}
          />
        </Form.Item>
      </Card>
    </Row>
  );
};

export default ClientInfo;
