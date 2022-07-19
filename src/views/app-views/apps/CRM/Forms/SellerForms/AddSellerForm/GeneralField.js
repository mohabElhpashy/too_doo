import { LoadingOutlined } from "@ant-design/icons";
import { useLoadScript } from "@react-google-maps/api";
import { Card, Col, Form, Input, message, Row, Select, Upload } from "antd";
import { ImageSvg } from "assets/svg/icon";
import service from "auth/FetchInterceptor";
import CustomIcon from "components/util-components/CustomIcon";
import { GOOGLE_MAPS_KEY } from "configs/EnvironmentConfig";
import { languageValidator } from "constants/helperFunctions";
import {
  ARABIC_alpha,
  ENGLISH_ALPH,
  NUMBER_CONSTANTS,
} from "constants/LanguagesConstent";
import { useFetch } from "hooks";
import React, { useEffect, useMemo, useState } from "react";
import countryList from "react-select-country-list";

const { Dragger } = Upload;
const { Option } = Select;

const libraries = ["places"];

const GeneralField = ({
  postObject,
  setPostObject,
  cityList,
  countries,
  paymentMethodList,
  formValidation,
  setFormValidation,
}) => {
  const [isDuplicatedPhone, setIsDuplicatedPhone] = useState(false);
  const options = useMemo(() => countryList().getData(), []);
  const Vip=[{name:"Vip"},{name:"Partner"}]
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_KEY,
    libraries,
  });
  useEffect(async () => {
    if (postObject.phone.length == 11) {
      try {
        const res = await service.post(`/web/phones`, {
          phone: postObject.phone,
        });
        if (res[0] === "seller not founded") {
          setIsDuplicatedPhone(false);
        } else {
          setIsDuplicatedPhone(true);
        }
      } catch (error) {}
    }
    return null;
  }, [postObject.phone]);
  const numberValidator = (value, lang) => {
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
  
  const uploadHandler = async (options, name) => {
    const key = "updatable";
    message.loading({ content: "Loading...", key, duration: 30 });

    const imageObject = { type: "Seller", file: options.file };
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
      if (name === "main_image") {
        setPostObject({
          ...postObject,
          main_image: test.fileName,
          displayImage: test.file_url,
        });
      } else {
        setPostObject({
          ...postObject,
          images: [
            ...postObject.images,
            {
              id: Math.floor(Math.random() * 10000),
              image: test.fileName,
            },
          ],
        });
      }
    } catch (error) {
      message.error({ content: ` Error!`, key, duration: 2 });
    }
  };
  const egyptianPhoneValidation = (value) => {
    let resultCheck = false;
    if (value == "1" || value == "2" || value == "0" || value == "5") {
      resultCheck = true;
    }
    return resultCheck;
  };
  const { services } = useFetch("services");
  useEffect(()=>{
    console.log("mkmkmkmkm",services)
  },[services])
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}></Select>
    </Form.Item>
  );
  return (
    <Row xs={24} sm={24} md={17}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info" className="w-100">
          <Form.Item
            name="first_name"
            label="Frist Name"
            hasFeedback
            required
            onPressEnter={(e) => e.preventDefault()}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value) return Promise.reject("You Must Enter The Name");

                  const checkValidation = languageValidator(
                    value.toLowerCase(),
                    [...ARABIC_alpha, ...ENGLISH_ALPH]
                  );
                  if (checkValidation) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("The Name Must be Characters");
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
              name="first_name"
              placeholder="Please enter the seller frist name "
              onChange={(e) =>
                setPostObject({ ...postObject, first_name: e.target.value })
              }
              onPressEnter={(e) => e.preventDefault()}
            />
          </Form.Item>

          <Form.Item
            name="last_name"
            required
            label="Last Name:"
            hasFeedback
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value) return Promise.reject("You Must Enter The Name");

                  const checkValidation = languageValidator(
                    value.toLowerCase(),
                    [...ARABIC_alpha, ...ENGLISH_ALPH]
                  );
                  if (checkValidation) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("The Name Must be Characters");
                  }
                },
              }),
            ]}
            style={{ display: "inline-block", width: "calc(50% - 5px)" }}
          >
            <Input
              onPressEnter={(e) => e.preventDefault()}
              onChange={(e) =>
                setPostObject({ ...postObject, last_name: e.target.value })
              }
              placeholder="Please enter the seller last name"
            />
          </Form.Item>

          <Form.Item
            hasFeedback
            rules={[
              { message: "Please enter Seller Password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value.length > 6) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(
                      "The Password is must be more Than 6 charactares"
                    );
                  }
                },
              }),
            ]}
            required
            name="password"
            label="Password:"
          >
            <Input.Password
              onChange={(e) =>
                setPostObject({ ...postObject, password: e.target.value })
              }
              placeholder="Please enter the seller password"
            />
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a Valid Email",
              },
            ]}
            required
            hasFeedback
            name="email"
            label="E-mail:"
          >
            <Input
              onChange={(e) =>
                setPostObject({ ...postObject, email: e.target.value })
              }
              placeholder="Please enter the seller Email"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number:"
            required
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
                  } else if (value[1] != 1) {
                    return Promise.reject("Your Phone Must be Valid Number");
                  } else if (!egyptianPhoneValidation(value[2])) {
                    return Promise.reject("Your Phone Must be Valid Number");
                  } else if (!numberValidator(value, NUMBER_CONSTANTS)) {
                    return Promise.reject("Your Cant include Charcters");
                  } else {
                    if (value.length === 11) {
                      let checkDuplicate;
                      try {
                        const res = await service.post("web/phones", {
                          phone: `+2${value}`,
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
          <Form.Item
            name="instagram_link"
            label="Instagram Link"
            hasFeedback
            onPressEnter={(e) => e.preventDefault()}
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
          >
            <Input
              placeholder="Please enter the seller Instagram Link "
              onChange={(e) =>
                setPostObject({ ...postObject, instagram_link: e.target.value })
              }
              onPressEnter={(e) => e.preventDefault()}
            />
          </Form.Item>

          <Form.Item
            name="facebook_link"
            label="Facebook Link:"
            hasFeedback
            style={{ display: "inline-block", width: "calc(50% - 5px)" }}
          >
            <Input
              onPressEnter={(e) => e.preventDefault()}
              onChange={(e) =>
                setPostObject({ ...postObject, facebook_link: e.target.value })
              }
              placeholder="Please enter the seller Facebook Link "
            />
          </Form.Item>
          <Form.Item hasFeedback required name="country_code" label="Country:">
            <Select
              onPressEnter={(e) => e.preventDefault()}
              showSearch
              onSelect={(e) =>
                setPostObject({ ...postObject, country_code: e })
              }
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
            hasFeedback
            required
            name="service_id"
            label="Service Name:"
          >
            <Select
              onPressEnter={(e) => e.preventDefault()}
              showSearch
              placeholder="Select a Service Name"
              onSelect={(e) => setPostObject({ ...postObject, service_id: e })}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {services?.map((element, index) => (
                <Option key={element.id} value={element.value}>
                  {element?.type}
                </Option>
              ))}
            </Select>
          </Form.Item>
{/* / IS VIP/ */}
<Form.Item
            hasFeedback
            required
            name="service_id"
            label="Seller Type:"
          >
            <div key={Vip.value}></div>
            <Select
              onPressEnter={(e) => e.preventDefault()}
              showSearch
              placeholder="Seller Type"
              onSelect={(e) => setPostObject({ ...postObject, seller_type: e })}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {Vip?.map((element, index) => (
                <Option key={element.id} value={element.name}>
                  {element?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* / IS VIP/ */}


        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Main Image" style={{ height: 637, marginLeft: 15 }}>
          <Form.Item label="Main Image">
            <Dragger
              showUploadList={false}
              name="main_image"
              customRequest={(options) => uploadHandler(options, "main_image")}
            >
              {postObject.main_image ? (
                <img
                  src={postObject.displayImage}
                  alt="avatar"
                  className="img-fluid"
                />
              ) : (
                <div>
                  {postObject.displayImage ? (
                    <div>
                      <LoadingOutlined className="font-size-xxl text-primary" />
                      <div className="mt-3">Uploading</div>
                    </div>
                  ) : (
                    <div>
                      <CustomIcon className="display-3" svg={ImageSvg} />
                      <p>Click or drag file to upload</p>
                    </div>
                  )}
                </div>
              )}
            </Dragger>
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
