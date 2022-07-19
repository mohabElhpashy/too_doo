import { Card, Form, Input, Row } from "antd";
import { languageValidator } from "constants/helperFunctions";
import { ARABIC_alpha, ENGLISH_ALPH } from "constants/LanguagesConstent";
import React from "react";

const GeneralField = ({ postObject, setPostObject }) => {
  return (
    <Row xs={24} sm={24} md={17}>
      <Card title="Basic Info" className="w-100">
        <Form.Item
          name="name_ar"
          required
          label="Name in Arabic:"
          onPressEnter={(e) => e.preventDefault()}
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value)
                  return Promise.reject("Please enter The Name in Arabic");

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
          style={{
            display: "inline-block",
            width: "calc(50% - 5px)",
            marginRight: 8,
          }}
        >
          <Input
            placeholder="Please enter the Name in Arabic "
            onChange={(e) =>
              setPostObject({ ...postObject, name_ar: e.target.value })
            }
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>
        <Form.Item
          name="name_en"
          label="Name in English:"
          required
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value)
                  return Promise.reject("Please enter The Name in English");

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
          style={{ display: "inline-block", width: "calc(50% - 5px)" }}
        >
          <Input
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
