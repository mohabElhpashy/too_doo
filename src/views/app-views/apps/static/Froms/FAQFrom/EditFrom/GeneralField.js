import { Card, Form, Input, Row } from "antd";
import React from "react";

const GeneralField = ({ postObject, setPostObject, checkViewMode }) => {
  return (
    <Row xs={24} sm={24} md={17}>
      <Card title="Basic Info" className="w-100">
        <Form.Item
          name="question_ar"
          label="Question in Arabic:"
          onPressEnter={(e) => e.preventDefault()}
          rules={[
            { required: true, message: "Please enter Question in Arabic" },
          ]}
        >
          <Input.TextArea
            placeholder="Please enter the Question in Arabic "
            defaultValue={postObject?.question_ar}
            disabled={checkViewMode}
            onChange={(e) =>
              setPostObject({ ...postObject, question_ar: e.target.value })
            }
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>
        <Form.Item
          name="question_en"
          label="Question in English:"
          rules={[{ required: true }]}
        >
          <Input
            onPressEnter={(e) => e.preventDefault()}
            defaultValue={postObject?.question_en}
            disabled={checkViewMode}
            onChange={(e) =>
              setPostObject({ ...postObject, question_en: e.target.value })
            }
            placeholder="Please enter the Question in English"
          />
        </Form.Item>

        <Form.Item
          name="answer_ar"
          label="Answer in Arabic:"
          onPressEnter={(e) => e.preventDefault()}
          rules={[{ required: true, message: "Please enter Answer" }]}
        >
          <Input.TextArea
            placeholder="Please enter the Answer in Arabic "
            defaultValue={postObject?.answer_ar}
            disabled={checkViewMode}
            onChange={(e) =>
              setPostObject({ ...postObject, answer_ar: e.target.value })
            }
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>

        <Form.Item
          name="answer_en"
          label="Answer in English:"
          rules={[{ required: true }]}
        >
          <Input.TextArea
            onPressEnter={(e) => e.preventDefault()}
            defaultValue={postObject?.answer_en}
            disabled={checkViewMode}
            onChange={(e) =>
              setPostObject({ ...postObject, answer_en: e.target.value })
            }
            placeholder="Please enter the Answer in English"
          />
        </Form.Item>
      </Card>
    </Row>
  );
};

export default GeneralField;
