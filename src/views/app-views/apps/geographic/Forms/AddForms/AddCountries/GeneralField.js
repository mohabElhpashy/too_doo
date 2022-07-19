import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message, Row, Select, Upload } from "antd";
import service from "auth/FetchInterceptor";
import { languageValidator } from "constants/helperFunctions";
import { ARABIC_alpha, ENGLISH_ALPH } from "constants/LanguagesConstent";
import React, { useMemo } from "react";
import countryList from "react-select-country-list";

const { Dragger } = Upload;
const { Option } = Select;

const GeneralField = ({ postObject, setPostObject }) => {
  const options = useMemo(() => countryList().getData(), []);

  const uploadHandler = async (options, name) => {
    const key = "updatable";
    message.loading({ content: "Loading...", key, duration: 15 });

    const imageObject = { type: "Dress", file: options.file };
    const data = new FormData();
    try {
      for (const key of Object.keys(imageObject)) {
        data.append(key, imageObject[key]);
      }
      const test = await service.post("/upload_media", data);
      message.success({
        content: `${test.fileName} Uploaded Successfully!`,
        key,
        duration: 2,
      });
      setPostObject({ ...postObject, icon: test.fileName });
    } catch (error) {}
  };
  return (
    <Row xs={24} sm={24} md={17}>
      <Card title="Basic Info" className="w-100">
        <Form.Item
          name="name_ar"
          hasFeedback
          required
          label="Name in Arabic:"
          onPressEnter={(e) => e.preventDefault()}
          rules={[
            {
              whitespace: true,
            },
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
            placeholder="Please enter the Name in Arabic "
            onChange={(e) =>
              setPostObject({ ...postObject, name_ar: e.target.value })
            }
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>
        <Form.Item
          name="name_en"
          hasFeedback
          required
          label="Name in English:"
          onPressEnter={(e) => e.preventDefault()}
          rules={[
            {
              whitespace: true,
            },
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
            placeholder="Please enter the Name in English "
            onChange={(e) =>
              setPostObject({ ...postObject, name_en: e.target.value })
            }
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>

        <Form.Item required name="country_code" label="Country Code:">
          <Select
            onPressEnter={(e) => e.preventDefault()}
            showSearch
            onSelect={(e) => setPostObject({ ...postObject, country_code: e })}
            placeholder="Select a Country"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {options?.map((element, index) => (
              <Select.Option key={index} value={element.value}>
                {element?.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item required name="icon" label="Country Image:">
          <Upload
            defaultFileList={[]}
            fileList={[]}
            customRequest={(options) => uploadHandler(options, "main_image")}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </Card>
    </Row>
  );
};

export default GeneralField;
