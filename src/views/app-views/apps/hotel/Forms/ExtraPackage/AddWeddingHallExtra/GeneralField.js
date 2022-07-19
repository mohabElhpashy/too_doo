import { Card, Form, Input, Row } from "antd";
import { languageValidator } from "constants/helperFunctions";
import { ARABIC_alpha, ENGLISH_ALPH } from "constants/LanguagesConstent";
import React from "react";

const GeneralField = ({ postObject, setPostObject }) => {
  return (
    <Row xs={24} sm={24} md={17}>
      <Card title="Basic Info" className="w-100">
        <Form.Item
          required
          name="name_ar"
          label="Extra Package Name in Arabic:"
          hasFeedback
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                const checkValidation = languageValidator(
                  value.toLowerCase(),
                  ARABIC_alpha
                );
                if (checkValidation) {
                  return Promise.resolve();
                } else {
                  return Promise.reject("Please enter The Name in Arabic");
                }
              },
            }),
          ]}
        >
          <Input
            name="name_ar"
            onPressEnter={(e) => e.preventDefault()}
            onChange={(e) =>
              setPostObject({ ...postObject, name_ar: e.target.value })
            }
            placeholder="Please enter the Name in Arabic"
          />
        </Form.Item>
        <Form.Item
          required
          name="name_en"
          hasFeedback
          label="Extra Package Name in English:"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                const checkValidation = languageValidator(
                  value.toLowerCase(),
                  ENGLISH_ALPH
                );
                if (checkValidation) {
                  return Promise.resolve();
                } else {
                  return Promise.reject("Please enter The Name in English");
                }
              },
            }),
          ]}
        >
          <Input
            name="name_en"
            onPressEnter={(e) => e.preventDefault()}
            onChange={(e) =>
              setPostObject({ ...postObject, name_en: e.target.value })
            }
            placeholder="Please enter the Name in English"
          />
        </Form.Item>
      </Card>
    </Row>
  );
};

export default GeneralField;
