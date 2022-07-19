import {
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  message,
  Checkbox,
} from "antd";
import { useFetch } from "hooks";
import React, { useState, useMemo } from "react";
import countryList from "react-select-country-list";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { GOOGLE_MAPS_KEY } from "configs/EnvironmentConfig";
import { ImageSvg } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import service from "auth/FetchInterceptor";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  egyptianPhoneValidation,
  languageValidator,
  numberValidator,
} from "constants/helperFunctions";
import {
  ARABIC_alpha,
  ENGLISH_ALPH,
  NUMBER_CONSTANTS,
} from "constants/LanguagesConstent";

const { Dragger } = Upload;
const { Option } = Select;

const libraries = ["places"];

const GeneralField = ({
  postObject,
  setPostObject,
  checkViewMode,
  countries,
  cityList,
  paymentMethodList,
  buttonChecker,
  setButtonChecker,
}) => {
  const options = useMemo(() => countryList().getData(), []);
  const [feildChecker, setFeildChecker] = useState({
    last_name: true,
    first_name: true,
    password: true,
    email: true,
    phone: true,
  });
  const Vip=[{name:"Vip"},{name:"Partner"}]

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_KEY,
    libraries,
  });

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
              image: test.file_url,
            },
          ],
        });
      }
    } catch (error) {
      message.error({ content: ` Error!`, key, duration: 2 });
    }
  };
  const onMapClick = (event) => {
    // setMarker({lat:event.latLng.lat() ,lng:event.latLng.lng()})
    setPostObject({
      ...postObject,
      store_lat: event.latLng.lat(),
      store_long: event.latLng.lng(),
    });
  };

  const { services } = useFetch("services");
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
            required
            name="first_name"
            label="Frist Name:"
            hasFeedback={postObject?.first_name ? true : false}
            rules={[
              feildChecker.first_name
                ? []
                : ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value)
                        return Promise.reject("You Must Enter The Name");

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
            onPressEnter={(e) => e.preventDefault()}
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
          >
            <Input
              name="first_name"
              placeholder="Please enter the seller frist name "
              onChange={(e) => {
                setPostObject({ ...postObject, first_name: e.target.value });
                setFeildChecker({ ...feildChecker, first_name: false });
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
            hasFeedback={postObject?.last_name ? true : false}
            rules={[
              feildChecker.last_name
                ? []
                : ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value)
                        return Promise.reject("You Must Enter The Name");

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
              name="last_name"
              onPressEnter={(e) => e.preventDefault()}
              defaultValue={postObject?.last_name}
              value={postObject?.last_name}
              disabled={checkViewMode === true}
              onChange={(e) => {
                setFeildChecker({ ...feildChecker, last_name: false });
                setPostObject({ ...postObject, last_name: e.target.value });
              }}
              placeholder="Please enter the seller last name"
            />
          </Form.Item>

          {/* <Form.Item required name="password" label="Password:">
          <Input.Password
            onChange={(e) =>
              setPostObject({ ...postObject, password: e.target.value })
            }
            placeholder="Please enter the seller password"
          />
        </Form.Item> */}

          <Form.Item
            required
            name="email"
            label="E-mail:"
            hasFeedback
            rules={[
              feildChecker.email
                ? []
                : ({ getFieldValue }) => ({
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
            ]}
          >
            <Input
              name="email"
              onChange={(e) => {
                setPostObject({ ...postObject, email: e.target.value });
                setFeildChecker({ ...feildChecker, email: false });
              }}
              placeholder="Please enter the seller Email"
              defaultValue={postObject?.email}
              disabled={checkViewMode}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password:"
            hasFeedback={postObject?.password?.length > 2}
            rules={[
              feildChecker.password
                ? []
                : ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value.length > 6) {
                        setButtonChecker(true);
                        return Promise.resolve();
                      } else {
                        setButtonChecker(false);
                        return Promise.reject(
                          "The Password is must be more Than 6 charactares"
                        );
                      }
                    },
                  }),
            ]}
          >
            <Input.Password
              name="password"
              disabled={checkViewMode}
              onChange={(e) => {
                setPostObject({ ...postObject, password: e.target.value });
                setFeildChecker({ ...feildChecker, password: false });
              }}
              placeholder="Change Sellers Password"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number:"
            onPressEnter={(e) => e.preventDefault()}
            hasFeedback
            rules={[
              feildChecker.phone
                ? []
                : ({ getFieldValue }) => ({
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
              disabled={checkViewMode === true}
              defaultValue={postObject?.phone}
              maxLength={11}
              onChange={(e) => {
                setPostObject({ ...postObject, phone: e.target.value });
                setFeildChecker({ ...feildChecker, phone: false });
              }}
              onPressEnter={(e) => e.preventDefault()}
              placeholder="Please enter your Phone Number"
              style={{ width: "100%" }}
            />
          </Form.Item>

          {/* <Form.Item required name="country_code" label="Country:">
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
              <Option key={index} value={element.value}>
                {element?.label}
              </Option>
            ))}
          </Select>
        </Form.Item> */}
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
              defaultValue={postObject?.instagram_link}
              disabled={checkViewMode === true}
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
              name="facebook_link"
              defaultValue={postObject?.facebook_link}
              disabled={checkViewMode === true}
              onPressEnter={(e) => e.preventDefault()}
              onChange={(e) =>
                setPostObject({ ...postObject, facebook_link: e.target.value })
              }
              placeholder="Please enter the seller Facebook Link "
            />
          </Form.Item>
          <Form.Item
            required
            name="service_id"
            label="Service Name:"
            hasFeedback
          >
            <Select
              onPressEnter={(e) => e.preventDefault()}
              showSearch
              defaultValue={postObject?.service_id}
              placeholder="Select a Service Name"
              onSelect={(e) => setPostObject({ ...postObject, service_id: e })}
              optionFilterProp="children"
              disabled={true}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {services?.map((element, index) => (
                <Option key={element.id} value={element.id}>
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
              defaultValue={postObject?.seller_type}
              disabled={checkViewMode === true}

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
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Main Image" style={{ height: 637, marginLeft: 15 }}>
          <Form.Item required label="Main Image">
            <Dragger
              showUploadList={false}
              name="main_image"
              customRequest={(options) => uploadHandler(options, "main_image")}
              disabled={checkViewMode}
            >
              {postObject.main_image ? (
                <img
                  src={
                    postObject.displayImage
                      ? postObject.displayImage
                      : postObject.main_image
                  }
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
            <Checkbox
              onChange={(e) =>
                setPostObject({ ...postObject, defaultImage: true })
              }
              style={{ fontSize: 15, fontWeight: "bold", marginTop: 15 }}
            >
              Use Default Image
            </Checkbox>
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
