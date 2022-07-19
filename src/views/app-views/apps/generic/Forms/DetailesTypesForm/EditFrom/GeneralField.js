import { Card, Form, Input, Row, Select, Upload } from "antd";
import { languageValidator } from "constants/helperFunctions";
import {
    ARABIC_alpha,
    ARABIC_NUMBER_CHAR,
    ENGLISH_ALPH, ENGLISH_Number_CHAR,
} from "constants/LanguagesConstent";
import React, { useState } from "react";

const { Dragger } = Upload;
const { Option } = Select;

const GeneralField = ({
  postObject,
  setPostObject,
  serviceList,
  checkViewMode,
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
          label="Type Name in Arabic:"
          rules={[
            feildChecker.name_ar
              ? []
              : ({ getFieldValue }) => ({
                  validator(_, value) {
                    const checkValidation = languageValidator(
                      value.toLowerCase(),
                      // ARABIC_alpha
                        ARABIC_NUMBER_CHAR
                    );
                    if (checkValidation) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(
                        "Please enter The Detail in Arabic"
                      );
                    }
                  },
                }),
          ]}
        >
          <Input
            name="name_ar"
            disabled={checkViewMode}
            onPressEnter={(e) => e.preventDefault()}
            defaultValue={postObject?.name_ar}
            onChange={(e) => {
              setFieldChecker({ ...feildChecker, name_ar: false });
              setPostObject({ ...postObject, name_ar: e.target.value });
            }}
            placeholder="Please enter the Tag Name"
          />
        </Form.Item>
        <Form.Item
          required
          name="name_en"
          label="Type Name in English:"
          rules={[
            feildChecker.name_en
              ? []
              : ({ getFieldValue }) => ({
                  validator(_, value) {
                    const checkValidation = languageValidator(
                      value.toLowerCase(),
                      // ENGLISH_ALPH
                        ENGLISH_Number_CHAR
                    );
                    if (checkValidation) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(
                        "Please enter The Detail in English"
                      );
                    }
                  },
                }),
          ]}
        >
          <Input
            name="name_en"
            disabled={checkViewMode}
            onPressEnter={(e) => e.preventDefault()}
            defaultValue={postObject?.name_en}
            onChange={(e) => {
              setFieldChecker({ ...feildChecker, name_en: false });

              setPostObject({ ...postObject, name_en: e.target.value });
            }}
            placeholder="Please enter the Details Type"
          />
        </Form.Item>
        <Form.Item
          name="service_id"
          required
          label={<span>Service Name&nbsp;</span>}
        >
          <Select
            showSearch
            disabled={checkViewMode}
            placeholder="Select The Service Name"
            defaultValue={postObject?.service_id}
            optionFilterProp="children"
            onChange={(e) => setPostObject({ ...postObject, service_id: e })}
            value={postObject?.service_id}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {serviceList?.map((element) => (
              <Option key={element.id} value={element.id}>
                {element?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Card>
    </Row>
  );
};

export default GeneralField;
