import { Card, Col, Form, Input, InputNumber, Row, Select, Upload } from "antd";
import { languageValidator } from "constants/helperFunctions";
import { ARABIC_alpha, ENGLISH_ALPH } from "constants/LanguagesConstent";
import { useFetch } from "hooks";
import { lowerCase } from "lodash";
import React, { useState, useMemo } from "react";
import countryList from "react-select-country-list";

const { Dragger } = Upload;
const { Option } = Select;

const GeneralField = ({
  postObject,
  setPostObject,
  serviceList,
  checkViewMode,
}) => {
  const [feildChecker, setFeildChecker] = useState({
    name_en: true,
    name_ar: true,
  });

  return (
    <Row xs={24} sm={24} md={17}>
      <Card title="Basic Info" className="w-100">
        <Form.Item
          required
          name="name_ar"
          label="Details Type Name in Arabic:"
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
          name="name_en"
          label="Details Type Name in English:"
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
            disabled={checkViewMode}
            defaultValue={postObject?.name_en}
            onChange={(e) => {
              setFeildChecker({ ...feildChecker, name_en: false });

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
            disabled={true}
            placeholder="Select The Service Name"
            defaultValue={"Dresses"}
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
                {element?.name_en}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Card>
    </Row>
  );
};

export default GeneralField;
