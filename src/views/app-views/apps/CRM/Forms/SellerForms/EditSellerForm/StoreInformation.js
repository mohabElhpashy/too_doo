import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Card, Form, Input, Select, TimePicker } from "antd";
import { GOOGLE_MAPS_KEY } from "configs/EnvironmentConfig";
import { WEEKDAYS } from "constants/DateConstant";
import moment from "moment";
import React from "react";
const libraries = ["places"];
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
const STORE_TYPE_LIST = ["store", "freelance"];

const StoreInformation = ({
  postObject,
  setPostObject,
  cityList,
  countries,
  paymentMethodList,
  checkView,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_KEY,
    libraries,
  });
  const onMapClick = (event) => {
    // setMarker({lat:event.latLng.lat() ,lng:event.latLng.lng()})
    setPostObject({
      ...postObject,
      store_lat: event.latLng.lat(),
      store_long: event.latLng.lng(),
    });
  };

  return (
    <Card title="Store Info" className="w-100">
      <Form.Item
        required
        name="store_name_en"
        label="Store Name in English:"
        onPressEnter={(e) => e.preventDefault()}
        // rules={[
        //   { required: true, message: "Please enter store name in english" },
        // ]}
        style={{
          display: "inline-block",
          width: "calc(50% - 5px)",
          marginRight: 8,
        }}
      >
        <Input
          defaultValue={postObject?.store?.store_name_en}
          disabled={true}
          placeholder="Please enter the store name in english "
          onChange={(e) =>
            setPostObject({ ...postObject, store_name_en: e.target.value })
          }
          onPressEnter={(e) => e.preventDefault()}
        />
      </Form.Item>
      <Form.Item
        required
        name="store_name_ar"
        label="Store Name in Arabic:"
        style={{ display: "inline-block", width: "calc(50% - 5px)" }}
      >
        <Input
          defaultValue={postObject?.store?.store_name_ar}
          disabled={true}
          onPressEnter={(e) => e.preventDefault()}
          onChange={(e) =>
            setPostObject({ ...postObject, store_name_ar: e.target.value })
          }
          placeholder="Please enter the store  name in arabic"
        />
      </Form.Item>

      <Form.Item
        required
        name="store_address_en"
        label="Store Address in English:"
      >
        <Input.TextArea
          disabled={true}
          defaultValue={postObject?.store?.store_address_en}
          onChange={(e) =>
            setPostObject({ ...postObject, store_address_en: e.target.value })
          }
          placeholder="Please enter Store Address in English"
        />
      </Form.Item>

      <Form.Item
        required
        name="store_address_ar"
        label="Store Address in Arabic:"
      >
        <Input.TextArea
          disabled={true}
          defaultValue={postObject?.store?.store_address_ar}
          onChange={(e) =>
            setPostObject({ ...postObject, store_address_ar: e.target.value })
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
          disabled={true}
          placeholder="Select a Store Type"
          defaultValue={postObject?.store_type}
          onSelect={(e) => setPostObject({ ...postObject, store_type: e })}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
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
        style={{
          display: "inline-block",
          width: "calc(50% - 5px)",
          marginRight: 8,
        }}
        label="Store Phone Number:"
        onPressEnter={(e) => e.preventDefault()}
        // rules={[{ required: true, message: "Please input your phone number!" }]}
      >
        <Input
          maxLength={11}
          disabled={true}
          defaultValue={postObject?.store?.store_phone}
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
        required
        style={{
          display: "inline-block",
          width: "calc(50% - 5px)",
        }}
        onPressEnter={(e) => e.preventDefault()}
      >
        <Select
          onPressEnter={(e) => e.preventDefault()}
          showSearch
          disabled={true}
          defaultValue={postObject?.store?.days_off}
          placeholder="Select a Store Day Off"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {WEEKDAYS?.map((element, index) => (
            <Option key={index} value={element}>
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
          disabled={true}
          className="w-100"
          placeholder="Select Time"
          defaultValue={moment(postObject?.store?.open_at, "HH:mm:ss")}
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
          disabled={true}
          placeholder="Select Time"
          className="w-100"
          defaultValue={moment(postObject?.store?.close_at, "HH:mm:ss")}
          onOk={(e) => {
            const timeString = moment(e).format("HH:mm:ss");
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
        // rules={rules.price}
      >
        <Select
          onPressEnter={(e) => e.preventDefault()}
          showSearch
          disabled={true}
          placeholder="Select a Country"
          defaultValue={postObject?.store?.country_name_en}
          onChange={(e) => setPostObject({ ...postObject, country_id: e })}
          onSelect={(e) => setPostObject({ ...postObject, country_id: e })}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
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
        required
        // rules={rules.comparePrice}
      >
        <Select
          onPressEnter={(e) => e.preventDefault()}
          showSearch
          disabled={true}
          defaultValue={postObject?.store?.city_name_en}
          placeholder="Select a City"
          onSelect={(e) => setPostObject({ ...postObject, city_id: e })}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
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
      {isLoaded && (
        <>
          <h2>Store Location</h2>
          {/* <SearchBar/> */}
          {/* <Search /> */}
          <div style={{ width: "100%", height: 460 }}>
            <GoogleMap
              mapContainerStyle={{ width: 1000, height: 400 }}
              center={{
                lat: parseFloat(postObject?.store?.lat),
                lng: parseFloat(postObject?.store?.long),
              }}
              zoom={12}
              onClick={checkView ? null : onMapClick}
            >
              <Marker
                position={{
                  lat: parseFloat(postObject?.store?.lat),
                  lng: parseFloat(postObject?.store?.long),
                }}
              />
            </GoogleMap>
          </div>
        </>
      )}
      {/* <Form.Item required name="payment_method" label="Payment Method">
        <Select
          optionFilterProp="children"
          onChange={(e) => setPostObject({ ...postObject, payment_method: e })}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          style={{ width: "100%" }}
          mode="tags"
          placeholder="Payment Method"
        >
          {paymentMethodList?.map((elm) => (
            <Option value={elm.id} key={elm.id}>
              {elm.name}
            </Option>
          ))}
        </Select>
      </Form.Item> */}
    </Card>
  );
};

export default StoreInformation;
