import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Switch } from "antd";
import service from "auth/FetchInterceptor";
import GoogleMapReact from "google-map-react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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

const AddBeautyCenter = () => {
  const history = useHistory();
  const [error, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [postObject, setPostObject] = useState({
    name_ar: "",
    name_en: "",
    phone: "",
    country_id: null,
    city_id: null,
    address_en: "",
    address_ar: "",
    lat: null,
    lng: null,
    open_at: null,
    close_at: null,
    seller_id: null,
    active: 0,
  });

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}></Select>
    </Form.Item>
  );
  //Handle sumbit Button validation
  const buttonValidation = () => {
    if (postObject.name_ar && postObject.name_en && postObject.phone)
      return true;
    else {
      return false;
    }
  };
  //HANDEL SUBMIT
  const handelSubmit = async (postObject) => {
    try {
      //    const data = new FormData();
      //    for (const key of Object.keys(postObject)) {
      //    data.append(key, postObject[key]);
      // }
      await service.post("/web/beautyCenters", postObject);
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  };
  //Google Maps Configration
  const defaultProps = {
    center: {
      lat: parseFloat(postObject.lat),
      lng: parseFloat(postObject.lng),
    },
    zoom: 9,
  };
  const Marker = () => <img src="/img/others/marker.png" alt="" />;

  return (
    <>
      {isSuccess || error ? (
        <CustomSubmittion
          type={isSuccess ? "success" : "error"}
          samePage="beauty/AddBeautyCenter"
          tablePage="beauty/beautyCenter"
        />
      ) : (
        <>
          <h2 style={{ marginBottom: 20 }}>Adding New Beauty Center</h2>
          <Form
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
              label={
                <span>
                  Name in Arabic&nbsp;
                  {/* <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip> */}
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                placeholder="Please enter your name in Arabic"
                value={postObject.name_ar}
                name="name_ar"
                onChange={(e) =>
                  setPostObject({ ...postObject, name_ar: e.target.value })
                }
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
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                placeholder="Please enter your name in English"
                value={postObject.name_en}
                name="name_en"
                onChange={(e) =>
                  setPostObject({ ...postObject, name_en: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item name={"address_ar"} label="Address in Arabic">
              <Input
                onChange={(e) =>
                  setPostObject({ ...postObject, address_ar: e.target.value })
                }
                placeholder="Please enter your Address in Arabic"
                value={postObject.address_en}
                name="address_ar"
              />
            </Form.Item>
            <Form.Item name={"address_en"} label="Address in English">
              <Input
                onChange={(e) =>
                  setPostObject({ ...postObject, address_en: e.target.value })
                }
                placeholder="Please enter your Address in English"
                value={postObject.address_en}
                name="address_en"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                value={postObject.phone}
                maxLength={11}
                onChange={(e) =>
                  setPostObject({ ...postObject, phone: e.target.value })
                }
                placeholder="Please enter your Phone Number"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              required
              label="Latitude & Longitude"
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
                  name="lng"
                  value={postObject.lng}
                  onChange={(e) =>
                    setPostObject({ ...postObject, lng: e.target.value })
                  }
                  placeholder="Please enter the lngitude"
                />
              </Form.Item>
            </Form.Item>
            {postObject.lat && postObject.lng && (
              <Form.Item required name="Cordinates" t label="Cordinates">
                <div style={{ height: "350px", width: "50%" }}>
                  <GoogleMapReact
                    center={[
                      parseFloat(postObject.lat),
                      parseFloat(postObject.lng),
                    ]}
                    defaultCenter={defaultProps.center}
                    zoom={defaultProps.zoom}
                    // bootstrapURLKeys={{key: API_KEY}} // set if you need stats etc ...
                  >
                    <Marker
                      lat={parseFloat(postObject.lat)}
                      lng={parseFloat(postObject.lng)}
                    />
                  </GoogleMapReact>
                </div>
              </Form.Item>
            )}
            <Form.Item
              required
              label="Countries & Cities"
              style={{ marginBottom: 0 }}
            >
              <Form.Item
                name="Country"
                rules={[
                  { required: true, message: "Please enter the Country" },
                ]}
                style={{
                  display: "inline-block",
                  width: "calc(50% - 5px)",
                  marginRight: 8,
                }}
              >
                <Select
                  showSearch
                  placeholder="Select Your Country"
                  optionFilterProp="children"
                  onChange={(e) =>
                    setPostObject({ ...postObject, country_id: e })
                  }
                  value={postObject.dress_variation_id}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {/* {services?.map((element) => (
                    <Option value={element.id}>Test</Option>
                  ))} */}
                  <Option value={1}>Egypt</Option>
                  <Option value={2}>UK</Option>
                  <Option value={3}>Norway</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="City"
                rules={[{ required: true, message: "Please enter the City" }]}
                style={{ display: "inline-block", width: "calc(50% - 5px)" }}
              >
                <Select
                  showSearch
                  placeholder="Select Your City"
                  optionFilterProp="children"
                  onChange={(e) => setPostObject({ ...postObject, city_id: e })}
                  value={postObject.city_id}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {/* {services?.map((element) => (
                    <Option value={element.id}>Test</Option>
                  ))} */}
                  <Option value={1}>Cairo</Option>
                  <Option value={2}>London</Option>
                  <Option value={3}>Oslo</Option>
                </Select>
              </Form.Item>
            </Form.Item>

            <Form.Item name={"open_at"} label="Open At">
              <Input
                type="datetime-local"
                onChange={(e) =>
                  setPostObject({ ...postObject, open_at: e.target.value })
                }
                value={postObject.open_at}
                name="open_at"
              />
            </Form.Item>

            <Form.Item name={"close_at"} label="Close At">
              <Input
                type="datetime-local"
                onChange={(e) =>
                  setPostObject({ ...postObject, close_at: e.target.value })
                }
                value={postObject.close_at}
                name="close_at"
              />
            </Form.Item>

            <Form.Item name={"seller_id"} label="Seller Id">
              <Input
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    seller_id: parseInt(e.target.value),
                  })
                }
                placeholder="Please enter your seller Store"
                value={postObject.seller_id}
                name="seller_id"
              />
            </Form.Item>
            <Form.Item name={"active"} label="Active">
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(e) => {
                  if (e) setPostObject({ ...postObject, active: 1 });
                  else {
                    setPostObject({ ...postObject, active: 0 });
                  }
                }}
                defaultChecked
              />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
                type="default"
                style={{ marginRight: 20 }}
                onClick={() => history.push("beautyCenter")}
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
            </Form.Item>
          </Form>
        </>
      )}
    </>
  );
};
export default AddBeautyCenter;
