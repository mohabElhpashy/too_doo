import { Card, Form, Input, Row, Select } from "antd";
import { languageValidator, numberValidator } from "constants/helperFunctions";
import {
  ARABIC_alpha,
  ENGLISH_ALPH,
  NUMBER_CONSTANTS,
} from "constants/LanguagesConstent";
import { lowerCase } from "lodash";
import React from "react";

const GeneralField = ({ postObject, setPostObject, services }) => {
  return (
    <Row xs={24} sm={24} md={17}>
      <Card title="Basic Info" className="w-100">
        <Form.Item
          name="subject_ar"
          label="Subject in Arabic:"
          required
          onPressEnter={(e) => e.preventDefault()}
          rules={[
            {
              whitespace: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const checkValidation = languageValidator(value, ARABIC_alpha);
                if (checkValidation) {
                  return Promise.resolve();
                } else {
                  return Promise.reject("Please enter The Subject in Arabic");
                }
              },
            }),
          ]}
          style={{
            display: "inline-block",
            width: "calc(50% - 5px)",
            marginRight: 8,
          }}
        >
          <Input
            placeholder="Please enter the Subject in Arabic "
            onChange={(e) =>
              setPostObject({ ...postObject, subject_ar: e.target.value })
            }
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>
        <Form.Item
          name="subject_en"
          label="Subject in English:"
          required
          rules={[
            {
              whitespace: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const checkValidation = languageValidator(
                  lowerCase(value),
                  ENGLISH_ALPH
                );
                if (checkValidation) {
                  return Promise.resolve();
                } else {
                  return Promise.reject("Please enter The Subject in English");
                }
              },
            }),
          ]}
          style={{ display: "inline-block", width: "calc(50% - 5px)" }}
        >
          <Input
            onPressEnter={(e) => e.preventDefault()}
            onChange={(e) =>
              setPostObject({ ...postObject, subject_en: e.target.value })
            }
            placeholder="Please enter the Subject in English"
          />
        </Form.Item>

        <Form.Item
          name="body_ar"
          label="Body in Arabic:"
          required
          onPressEnter={(e) => e.preventDefault()}
          rules={[
            {
              whitespace: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const checkValidation = languageValidator(value, ARABIC_alpha);
                if (checkValidation) {
                  return Promise.resolve();
                } else {
                  return Promise.reject("Please enter The Body in Arabic");
                }
              },
            }),
          ]}
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
          required
          rules={[
            {
              whitespace: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const checkValidation = languageValidator(
                  lowerCase(value),
                  ENGLISH_ALPH
                );
                if (checkValidation) {
                  return Promise.resolve();
                } else {
                  return Promise.reject("Please enter The Body in English");
                }
              },
            }),
          ]}
        >
          <Input.TextArea
            onPressEnter={(e) => e.preventDefault()}
            onChange={(e) =>
              setPostObject({ ...postObject, body_en: e.target.value })
            }
            placeholder="Please enter the Body in English"
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          required
          label="Number"
          name="number"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!numberValidator(value, NUMBER_CONSTANTS)) {
                  return Promise.reject("Your Cant include Charcters");
                } else {
                  return Promise.resolve();
                }
              },
            }),
          ]}
          className="w-100"
        >
          <Input
            name="number"
            placeholder="Enter the Number"
            onChange={(e) =>
              setPostObject({ ...postObject, number: e.target.value })
            }
            className="w-100"
          />
        </Form.Item>
        <Form.Item required name="service_id" label="Service Name:">
          <Select
            onPressEnter={(e) => e.preventDefault()}
            showSearch
            placeholder="Select a Service Name"
            onSelect={(e) => setPostObject({ ...postObject, service_id: e })}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {services?.map((element, index) => (
              <Select.Option key={element.id} value={element.value}>
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
