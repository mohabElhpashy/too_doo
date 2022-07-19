import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message, Row, Upload } from "antd";
import service from "auth/FetchInterceptor";
import { languageValidator } from "constants/helperFunctions";
import { ARABIC_alpha, ENGLISH_ALPH } from "constants/LanguagesConstent";
import { lowerCase } from "lodash";

const GeneralField = ({
  postObject,
  setPostObject,
  countryList,
  checkView,
  setButtonChecker,
}) => {
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
            placeholder="Please enter the Name in Arabic "
            disabled={checkView}
            defaultValue={postObject.name}
            onChange={(e) => {
              setFieldChecker({ ...feildChecker, name_ar: false });

              setPostObject({ ...postObject, name_ar: e.target.value });
            }}
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>
        <Form.Item
          name="name_en"
          required
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
            placeholder="Please enter the Name in English "
            defaultValue={postObject.name}
            disabled={checkView}
            onChange={(e) => {
              setFieldChecker({ ...feildChecker, name_en: false });

              setPostObject({ ...postObject, name_en: e.target.value });
            }}
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>

        {/* <Form.Item required name="country_id" label="Country Code:">
          <Select
            onPressEnter={(e) => e.preventDefault()}
            showSearch
            disabled={checkView}
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
        </Form.Item> */}
        <Form.Item required name="icon" label="Country Image:">
          <Upload
            defaultFileList={[]}
            fileList={[]}
            customRequest={(options) => uploadHandler(options, "main_image")}
          >
            <Button disabled={checkView} icon={<UploadOutlined />}>
              Click to Upload
            </Button>
          </Upload>
        </Form.Item>
      </Card>
    </Row>
  );
};

export default GeneralField;
