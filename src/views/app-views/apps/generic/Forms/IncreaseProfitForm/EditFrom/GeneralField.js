import { Card, Form, Input, Row, Select } from "antd";
import React, { useState } from "react";
import { languageValidator, numberValidator } from "constants/helperFunctions";

import {
  ARABIC_alpha,
  ENGLISH_ALPH,
  NUMBER_CONSTANTS,
} from "constants/LanguagesConstent";
import { lowerCase } from "lodash";

const GeneralField = ({
  postObject,
  setPostObject,
  checkViewMode,
  servicesList,
  setButtonChecker,
}) => {
  const [feildChecker, setFieldChecker] = useState({
    number: true,
    subject_ar: true,
    subject_en: true,
    body_ar: true,
    body_en: true,
  });
  return (
    <Row xs={24} sm={24} md={17}>
      <Card title="Basic Info" className="w-100">
        <Form.Item
          name="subject_ar"
          label="Subject in Arabic:"
          hasFeedback
          required
          onPressEnter={(e) => e.preventDefault()}
          rules={[
            feildChecker.subject_ar
              ? []
              : ({ getFieldValue }) => ({
                  validator(_, value) {
                    const checkValidation = languageValidator(
                      value,
                      ARABIC_alpha
                    );
                    if (checkValidation) {
                      setButtonChecker(true);
                      return Promise.resolve();
                    } else {
                      setButtonChecker(false);
                      return Promise.reject(
                        "Please enter The Subject in Arabic"
                      );
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
            placeholder="Please enter the Subject in Arabic"
            defaultValue={postObject?.subject_ar}
            disabled={checkViewMode}
            onChange={(e) => {
              setPostObject({ ...postObject, subject_ar: e.target.value });
              setFieldChecker({ ...feildChecker, subject_ar: false });
            }}
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="subject_en"
          label="Subject in English:"
          required
          rules={[
            feildChecker.subject_en
              ? []
              : ({ getFieldValue }) => ({
                  validator(_, value) {
                    const checkValidation = languageValidator(
                      lowerCase(value),
                      ENGLISH_ALPH
                    );
                    if (checkValidation) {
                      setButtonChecker(true);
                      return Promise.resolve();
                    } else {
                      setButtonChecker(false);
                      return Promise.reject(
                        "Please enter The Subject in English"
                      );
                    }
                  },
                }),
          ]}
          style={{ display: "inline-block", width: "calc(50% - 5px)" }}
        >
          <Input
            onPressEnter={(e) => e.preventDefault()}
            disabled={checkViewMode}
            defaultValue={postObject?.subject_en}
            onChange={(e) => {
              setPostObject({ ...postObject, subject_en: e.target.value });
              setFieldChecker({ ...feildChecker, subject_en: false });
            }}
            placeholder="Please enter the Subject in English"
          />
        </Form.Item>

        <Form.Item
          name="body_ar"
          hasFeedback
          label="Body in Arabic:"
          required
          onPressEnter={(e) => e.preventDefault()}
          rules={[
            feildChecker.body_ar
              ? []
              : ({ getFieldValue }) => ({
                  validator(_, value) {
                    const checkValidation = languageValidator(
                      value,
                      ARABIC_alpha
                    );
                    if (checkValidation) {
                      setButtonChecker(true);

                      return Promise.resolve();
                    } else {
                      setButtonChecker(false);
                      return Promise.reject("Please enter The Body in Arabic");
                    }
                  },
                }),
          ]}
        >
          <Input.TextArea
            placeholder="Please enter the Body in Arabic "
            disabled={checkViewMode}
            defaultValue={postObject?.body_ar}
            onChange={(e) => {
              setPostObject({ ...postObject, body_ar: e.target.value });
              setFieldChecker({ ...feildChecker, body_ar: false });
            }}
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>

        <Form.Item
          name="body_en"
          label="Body in English:"
          hasFeedback
          required
          rules={[
            feildChecker.body_en
              ? []
              : ({ getFieldValue }) => ({
                  validator(_, value) {
                    const checkValidation = languageValidator(
                      lowerCase(value),
                      ENGLISH_ALPH
                    );
                    if (checkValidation) {
                      setButtonChecker(true);

                      return Promise.resolve();
                    } else {
                      setButtonChecker(false);
                      return Promise.reject("Please enter The Body in English");
                    }
                  },
                }),
          ]}
        >
          <Input.TextArea
            onPressEnter={(e) => e.preventDefault()}
            disabled={checkViewMode}
            defaultValue={postObject?.body_en}
            onChange={(e) => {
              setPostObject({ ...postObject, body_en: e.target.value });
              setFieldChecker({ ...feildChecker, body_en: false });
            }}
            placeholder="Please enter the Body in English"
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          required
          label="Number"
          name="number"
          rules={[
            feildChecker.number
              ? []
              : ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!numberValidator(value, NUMBER_CONSTANTS)) {
                      setButtonChecker(false);
                      return Promise.reject("Your Cant include Charcters");
                    } else {
                      setButtonChecker(true);

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
            disabled={checkViewMode}
            defaultValue={postObject?.number}
            onChange={(e) => {
              setFieldChecker({ ...feildChecker, number: false });
              setPostObject({ ...postObject, number: e.target.value });
            }}
            className="w-100"
          />
        </Form.Item>
        <Form.Item required name="service_id" label="Service Name:">
          <Select
            onPressEnter={(e) => e.preventDefault()}
            showSearch
            disabled={checkViewMode}
            defaultValue={postObject?.service_id}
            placeholder="Select a Service Name"
            onSelect={(e) => setPostObject({ ...postObject, service_id: e })}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {servicesList?.map((element, index) => (
              <Select.Option key={element.id} value={element.id}>
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
