import { Card, Form, Input, Row, Select, Upload } from "antd";
import service from "auth/FetchInterceptor";
import {
  egyptianPhoneValidation,
  numberValidator,
} from "constants/helperFunctions";
import { ENGLISH_ALPH, NUMBER_CONSTANTS } from "constants/LanguagesConstent";
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
const GeneralField = ({
  postObject,
  setPostObject,
  checkViewMode,
  setButtonChecker,
}) => {
  const [feildChecker, setFeildChecker] = useState({
    range_from: true,
    range_to: true,
    password: true,
    first_name: true,
    last_name: true,
    phone: true,
    email: true,
  });
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const { services } = useFetch("services");
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}></Select>
    </Form.Item>
  );
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
  return (
    <Row xs={24} sm={24} md={17}>
      <Card title="Basic Info" className="w-100">
        <Form.Item
          required
          name="first_name"
          label="Frist Name:"
          hasFeedback={postObject.first_name.length > 2}
          onPressEnter={(e) => e.preventDefault()}
          rules={
            feildChecker.first_name
              ? []
              : [
                  {
                    whitespace: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value.length < 2) {
                        return Promise.reject("Please enter The First Name ");
                      }
                      const checkValidation = languageValidator(
                        value.toLowerCase(),
                        ENGLISH_ALPH
                      );
                      if (checkValidation) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject("Please enter The First Name ");
                      }
                    },
                  }),
                ]
          }
          style={{
            display: "inline-block",
            width: "calc(50% - 5px)",
            marginRight: 8,
          }}
        >
          <Input
            placeholder="Please enter the Client frist name "
            rules={
              feildChecker.first_name
                ? []
                : [
                    {
                      required: true,
                      message: "Please enter Seller Last Name",
                    },
                  ]
            }
            onChange={(e) => {
              setFeildChecker({ ...feildChecker, first_name: false });
              setPostObject({ ...postObject, first_name: e.target.value });
            }}
            disabled={checkViewMode === true}
            defaultValue={postObject?.first_name}
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>
        <Form.Item
          required
          name="last_name"
          label="Last Name:"
          hasFeedback
          style={{ display: "inline-block", width: "calc(50% - 5px)" }}
        >
          <Input
            rules={
              feildChecker.last_name
                ? []
                : [
                    {
                      required: true,
                      message: "Please enter Seller Last Name",
                    },
                  ]
            }
            onPressEnter={(e) => e.preventDefault()}
            disabled={checkViewMode === true}
            defaultValue={postObject.last_name}
            onChange={(e) => {
              setFeildChecker({ ...feildChecker, last_name: false });
              setPostObject({ ...postObject, last_name: e.target.value });
            }}
            placeholder="Please enter the Client last name"
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
          required
          hasFeedback={postObject?.email.length > 2}
          rules={
            feildChecker.email
              ? []
              : [
                  {
                    message: "Please enter a Valid Email",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        value.split("").find((element) => element === "@") &&
                        value.split("").find((element) => element === ".") &&
                        postObject?.email.length > 2
                      ) {
                        setButtonChecker(true);
                        return Promise.resolve();
                      } else {
                        setButtonChecker(false);
                        return Promise.reject("The Email is must be Valid");
                      }
                    },
                  }),
                ]
          }
          name="email"
          label="E-mail:"
        >
          <Input
            defaultValue={postObject.email}
            onChange={(e) => {
              setFeildChecker({ ...feildChecker, email: false });
              setPostObject({ ...postObject, email: e.target.value });
            }}
            placeholder="Please enter the Client Email"
            disabled={checkViewMode === true}
          />
        </Form.Item>
        {/* <Form.Item required name="password" label="Password:">
          <Input
            defaultValue={postObject.password}
            onChange={(e) =>
              setPostObject({ ...postObject, email: e.target.value })
            }
            placeholder="Please enter the Client Password"
            disabled={checkViewMode === true}
          />
        </Form.Item> */}

        <Form.Item
          name="phone"
          label="Phone Number:"
          onPressEnter={(e) => e.preventDefault()}
          hasFeedback
          required
          rules={
            feildChecker.phone
              ? []
              : [
                  {
                    whitespace: true,
                  },
                  ({ getFieldValue }) => ({
                    async validator(_, value) {
                      if (value.length !== 11) {
                        return Promise.reject("Your Phone Must be 11 digits");
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
                      } else if (!numberValidator(value, NUMBER_CONSTANTS)) {
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
                            return Promise.reject(
                              "This Number is Already Exists"
                            );
                          }
                        }
                      }
                    },
                  }),
                ]
          }
          // rules={[
          //   { required: true, message: "Please input your phone number!" },
          // ]}
        >
          <Input
            addonBefore={prefixSelector}
            disabled={checkViewMode === true}
            defaultValue={postObject.phone}
            maxLength={11}
            onChange={(e) =>
              setPostObject({ ...postObject, phone: e.target.value })
            }
            onPressEnter={(e) => e.preventDefault()}
            placeholder="Please enter your Phone Number"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item required name="gender" label="Gender:">
          <Select
            onPressEnter={(e) => e.preventDefault()}
            showSearch
            defaultValue={postObject.gender}
            placeholder="Select a Clients Gender"
            onSelect={(e) => setPostObject({ ...postObject, gender: e })}
            optionFilterProp="children"
            disabled={checkViewMode === true}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {gender?.map((element, index) => (
              <Option key={element.id} value={element.gender}>
                {element?.gender}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item required name="marital_status" label="Marital Status:">
          <Select
            onPressEnter={(e) => e.preventDefault()}
            showSearch
            defaultValue={postObject.marital_status}
            placeholder="Select a Clients Marital Status"
            onSelect={(e) =>
              setPostObject({ ...postObject, marital_status: e })
            }
            optionFilterProp="children"
            disabled={checkViewMode === true}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {marital_status?.map((element, index) => (
              <Option key={element.id} value={element.status}>
                {element?.status}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item required name="country_code" label="Country:">
          <Select
            onPressEnter={(e) => e.preventDefault()}
            showSearch
            defaultValue={postObject.country_code}
            disabled={checkViewMode}
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
              <Option key={index} value={element.value}>
                {element?.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          style={{ display: "inline-block", width: "calc(50% - 5px)" }}
          required
          hasFeedback
          name="range_from"
          label="Range From:"
          rules={
            feildChecker.range_from
              ? []
              : [
                  {
                    whitespace: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (numberValidator(value) === true) {
                        setButtonChecker(true);
                        return Promise.resolve();
                      } else {
                        setButtonChecker(false);
                        return Promise.reject(
                          "Please enter a the Correct Fromat of a Number"
                        );
                      }
                    },
                  }),
                ]
          }
        >
          <Input
            placeholder="1000"
            defaultValue={postObject?.range_from}
            onChangeCapture={(e) => {
              setFeildChecker({ ...feildChecker, range_from: false });
              setPostObject({ ...postObject, range_from: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          style={{
            display: "inline-block",
            width: "calc(50% - 5px)",
            marginLeft: 8,
          }}
          rules={
            feildChecker.range_to
              ? []
              : [
                  {
                    whitespace: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        // numberValidator(value) === true &&
                        parseInt(getFieldValue("range_from")) < parseInt(value)
                      ) {
                        // setButtonChecker(true);
                        return Promise.resolve();
                      } else {
                        // setButtonChecker(false);
                        return Promise.reject(
                          "The number Must be in the Correct Format and Greater than Range From"
                        );
                      }
                    },
                  }),
                ]
          }
          required
          name="range_to"
          label="Range To:"
        >
          <Input
            placeholder="2000"
            defaultValue={postObject?.range_to}
            disabled={!postObject?.range_from}
            onChange={(e) => {
              setFeildChecker({ ...feildChecker, range_to: false });
              setPostObject({ ...postObject, range_to: e.target.value });
            }}
          />
        </Form.Item>
        {/* {postObject.range_from && postObject.range_to && (
          <Slider
            range
            onChange={() => {
              return null;
            }}
            min={0}
            value={[postObject.range_from, postObject.range_to]}
            max={1000}
            defaultValue={[postObject.range_from, postObject.range_to]}
          />
        )} */}
      </Card>
    </Row>
  );
};

export default GeneralField;
