import { Card, Form, Input, Row } from "antd";
import { languageValidator } from "constants/helperFunctions";
import { ENGLISH_ALPH, ARABIC_alpha } from "constants/LanguagesConstent";
import React, { useState } from "react";

const GeneralField = ({ postObject, setPostObject }) => {
  const [filedChecker, setFieldChecker] = useState({
    name_en: true,
    name_ar: true,
  });
  return (
    <Row xs={24} sm={24} md={17}>
      <Card title="Basic Info" className="w-100">
        <Form.Item
          required
          hasFeedback
          name="name_ar"
          label="Name in Arabic:"
          onPressEnter={(e) => e.preventDefault()}
          rules={[
            filedChecker.name_ar
              ? []
              : ({ getFieldValue }) => ({
                  validator(_, value) {
                    const checkValidation = languageValidator(
                      value.toLowerCase(),
                      ARABIC_alpha
                    );
                    if (checkValidation) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject("Please enter The Name in English");
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
            name="name_ar"
            defaultValue={postObject?.name_ar}
            placeholder="Please enter the Title in Arabic "
            onChange={(e) => {
              setPostObject({ ...postObject, name_ar: e.target.value });
              setFieldChecker({ ...filedChecker, name_ar: false });
            }}
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          required
          name="name_en"
          label="Name in English:"
          rules={[
            filedChecker.name_en
              ? []
              : ({ getFieldValue }) => ({
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
          style={{ display: "inline-block", width: "calc(50% - 5px)" }}
        >
          <Input
            name="name_en"
            onPressEnter={(e) => e.preventDefault()}
            defaultValue={postObject?.name_en}
            onChange={(e) => {
              setFieldChecker({ ...filedChecker, name_en: false });

              setPostObject({ ...postObject, name_en: e.target.value });
            }}
            placeholder="Please enter the Name in English"
          />
        </Form.Item>
      </Card>
    </Row>
  );
};

export default GeneralField;
