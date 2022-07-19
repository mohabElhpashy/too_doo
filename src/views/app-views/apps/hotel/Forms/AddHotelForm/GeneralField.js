import {
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  DatePicker,
} from "antd";
import { useFetch } from "hooks";
import React, { useState, useCallback } from "react";
import countryList from "react-select-country-list";
import GoogleMapReact from "google-map-react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import GoogleMapsStyle from "constants/GoogleMapsStyle";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import SearchBar from "components/shared-components/Map/SearchBar";
import { GOOGLE_MAPS_KEY } from "configs/EnvironmentConfig";

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
}) => {
  //Map Configrations
  const [marker, setMarker] = useState({
    lat: 30.5,
    lng: 30.5,
  });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_KEY,
    libraries,
  });

  const onMapClick = (event) => {
    // setMarker({lat:event.latLng.lat() ,lng:event.latLng.lng()})
    setPostObject({
      ...postObject,
      lat: event.latLng.lat(),
      long: event.latLng.lng(),
    });
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}></Select>
    </Form.Item>
  );
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={15}>
        <Card title="Basic Info" className="w-100">
          <Form.Item
            name="name_ar"
            label="Arabic Name:"
            onPressEnter={(e) => e.preventDefault()}
            rules={[
              { required: true, message: "Please Enter The Name in Arabic" },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
          >
            <Input
              placeholder="Please enter The Name in Arabic "
              onChange={(e) =>
                setPostObject({ ...postObject, name_ar: e.target.value })
              }
              onPressEnter={(e) => e.preventDefault()}
            />
          </Form.Item>
          <Form.Item
            name="name_en"
            label="English Name:"
            rules={[{ required: true, message: "Please enter the Latitude" }]}
            style={{ display: "inline-block", width: "calc(50% - 5px)" }}
          >
            <Input
              onPressEnter={(e) => e.preventDefault()}
              onChange={(e) =>
                setPostObject({ ...postObject, name_en: e.target.value })
              }
              placeholder="Please Enter The Name in English"
            />
          </Form.Item>

          <Form.Item required name="address_ar" label="Arabic Address:">
            <Input.TextArea
              onChange={(e) =>
                setPostObject({ ...postObject, address_ar: e.target.value })
              }
              placeholder="Please Address in Arabic"
            />
          </Form.Item>
          <Form.Item required name="address_en" label="English Address:">
            <Input.TextArea
              onChange={(e) =>
                setPostObject({ ...postObject, address_en: e.target.value })
              }
              placeholder="Please Address in English"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number:"
            onPressEnter={(e) => e.preventDefault()}
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              maxLength={12}
              onChange={(e) =>
                setPostObject({ ...postObject, phone: e.target.value })
              }
              onPressEnter={(e) => e.preventDefault()}
              placeholder="Please enter your Phone Number"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item required name="seller_id" label="Seller Name:">
            <Select
              onPressEnter={(e) => e.preventDefault()}
              showSearch
              placeholder="Select a Seller Name"
              onSelect={(e) => setPostObject({ ...postObject, seller_id: e })}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {sellerList?.map((element, index) => (
                <Option key={element.id} value={element.value}>
                  {element?.first_name}
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
            name="open_at"
            label="Open At"
            rules={rules.price}
          >
            <DatePicker
              showTime
              className="w-100"
              placeholder="Select Time"
              onOk={(e) =>
                setPostObject({
                  ...postObject,
                  open_at: e._d.toUTCString(),
                })
              }
            />
          </Form.Item>

          <Form.Item
            style={{ display: "inline-block", width: "calc(50% - 5px)" }}
            name="close_at"
            label="Close At"
            required
            rules={rules.comparePrice}
          >
            <DatePicker
              showTime
              placeholder="Select Time"
              className="w-100"
              onOk={(e) =>
                setPostObject({
                  ...postObject,
                  close_at: e._d.toUTCString(),
                })
              }
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
            name="country_id"
            label="Country"
            rules={rules.price}
          >
            <Select
              onPressEnter={(e) => e.preventDefault()}
              showSearch
              placeholder="Select a Country"
              onSelect={(e) => setPostObject({ ...postObject, country_id: e })}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {countryList?.map((element, index) => (
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
            required
            rules={rules.comparePrice}
          >
            <Select
              onPressEnter={(e) => e.preventDefault()}
              showSearch
              disabled={!postObject.country_id}
              placeholder="Select a City"
              onSelect={(e) => setPostObject({ ...postObject, city_id: e })}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {cityList
                ?.filter((city) => city.country_id !== postObject.country_id)
                ?.map((element, index) => (
                  <Option key={element.id} value={element.value}>
                    {element?.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          {postObject.city_id && (
            <>
              <h2>Your Location</h2>
              {/* <SearchBar/> */}
              <div style={{ width: "100%", height: 460 }}>
                <GoogleMap
                  mapContainerStyle={{ width: 450, height: 400 }}
                  center={{ lat: postObject.lat, lng: postObject.long }}
                  zoom={8}
                  onClick={onMapClick}
                >
                  <Marker
                    position={{ lat: postObject.lat, lng: postObject.long }}
                  />
                </GoogleMap>
              </div>
            </>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
