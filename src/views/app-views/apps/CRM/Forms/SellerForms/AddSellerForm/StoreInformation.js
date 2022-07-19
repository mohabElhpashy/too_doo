import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import {
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  TimePicker,
  Upload,
} from "antd";
import service from "auth/FetchInterceptor";
import { GOOGLE_MAPS_KEY } from "configs/EnvironmentConfig";
import { WEEKDAYS } from "constants/DateConstant";
import {
  egyptianPhoneValidation,
  numberValidator,
} from "constants/helperFunctions";
import {
  ARABIC_alpha,
  ENGLISH_ALPH,
  NUMBER_CONSTANTS,
} from "constants/LanguagesConstent";
import moment from "moment";
import React, { useEffect, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
const libraries = ["places"];
const { Option } = Select;
const { Dragger } = Upload;
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
const STORE_TYPE_LIST = ["store", "freelance"];
const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}></Select>
  </Form.Item>
);
const StoreInformation = ({
  postObject,
  setPostObject,
  cityList,
  countries,
  paymentMethodList,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_KEY,
    libraries,
  });
  const [filteredArray, setFilterdArray] = useState([]);
  useEffect(() => {
    setFilterdArray(
      cityList?.filter((city) => city.country_id == postObject.country_id)
    );
  }, [postObject.country_id]);
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
  const handleCitySelection = (e) => {
    const cityListCurrentObj = cityList.find((element) => element.id === e);
    setPostObject({
      ...postObject,
      city_id: e,
      store_lat: parseFloat(cityListCurrentObj.lat),
      store_long: parseFloat(cityListCurrentObj.long),
    });
  };

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
        content: `${test.file_name} Uploaded Successfully!`,
        key,
        duration: 2,
      });
      setPostObject({
        ...postObject,
        store_main_image: test.file_url,
      });
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
  const Search = () => {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: {
          lat: () => postObject?.store_lat,
          lng: () => postObject?.store_long,
        },
        radius: 200 * 1000,
      },
    });
    return (
      <Select
        onPressEnter={(e) => e.preventDefault()}
        showSearch
        disabled={!ready}
        placeholder="Enter Street Name"
        style={{ width: "100%", marginBottom: 10 }}
        onSearch={(e) => {
          setValue(e);
        }}
        onSelect={async (address) => {
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            setPostObject({ ...postObject, store_long: lng, store_lat: lat });
          } catch (error) {}
        }}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {data?.map((element) => (
          <Option key={element.id} value={element.description}>
            {element.description}
          </Option>
        ))}
      </Select>
    );
  };
  return (
    <Row>
      <Col xs={24} sm={24} md={24}>
        <Card title="Store Info" className="w-100">
          <Form.Item
            name="store_name_en"
            label="Store Name in English:"
            required
            onPressEnter={(e) => e.preventDefault()}
            hasFeedback
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
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
          >
            <Input
              placeholder="Please enter the store name in english "
              onChange={(e) =>
                setPostObject({
                  ...postObject,
                  store_name_en: e.target.value.toLowerCase(),
                })
              }
              onPressEnter={(e) => e.preventDefault()}
            />
          </Form.Item>
          <Form.Item
            name="store_name_ar"
            label="Store Name in Arabic:"
            required
            hasFeedback
            rules={[
              {
                whitespace: true,
              },
              ({ getFieldValue }) => ({
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
            style={{ display: "inline-block", width: "calc(50% - 5px)" }}
          >
            <Input
              onPressEnter={(e) => e.preventDefault()}
              onChange={(e) =>
                setPostObject({
                  ...postObject,
                  store_name_ar: e.target.value,
                })
              }
              placeholder="Please enter the store  name in arabic"
            />
          </Form.Item>

          <Form.Item
            required
            hasFeedback
            rules={[
              {
                whitespace: true,
              },
            ]}
            name="store_address_en"
            label="Store Address in English:"
          >
            <Input.TextArea
              onChange={(e) =>
                setPostObject({
                  ...postObject,
                  store_address_en: e.target.value,
                })
              }
              placeholder="Please enter Store Address in English"
            />
          </Form.Item>

          <Form.Item
            required
            hasFeedback
            rules={[
              {
                whitespace: true,
              },
            ]}
            name="store_address_ar"
            label="Store Address in Arabic:"
          >
            <Input.TextArea
              onChange={(e) =>
                setPostObject({
                  ...postObject,
                  store_address_ar: e.target.value,
                })
              }
              placeholder="Please enter the seller Store Address in Arabic"
            />
          </Form.Item>
          <Form.Item
            name="store_type"
            label="Store Type:"
            required
            onPressEnter={(e) => e.preventDefault()}
          >
            <Select
              onPressEnter={(e) => e.preventDefault()}
              showSearch
              placeholder="Select a Store Type"
              onSelect={(e) => setPostObject({ ...postObject, store_type: e })}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {STORE_TYPE_LIST?.map((element, index) => (
                <Option key={index} value={element}>
                  {element}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="store_phone"
            label="Store Phone Number:"
            hasFeedback
            required
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            onPressEnter={(e) => e.preventDefault()}
            rules={[
              {
                whitespace: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    value.length === 11 &&
                    value[0] == 0 &&
                    value[1] == 1 &&
                    (value[2] == 0 ||
                      value[2] == 1 ||
                      value[2] == 2 ||
                      value[2] == 5)
                  ) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("Please enter A Valid Phone Number");
                  }
                },
              }),
            ]}
          >
            <Input
              maxLength={11}
              addonBefore={prefixSelector}
              onChange={(e) =>
                setPostObject({ ...postObject, store_phone: e.target.value })
              }
              onPressEnter={(e) => e.preventDefault()}
              placeholder="Please en  ter the Store Phone Number"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="days_off"
            label="Days Off:"
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
            }}
            onPressEnter={(e) => e.preventDefault()}
          >
            <Select
              onPressEnter={(e) => e.preventDefault()}
              showSearch
              placeholder="Select a Store Day Off"
              onSelect={(e) => setPostObject({ ...postObject, days_off: e })}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {WEEKDAYS?.map((element, index) => (
                <Option key={index} value={element}>
                  {element}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {/* <Form.Item
            name="account_manger_name"
            label="Account Manager Name:"
            required
            onPressEnter={(e) => e.preventDefault()}
            hasFeedback
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const checkValidation = languageValidator(
                    value.toLowerCase(),
                    [...ENGLISH_ALPH, ...ARABIC_alpha]
                  );
                  if (checkValidation) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(
                      "Please enter The Name in Charachters"
                    );
                  }
                },
              }),
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
            }}
          >
            <Input
              name="account_manger_name"
              placeholder="Please enter the Account Manager Name "
              name="account_manger_name"
              onChange={(e) =>
                setPostObject({
                  ...postObject,
                  account_manger_name: e.target.value.toLowerCase(),
                })
              }
              onPressEnter={(e) => e.preventDefault()}
            />
          </Form.Item>
          <Form.Item
            name="account_manger_phone"
            label="Account Manager Phone Number:"
            required
            className="w-100"
            onPressEnter={(e) => e.preventDefault()}
            hasFeedback
            rules={[
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
              name="account_manger_phone"
              onChange={(e) => {
                setPostObject({
                  ...postObject,
                  account_manger_phone: e.target.value,
                });
              }}
              onPressEnter={(e) => e.preventDefault()}
              value={postObject.account_manger_phone}
              placeholder="Please enter your Phone Number"
            />
          </Form.Item> */}

          <Form.Item
            required
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            name="open_at"
            label="Open At"
          >
            <TimePicker
              showTime
              use12Hours format="h:mm a" 

              className="w-100"
              placeholder="Select Time"
              onOk={(e) => {
                const timeString = moment(e).format("HH:mm:ss");
                setPostObject({
                  ...postObject,
                  open_at: timeString,
                });
              }}
            />
          </Form.Item>

          <Form.Item
            style={{ display: "inline-block", width: "calc(50% - 5px)" }}
            name="close_at"
            label="Close At"
            required
          >
            <TimePicker
              showTime
              placeholder="Select Time"
              use12Hours format="h:mm a" 
                           className="w-100"
              onOk={(e) => {
                const timeString = moment(e).format("HH:mm  "); 
                setPostObject({
                  ...postObject,
                  close_at: timeString,
                });
              }}
            />
          </Form.Item>

          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            name="country_id"
            label="Country"
            required={postObject.store_type === "freelance" ? false : true}
          >
            <Select
              onPressEnter={(e) => e.preventDefault()}
              showSearch
              placeholder="Select a Country"
              onSelect={(e) =>
                setPostObject({ ...postObject, country_id: e, city_id: null })
              }
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {countries?.map((element, index) => (
                <Option key={element.id} value={element.value}>
                  {element?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ display: "inline-block", width: "calc(50% - 5px)" }}
            name="city_id"
            label="City"
            required={postObject.store_type === "freelance" ? false : true}
          >
            <div key={filteredArray?.length}>
              <Select
                onPressEnter={(e) => e.preventDefault()}
                showSearch
                disabled={!postObject.country_id}
                placeholder="Select a City"
                onSelect={(e) => handleCitySelection(e)}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {filteredArray
                  // ?.filter((city) => city.country_id == postObject.country_id)
                  ?.map((element, index) => (
                    <Option key={element.id} value={element.id}>
                      {element?.name}
                    </Option>
                  ))}
              </Select>
            </div>
          </Form.Item>
          {postObject.city_id && (
            <>
              <h2>Store Location</h2>
              {/* <SearchBar/> */}
              <Search />
              <div style={{ width: "100%", height: 460 }}>
                <GoogleMap
                  mapContainerStyle={{ width: 920, height: 400 }}
                  center={{
                    lat: postObject.store_lat,
                    lng: postObject.store_long,
                  }}
                  zoom={12}
                  onClick={onMapClick}
                >
                  <Marker
                    position={{
                      lat: postObject.store_lat,
                      lng: postObject.store_long,
                    }}
                  />
                </GoogleMap>
              </div>
            </>
          )}
        </Card>
      </Col>

      {/* <Col xs={24} sm={24} md={7}>
        <Card title="Main Image" style={{ height: 550, marginLeft: 15 }}>
          <Form.Item required label="Main Image">
            <Dragger
              showUploadList={false}
              name="main_image"
              customRequest={(options) => uploadHandler(options, "main_image")}
            >
              {postObject.store_main_image ? (
                <img
                  src={postObject.store_main_image}
                  alt="avatar"
                  className="img-fluid"
                />
              ) : (
                <div>
                  {postObject.store_main_image ? (
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
      </Col> */}
    </Row>
  );
};

export default StoreInformation;
