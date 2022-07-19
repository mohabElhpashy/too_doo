import { Card, Col, Form, Input, InputNumber, Row, Select, Upload } from "antd";
import { languageValidator } from "constants/helperFunctions";
import { ARABIC_alpha, ENGLISH_ALPH } from "constants/LanguagesConstent";
import { useFetch } from "hooks";
import React, { useState, useMemo } from "react";
import countryList from "react-select-country-list";

const { Dragger } = Upload;
const { Option } = Select;

const GeneralField = ({ postObject, setPostObject, checkViewMode }) => {
  const [feildChecker, setFeildChecker] = useState({
    name_ar: true,
    name_en: true,
  });
  return (
    <Row xs={24} sm={24} md={17}>
      <Card title="Basic Info" className="w-100">
        <Form.Item
          required
          name="name_ar"
          label="Details Type Name in Arabic:"
          hasFeedback
          rules={[
            feildChecker.name_ar
              ? []
              : ({ getFieldValue }) => ({
                  validator(_, value) {
                    const checkValidation = languageValidator(
                      value,
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
            defaultValue={postObject?.name_ar}
            disabled={checkViewMode}
            onChange={(e) => {
              setFeildChecker({ ...feildChecker, name_ar: false });
              setPostObject({ ...postObject, name_ar: e.target.value });
            }}
            placeholder="Please enter the Tag Name"
          />
        </Form.Item>
        <Form.Item
          required
          hasFeedback
          name="name_en"
          label="Details Type Name in English:"
          // rules={[{ required: true }]}
        >
          <Input
            name="name_en"
            onPressEnter={(e) => e.preventDefault()}
            defaultValue={postObject?.name_en}
            disabled={checkViewMode}
            rules={[
              feildChecker.name_ar
                ? []
                : ({ getFieldValue }) => ({
                    validator(_, value) {
                      const checkValidation = languageValidator(
                        value,
                        ENGLISH_ALPH
                      );
                      if (checkValidation) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          "Please enter The Name in Arabic"
                        );
                      }
                    },
                  }),
            ]}
            onChange={(e) => {
              setFeildChecker({ ...feildChecker, name_en: false });
              setPostObject({ ...postObject, name_en: e.target.value });
            }}
            placeholder="Please enter the Details Type"
          />
        </Form.Item>
      </Card>
    </Row>
  );
};

export default GeneralField;
