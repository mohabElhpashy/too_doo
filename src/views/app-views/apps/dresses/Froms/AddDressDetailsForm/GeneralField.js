import { Card, Form, Input, Row, Select } from "antd";
import { languageValidator } from "constants/helperFunctions";
import { ARABIC_alpha, ENGLISH_ALPH } from "constants/LanguagesConstent";
import React from "react";

const { Option } = Select;

const GeneralField = ({ postObject, setPostObject, services }) => {
  return (
    <Row xs={24} sm={24} md={17}>
      <Card title="Basic Info" className="w-100">
        <Form.Item
          required
          hasFeedback
          name="name_ar"
          label="Details Type Name in Arabic:"
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
            placeholder="Please enter the Tag Name"
          />
        </Form.Item>
        <Form.Item
          required
          hasFeedback
          name="name_en"
          label="Details Type Name in English:"
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
                  return Promise.reject("Please enter The Name in Arabic");
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
            optionFilterProp="children"
            value={postObject?.service_id}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {services?.map((element) => (
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
