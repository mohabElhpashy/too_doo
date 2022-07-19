import { Card, Form, Input, Row } from "antd";
import React from "react";

const GeneralField = ({ postObject, setPostObject, checkViewMode }) => {
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
            name="title_ar"
            placeholder="Please enter the Title "
            defaultValue={postObject.title}
            disabled={checkViewMode}
            onChange={(e) =>
              setPostObject({ ...postObject, title_ar: e.target.value })
            }
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>
        {/* <Form.Item
          name="title_en"
          label="Title in English:"
          rules={[{ required: true }]}
          style={{ display: "inline-block", width: "calc(50% - 5px)" }}
        >
          <Input
            onPressEnter={(e) => e.preventDefault()}
            defaultValue={postObject.title_en}
            disabled={checkViewMode}
            onChange={(e) =>
              setPostObject({ ...postObject, title_en: e.target.value })
            }
            placeholder="Please enter the Title in English"
          />
        </Form.Item> */}

        <Form.Item
          name="body"
          label="Body :"
          onPressEnter={(e) => e.preventDefault()}
          rules={[{ required: true, message: "Please enter Body" }]}
        >
          <Input.TextArea
            placeholder="Please enter the Body in Arabic "
            defaultValue={postObject.body}
            disabled={checkViewMode}
            onChange={(e) =>
              setPostObject({ ...postObject, body: e.target.value })
            }
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>

        {/* <Form.Item
          name="body_en"
          label="Body in English:"
          rules={[{ required: true, message: "Please enter the Latitude" }]}
        >
          <Input.TextArea
            onPressEnter={(e) => e.preventDefault()}
            defaultValue={postObject.body_en}
            disabled={checkViewMode}
            onChange={(e) =>
              setPostObject({ ...postObject, body_en: e.target.value })
            }
            placeholder="Please enter the Body in English"
          />
        </Form.Item> */}
      </Card>
    </Row>
  );
};

export default GeneralField;
