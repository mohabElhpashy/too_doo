import React, { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import {
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Upload,
  TimePicker,
} from "antd";
import GoogleMapsStyle from "constants/GoogleMapsStyle";
import moment from "moment";
import { GOOGLE_MAPS_KEY } from "configs/EnvironmentConfig";
import Loading from "components/shared-components/Loading";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { get } from "lodash";
import {
  egyptianPhoneValidation,
  languageValidator,
  numberValidator,
} from "constants/helperFunctions";
import service from "auth/FetchInterceptor";
import {
  ARABIC_alpha,
  ENGLISH_ALPH,
  NUMBER_CONSTANTS,
} from "constants/LanguagesConstent";
import { WEEKDAYS } from "constants/DateConstant";

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

const libraries = ["places"];

const options = {
  styles: GoogleMapsStyle,
  disableDefaultUI: true,
  zoomControl: true,
};
const GeneralField = ({
  postObject,
  setPostObject,
  countryList,
  cityList,
  sellerList,
  checkViewMode,
}) => {
  const [feildChecker, setFeildChecker] = useState({
    name_ar: true,
    name_en: true,
    phone: true,
  });
  const onMapClick = (event) => {
    // setMarker({lat:event.latLng.lat() ,lng:event.latLng.lng()})
    const test = event.latLng.lat();
    const test1 = event.latLng.lng();
    setPostObject({
      ...postObject,
      lat: test,
      long: test1,
    });
  };
  const handleCitySelection = (e) => {
    const cityListCurrentObj = cityList.find((element) => element.id === e);
    setPostObject({
      ...postObject,
      city_id: e,
      lat: parseFloat(cityListCurrentObj.lat),
      long: parseFloat(cityListCurrentObj.long),
    });
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_KEY,
    libraries,
  });
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}></Select>
    </Form.Item>
  );
  const Search = () => {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => postObject?.lat, lng: () => postObject?.long },
        radius: 200 * 1000,
      },
    });

    return (
      <Select
        onPressEnter={(e) => e.preventDefault()}
        showSearch
        disabled={!ready || checkViewMode}
        defaultValue={postObject.address_en}
        placeholder="Enter Street Name"
        style={{ width: "100%", marginBottom: 10 }}
        onSearch={(e) => {
          setValue(e);
        }}
        onSelect={async (address) => {
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            setPostObject({ ...postObject, long: lng, lat: lat });
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
    <Row gutter={16}>
      <Col xs={24} sm={24} md={15}>
        <Card title="Basic Info" className="w-100">
          <Form.Item
            required
            name="name_ar"
            label="Arabic Name:"
            hasFeedback
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
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          "Please enter The Name in Arabic"
                        );
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
              placeholder="Please enter The Name in Arabic "
              disabled={checkViewMode}
              defaultValue={postObject.store_name_ar}
              onChange={(e) => {
                setFeildChecker({ ...feildChecker, store_name_ar: false });
                setPostObject({ ...postObject, name_ar: e.target.value });
              }}
              onPressEnter={(e) => e.preventDefault()}
            />
          </Form.Item>
          <Form.Item
            required
            name="name_en"
            hasFeedback
            label="English Name:"
            rules={[
              feildChecker.name_en
                ? []
                : ({ getFieldValue }) => ({
                    validator(_, value) {
                      const checkValidation = languageValidator(
                        value.toLowerCase(),
                        ENGLISH_ALPH
                      );
                      if (checkValidation) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          "Please enter The Name in English"
                        );
                      }
                    },
                  }),
            ]}
            style={{ display: "inline-block", width: "calc(50% - 5px)" }}
          >
            <Input
              onPressEnter={(e) => e.preventDefault()}
              defaultValue={postObject.store_name_en}
              disabled={checkViewMode}
              onChange={(e) => {
                setPostObject({ ...postObject, name_en: e.target.value });
                setFeildChecker({ ...feildChecker, store_name_en: false });
              }}
              placeholder="Please Enter The Name in English"
            />
          </Form.Item>

          <Form.Item required name="address_ar" label="Arabic Address:">
            <Input.TextArea
              disabled={checkViewMode}
              defaultValue={postObject.store_address_ar}
              onChange={(e) =>
                setPostObject({
                  ...postObject,
                  address_ar: e.target.value,
                })
              }
              placeholder="Please Address in Arabic"
            />
          </Form.Item>
          <Form.Item required name="address_en" label="English Address:">
            <Input.TextArea
              disabled={checkViewMode}
              defaultValue={postObject.store_address_en}
              onChange={(e) =>
                setPostObject({
                  ...postObject,
                  address_en: e.target.value,
                })
              }
              placeholder="Please Address in English"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number:"
            required
            onPressEnter={(e) => e.preventDefault()}
            hasFeedback
            rules={[
              feildChecker?.phone
                ? []
                : ({ getFieldValue }) => ({
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
            ]}
            // rules={[
            //   { required: true, message: "Please input your phone number!" },
            // ]}
          >
            <Input
              addonBefore={prefixSelector}
              maxLength={11}
              disabled={checkViewMode}
              defaultValue={postObject.store_phone}
              onChange={(e) => {
                setFeildChecker({ ...feildChecker, phone: false });
                setPostObject({ ...postObject, phone: e.target.value });
              }}
              onPressEnter={(e) => e.preventDefault()}
              placeholder="Please enter your Phone Number"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            required
            name="seller_id"
            label="Seller Name:"
          >
            <Select
              onPressEnter={(e) => e.preventDefault()}
              showSearch
              disabled={checkViewMode}
              defaultValue={postObject.seller_id}
              placeholder="Select a Seller Name"
              onSelect={(e) => setPostObject({ ...postObject, seller_id: e })}
              optionFilterProp="children"
              value={postObject.seller_id}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {sellerList?.map((element, index) => (
                <Option key={element.id} value={element.id}>
                  {element?.first_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
            }}
            required
            name="days_off"
            label="Day Off:"
          >
            <Select
              onPressEnter={(e) => e.preventDefault()}
              showSearch
              disabled={checkViewMode}
              defaultValue={postObject.days_off}
              placeholder="Select a Day Off"
              onSelect={(e) => setPostObject({ ...postObject, days_off: e })}
              optionFilterProp="children"
              value={postObject.days_off}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {WEEKDAYS?.map((element, index) => (
                <Option key={element} value={element}>
                  {element}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            required
            name="open_at"
            label="Open At"
            // rules={rules.price}
          >
            <TimePicker
              showTime
              className="w-100"
              disabled={checkViewMode}
              placeholder="Select Time"
              defaultValue={moment(postObject.open_at, "HH:mm:ss")}
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
            // rules={rules.comparePrice}
          >
            <TimePicker
              showTime
              disabled={checkViewMode}
              placeholder="Select Time"
              className="w-100"
              defaultValue={moment(postObject.close_at, "HH:mm:ss")}
              onOk={(e) => {
                const timeString = moment(e).format("HH:mm:ss");
                setPostObject({
                  ...postObject,
                  close_at: timeString,
                });
              }}
            />
          </Form.Item>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={9}>
        <Card title="Location">
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            name="country_name"
            label="Country"
            // rules={rules.price}
          >
            <Select
              onPressEnter={(e) => e.preventDefault()}
              showSearch
              disabled={checkViewMode}
              defaultValue={postObject.country_name_en}
              placeholder="Select a Country"
              onChange={(e) => setPostObject({ ...postObject, country_id: e })}
              onSelect={(e) => setPostObject({ ...postObject, country_id: e })}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {countryList?.map((element, index) => (
                <Option key={element.id} value={element.id}>
                  {element?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ display: "inline-block", width: "calc(50% - 5px)" }}
            name="city_id"
            label="City"
            required
            // rules={rules.comparePrice}
          >
            <Select
              onPressEnter={(e) => e.preventDefault()}
              showSearch
              defaultValue={postObject.city_name_en}
              disabled={checkViewMode}
              placeholder="Select a City"
              onSelect={(e) => handleCitySelection(e)}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {cityList
                ?.filter((city) => city.country_id == postObject?.country_id)
                ?.map((element, index) => (
                  <Option key={element.id} value={element.id}>
                    {element?.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          {isLoaded ? (
            <>
              <h2>Your Location</h2>
              <div aria-readonly={true} style={{ width: "100%", height: 460 }}>
                <Search />

                <GoogleMap
                  mapContainerStyle={{ width: 450, height: 400 }}
                  center={{
                    lat: parseFloat(postObject?.lat),
                    lng: parseFloat(postObject?.long),
                  }}
                  zoom={15}
                  onClick={checkViewMode ? null : onMapClick}
                >
                  <Marker
                    position={{
                      lat: parseFloat(postObject?.lat),
                      lng: parseFloat(postObject?.long),
                    }}
                  />
                </GoogleMap>
              </div>
            </>
          ) : (
            <Loading cover="content" align="center" />
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
