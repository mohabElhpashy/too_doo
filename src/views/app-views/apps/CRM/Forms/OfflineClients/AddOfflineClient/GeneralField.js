import { Card, Form, Input, Row, Select, Upload } from "antd";
import service from "auth/FetchInterceptor";
import {
  ARABIC_alpha,
  ENGLISH_ALPH,
  NUMBER_CONSTANTS,
} from "constants/LanguagesConstent";
import { useFetch } from "hooks";
import React, { useMemo, useState } from "react";
import countryList from "react-select-country-list";

const { Dragger } = Upload;
const { Option } = Select;

const rules = {
  name: [
    {
      required: true,
      message: "Please enter product name",
    },
  ],
  description: [
    {
      required: true,
      message: "Please enter product description",
    },
  ],
  price: [
    {
      required: true,
      message: "Please enter product price",
    },
  ],
  comparePrice: [],
  taxRate: [
    {
      required: true,
      message: "Please enter tax rate",
    },
  ],
  cost: [
    {
      required: true,
      message: "Please enter item cost",
    },
  ],
};

const marital_status = [
  { id: 0, status: "Single" },
  { id: 1, status: "Married" },
  { id: 2, status: "Divorced" },
  { id: 3, status: "Widowed" },
];
const gender = [
  { id: 0, gender: "Male" },
  { id: 1, gender: "Female" },
  { id: 2, gender: "Other" },
];

const languageValidator = (value, lang) => {
  const arrayOfChar = value.split("");
  let checker;
  for (let index = 0; index < arrayOfChar.length; index++) {
    if (lang.find((element) => element === arrayOfChar[index])) {
      checker = true;
    } else {
      checker = false;
      break;
    }
  }
  return checker;
};
const GeneralField = ({ postObject, setPostObject, listOfSellers }) => {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const { services } = useFetch("services");
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}></Select>
    </Form.Item>
  );
  const numberValidator = (value) => {
    const arrayOfChar = value.split("");
    let checker;
    for (let index = 0; index < arrayOfChar.length; index++) {
      if (NUMBER_CONSTANTS.find((element) => element === arrayOfChar[index])) {
        checker = true;
      } else {
        checker = false;
        break;
      }
    }
    return checker;
  };
  const egyptianPhoneValidation = (value) => {
    let resultCheck = false;
    if (value == "1" || value == "2" || value == "0" || value == "5") {
      resultCheck = true;
    }
    return resultCheck;
  };
  return (
    <Row xs={24} sm={24} md={17}>
      <Card title="Basic Info" className="w-100">
        <Form.Item
          name="name_ar"
          label="Name in Arabic:"
          required
          hasFeedback
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
          style={{
            display: "inline-block",
            width: "calc(50% - 5px)",
            marginRight: 8,
          }}
        >
          <Input
            placeholder="Please enter the Offline Client Name in Arabic "
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
          label="Name in English:"
          style={{ display: "inline-block", width: "calc(50% - 5px)" }}
        >
          <Input
            onPressEnter={(e) => e.preventDefault()}
            onChange={(e) =>
              setPostObject({ ...postObject, name_en: e.target.value })
            }
            placeholder="Please enter the Offline Client Name in English"
          />
        </Form.Item>

        {/* <Form.Item required name="password" label="Password:">
          <Input.Password
            onChange={(e) =>
              setPostObject({ ...postObject, password: e.target.value })
            }
            placeholder="Please enter the Client password"
          />
        </Form.Item> */}

        <Form.Item
          name="phone"
          label="Phone Number:"
          onPressEnter={(e) => e.preventDefault()}
          hasFeedback
          rules={[
            {
              whitespace: true,
            },
            ({ getFieldValue }) => ({
              async validator(_, value) {
                if (value.length !== 11) {
                  return Promise.reject("Your Phone Must be 11 digits");
                } else if (
                  value[0] != 0

                  //  &&
                  // (value[2] != 0 ||
                  //   value[2] != 1 ||
                  //   value[2] != 2 ||
                  //   value[2] != 5)
                ) {
                  return Promise.reject("Your Phone Must be Valid Number");
                } else if (!egyptianPhoneValidation(value[2])) {
                  return Promise.reject("Your Phone Must be Valid Number");
                } else if (
                  !numberValidator(
                    value,
                    <Form.Item
                      name="phone"
                      label="Phone Number:"
                      val
                      onPressEnter={(e) => e.preventDefault()}
                      hasFeedback
                      rules={[
                        {
                          whitespace: true,
                        },
                        ({ getFieldValue }) => ({
                          async validator(_, value) {
                            if (value.length !== 11) {
                              console.log(value.length)
                              return Promise.reject(
                                "Your Phone Must be 11 digits"
                              );
                            } else if (value[0] != 0) {
                              return Promise.reject(
                                "Your Phone Must be Valid Number"
                              );
                            } else if (value[1] != 1) {
                              return Promise.reject(
                                "Your Phone Must be Valid Number"
                              );
                            } else if (!egyptianPhoneValidation(value[2])) {
                              return Promise.reject(
                                "Your Phone Must be Valid Number"
                              );
                            } else if (!numberValidator(value)) {
                              return Promise.reject(
                                "Your Cant include Charcters"
                              );
                            } else {
                              if (value.length === 11) {
                                let checkDuplicate;
                                try {
                                  const res = await service.post("web/phones", {
                                    phone: value,
                                  });

                                  if (res[0] === "seller not founded") {
                                    checkDuplicate = false;
                                  } else {
                                    checkDuplicate = true;
                                  }
                                } catch (error) {}
                                if (!checkDuplicate) {
                                  return Promise.resolve();
                                } else {
                                  return Promise.reject(
                                    "This Number is Already Exists"
                                  );
                                }
                              }
                            }
                          },
                        }),
                      ]}
                    >
                      <Input
                        addonBefore={prefixSelector}
                        maxLength={11}
                        onChange={(e) => {
                          setPostObject({
                            ...postObject,
                            phone: e.target.value,
                          });
                        }}
                        onPressEnter={(e) => e.preventDefault()}
                        value={postObject.phone}
                        placeholder="Please enter your Phone Number"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  )
                ) {
                  return Promise.reject("Your Cant include Charcters");
                } else {
                  if (value.length === 11) {
                    let checkDuplicate;
                    try {
                      const res = await service.post("web/phones", {
                        phone: value,
                      });

                      if (res[0] === "seller not founded") {
                        checkDuplicate = false;
                      } else {
                        checkDuplicate = true;
                      }
                    } catch (error) {}
                    if (!checkDuplicate) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject("This Number is Already Exists");
                    }
                  }
                }
              },
            }),
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            maxLength={11}
            onChange={(e) => {
              setPostObject({ ...postObject, phone: e.target.value });
            }}
            onPressEnter={(e) => e.preventDefault()}
            value={postObject.phone}
            placeholder="Please enter your Phone Number"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item required name="seller_id" label="Seller Name:">
          <Select
            onPressEnter={(e) => e.preventDefault()}
            showSearch
            placeholder="Select a Clients Marital Status"
            onSelect={(e) => setPostObject({ ...postObject, seller_id: e })}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {listOfSellers?.map((element, index) => (
              <Option key={element.id} value={element.id}>
                {element?.first_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Card>
    </Row>
  );
};

export default GeneralField;
