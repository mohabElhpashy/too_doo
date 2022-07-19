import { Card, Form, Input, Row, Select } from "antd";
import { languageValidator } from "constants/helperFunctions";
import { ARABIC_alpha, ENGLISH_ALPH } from "constants/LanguagesConstent";
import { lowerCase } from "lodash";
import React, { useState } from "react";

const GeneralField = ({
  postObject,
  setPostObject,
  countryList,
  checkViewMode,
  setButtonChecker,
}) => {
  const [feildChecker, setFieldChecker] = useState({
    name_en: true,
    name_ar: true,
  });
  return (
    <Row xs={24} sm={24} md={17}>
      <Card title="Basic Info" className="w-100">
        <Form.Item
          required
          name="name_ar"
          label="Name in Arabic:"
          onPressEnter={(e) => e.preventDefault()}
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
                      setButtonChecker(true);
                      return Promise.resolve();
                    } else {
                      setButtonChecker(false);
                      return Promise.reject("Please enter The Name in Arabic");
                    }
                  },
                }),
          ]}
        >
          <Input
            name="name_ar"
            disabled={checkViewMode}
            placeholder="Please enter the Name in Arabic "
            defaultValue={postObject.name}
            onChange={(e) => {
              setFieldChecker({ ...feildChecker, name_ar: false });

              setPostObject({ ...postObject, name_ar: e.target.value });
            }}
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>
        <Form.Item
          required
          name="name_en"
          label="Name in English:"
          onPressEnter={(e) => e.preventDefault()}
          rules={[
            feildChecker.name_en
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
                      return Promise.reject("Please enter The Name in English");
                    }
                  },
                }),
          ]}
        >
          <Input
            name="name_en"
            disabled={checkViewMode}
            placeholder="Please enter the Name in English "
            defaultValue={postObject.name}
            onChange={(e) => {
              setFieldChecker({ ...feildChecker, name_en: false });

              setPostObject({ ...postObject, name_en: e.target.value });
            }}
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>

        <Form.Item required name="country_id" label="Country:">
          <Select
            disabled={checkViewMode}
            onPressEnter={(e) => e.preventDefault()}
            showSearch
            defaultValue={postObject.country_id}
            onSelect={(e) => setPostObject({ ...postObject, country_id: e })}
            placeholder="Select a Country"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {countryList?.map((element, index) => (
              <Select.Option key={index} value={element.id}>
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
