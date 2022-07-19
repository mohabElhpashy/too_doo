import { Button, Form, Input, message, Select, notification } from "antd";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CustomSubmittion from "../../Components/CustomSubmittion";
const { Option } = Select;
const formItemLayout = {};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const AddHotel = () => {
  const history = useHistory();
  const [error, setError] = useState(false);
  const location = useLocation();
  const { services } = useFetch("sellers");
  const country_listResponse = useFetch("countries");
  const countryList = country_listResponse.services;
  const cities_listResponse = useFetch("cities");
  const citiesList = cities_listResponse.services;
  const [isloading, setLoading] = useState(false);
  let initalState;

  const emptyState = {
    name_ar: "",
    name_en: "",
    phone: "",
    country_id: null,
    city_id: null,
    address_en: "",
    address_ar: "",
    lat: null,
    long: null,
    open_at: null,
    close_at: null,
    seller_id: null,
  };

  if (location.state !== undefined) {
    if (location.state.viewMode !== undefined) {
      var { viewMode } = location.state;
      initalState = viewMode;
    } else {
      const { record } = location.state;
      for (const key in record) {
        if (
          key === "updated_at" ||
          key === "created_at" ||
          key === "deleted_at"
        ) {
          delete record[key];
        }
      }
      initalState = record;
    }
  } else {
    initalState = emptyState;
  }

  const [postObject, setPostObject] = useState(initalState);
  const [dataValidation, setDataValidation] = useState({
    name_ar: false,
    name_en: false,
    phone: false,
    country_id: false,
    city_id: false,
    address_en: false,
    address_ar: false,
    lat: false,
    long: false,
    open_at: false,
    close_at: false,
    seller_id: false,
  });
  const nameRegx = /^[a-z ,.'-]+$/i;
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        disabled={initalState === viewMode ? true : false}
        style={{ width: 70 }}
      ></Select>
    </Form.Item>
  );
  //Handle sumbit Button validation
  const buttonValidation = () => {
    let count = 0;
    for (const key in emptyState) {
      if (!postObject[key]) {
        count++;
      }
    }
    if (count == 0) {
      return true;
    } else {
      return false;
    }
  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done",
    });
  };
  //HANDEL SUBMIT
  const handelSubmit = async (postObject) => {
    const key = "updatable";
    setLoading(true);
    message.loading({ content: "Loading...", key, duration: 15 });

    try {
      // const data = new FormData();
      // for (const key of Object.keys(postObject)) {
      //   data.append(key, postObject[key]);
      // }
      if (initalState === emptyState) {
        await service.post("/web/hotels", postObject);
      } else {
        await service.put(`/web/hotels/${postObject.id}`, postObject);
      }
      setLoading(false);
      openNotificationWithIcon("success");
      message.success({ content: "Done!", key, duration: 2 });
    } catch (error) {
      message.error({ content: "Error Occured!", key, duration: 2 });
      setLoading(false);
      setError(true);
    }
  };
  //Google Maps Configration
  const defaultProps = {
    center: {
      lat: parseFloat(postObject.lat),
      lng: parseFloat(postObject.long),
    },
    zoom: 9,
  };
  const Marker = () => <img src="/img/others/marker.png" alt="" />;

  return (
    <>
      <h2 style={{ marginBottom: 20 }}>
        {initalState === emptyState
          ? "Adding New Hotel"
          : initalState === viewMode
          ? "View Record"
          : "Editing Record"}
      </h2>
      <Form
        layout="vertical"
        {...formItemLayout}
        onSubmitCapture={(e) => {
          e.preventDefault();
          handelSubmit(postObject);
        }}
        name="register"
        // onFinish={onFinish}
        initialValues={{
          residence: ["egypt", "hangzhou", "xihu"],
          prefix: "+02",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="name_ar"
          validateStatus={dataValidation.name_ar ? "success" : "validating"}
          hasFeedback
          label={
            <span>
              Name in Arabic:&nbsp;
              {/* <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip> */}
            </span>
          }
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input your name!",
          //     whitespace: true,
          //   },
          // ]}
        >
          <Input
            placeholder="Please enter your name in Arabic:"
            key="name_ar"
            value={postObject.name_ar}
            defaultValue={postObject.name_ar}
            disabled={initalState === viewMode ? true : false}
            name="name_ar"
            onChange={(e) => {
              setPostObject({ ...postObject, name_ar: e.target.value });
              if (
                nameRegx.test(postObject.name_ar) &&
                postObject.name_ar.length > 3
              ) {
                setDataValidation({
                  ...dataValidation,
                  name_ar: true,
                });
              } else {
                setDataValidation({
                  ...dataValidation,
                  name_ar: false,
                });
              }
            }}
          />
        </Form.Item>
        <Form.Item
          name="name_en"
          label={
            <span>
              Name in English&nbsp;
              {/* <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip> */}
            </span>
          }
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input your name!",
          //     whitespace: true,
          //   },
          // ]}
        >
          <Input
            placeholder="Please enter your name in English"
            value={postObject.name_en}
            defaultValue={postObject.name_en}
            disabled={initalState === viewMode ? true : false}
            name="name_en"
            onChange={(e) =>
              setPostObject({ ...postObject, name_en: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item required name={"address_ar"} label="Address in Arabic:">
          <Input
            onChange={(e) =>
              setPostObject({ ...postObject, address_ar: e.target.value })
            }
            placeholder="Please enter your Address in Arabic"
            disabled={initalState === viewMode ? true : false}
            value={postObject.address_ar}
            defaultValue={postObject.address_ar}
            name="address_ar"
          />
        </Form.Item>
        <Form.Item required name={"address_en"} label="Address in English:">
          <Input
            onChange={(e) =>
              setPostObject({ ...postObject, address_en: e.target.value })
            }
            placeholder="Please enter your Address in English"
            value={postObject.address_en}
            defaultValue={postObject.address_en}
            disabled={initalState === viewMode ? true : false}
            name="address_en"
          />
        </Form.Item>

        <Form.Item name="phone" label="Phone Number:" required>
          <Input
            maxLength={11}
            addonBefore={prefixSelector}
            min="0"
            value={postObject.phone}
            disabled={initalState === viewMode ? true : false}
            defaultValue={postObject.phone}
            onChange={(e) =>
              setPostObject({ ...postObject, phone: e.target.value })
            }
            placeholder="Please enter your Phone Number"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          required
          label="Latitude & Longitude:"
          style={{ marginBottom: 0 }}
        >
          <Form.Item
            required
            name="Latitude"
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
          >
            <Input
              name="lat"
              type="number"
              value={postObject.lat}
              defaultValue={postObject.lat}
              disabled={initalState === viewMode ? true : false}
              onChange={(e) =>
                setPostObject({ ...postObject, lat: e.target.value })
              }
              placeholder="Please enter the Latitude "
            />
          </Form.Item>
          <Form.Item
            name="Longitude"
            required
            style={{ display: "inline-block", width: "calc(50% - 5px)" }}
          >
            <Input
              type="number"
              name="long"
              value={postObject.long}
              disabled={initalState === viewMode ? true : false}
              defaultValue={postObject.long}
              onChange={(e) =>
                setPostObject({ ...postObject, long: e.target.value })
              }
              placeholder="Please enter the Longitude"
            />
          </Form.Item>
        </Form.Item>
        {/* {postObject.lat && postObject.long && (
              <Form.Item name="Cordinates" t label="Cordinates">
                <div style={{ height: "350px", width: "50%" }}>
                  <GoogleMapReact
                    center={[
                      parseFloat(postObject.lat),
                      parseFloat(postObject.long),
                    ]}
                    defaultCenter={defaultProps.center}
                    zoom={defaultProps.zoom}
                    // bootstrapURLKeys={{key: API_KEY}} // set if you need stats etc ...
                  >
                    <Marker
                      lat={parseFloat(postObject.lat)}
                      lng={parseFloat(postObject.long)}
                    />
                  </GoogleMapReact>
                </div>
              </Form.Item>
            )} */}
        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            name="Country"
            label="Countries"
            required
            // rules={[
            //   { required: true, message: "Please enter the Country" },
            // ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
          >
            <Select
              showSearch
              placeholder="Select Your Country"
              disabled={initalState === viewMode ? true : false}
              optionFilterProp="children"
              defaultValue={postObject.country_id}
              onChange={(e) =>
                setPostObject({
                  ...postObject,
                  country_id: e,
                  city_id: null,
                })
              }
              value={postObject.country_id}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {countryList?.map((element) => (
                <Option key={element.id} value={element.id}>
                  {element.name}
                </Option>
              ))}
              {/* <Option value={1}>Egypt</Option>
                  <Option value={2}>UK</Option>
                  <Option value={3}>Norway</Option> */}
            </Select>
          </Form.Item>
          <Form.Item
            name="City"
            label="Cities"
            required
            // rules={[{ required: true, message: "Please enter the City" }]}
            style={{ display: "inline-block", width: "calc(50% - 5px)" }}
          >
            <Select
              showSearch
              placeholder={"Select Your City"}
              defaultValue={postObject.city_id}
              optionFilterProp="children"
              onChange={(e) => setPostObject({ ...postObject, city_id: e })}
              disabled={
                !postObject.country_id || initalState === viewMode
                  ? true
                  : false
              }
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {citiesList
                ?.filter(
                  (element) => element.country_id === postObject.country_id
                )
                .map((city) => (
                  <Option key={city.id} value={city.id}>
                    {city.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Form.Item>

        <Form.Item required name={"open_at"} label="Open At">
          <Input
            type="datetime-local"
            disabled={initalState === viewMode ? true : false}
            onChange={(e) =>
              setPostObject({ ...postObject, open_at: e.target.value })
            }
            value={postObject.open_at}
            defaultValue={postObject.open_at}
            name="open_at"
          />
        </Form.Item>

        <Form.Item required name={"close_at"} label="Close At">
          <Input
            type="datetime-local"
            onChange={(e) =>
              setPostObject({ ...postObject, close_at: e.target.value })
            }
            value={postObject.close_at}
            defaultValue={postObject.close_at}
            disabled={initalState === viewMode ? true : false}
            name="close_at"
          />
        </Form.Item>

        <Form.Item required name={"seller_id"} label="Seller Name">
          <Select
            showSearch
            placeholder="Select a Seller"
            optionFilterProp="children"
            disabled={initalState === viewMode ? true : false}
            onChange={(e) => setPostObject({ ...postObject, seller_id: e })}
            value={postObject.seller_id}
            defaultValue={postObject.seller_id}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {services?.map((element) => (
              <Option value={element.id}>{element?.first_name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          {initalState === viewMode ? (
            <Button
              className="w-50"
              type={"primary"}
              onClick={() => history.push("Hotels")}
            >
              Go Back
            </Button>
          ) : (
            <>
              <Button
                type="default"
                style={{ marginRight: 20 }}
                onClick={() => history.push("Hotels")}
              >
                Cancel
              </Button>
              <Button
                loading={isloading}
                type="primary"
                htmlType="submit"
                onClick={() => setLoading(true)}
                disabled={!buttonValidation()}
              >
                Submit
              </Button>
            </>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default AddHotel;
