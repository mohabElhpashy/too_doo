import { Button, Form, Input, Select } from "antd";
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

const AddDressStore = () => {
  const history = useHistory();
  const [error, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isloading, setLoading] = useState(false);
  const location = useLocation();
  const { services } = useFetch("sellers");

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
  } else {
    initalState = emptyState;
  }

  const [postObject, setPostObject] = useState(initalState);

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
      if (initalState === emptyState) {
        await service.post("/web/dressStore", postObject);
      } else {
        await service.put(`/web/dressStore/${postObject.id}`, postObject);
      }
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  //Google Maps Configration
  const defaultProps = {
    center: {
      lat: parseFloat(postObject?.lat),
      lng: parseFloat(postObject?.long),
    },
    zoom: 9,
  };
  // const Marker = () => <img src="/img/others/marker.png" alt="" />;

  return (
    <>
      {isSuccess || error ? (
        <CustomSubmittion
          samePage="dresses/AddDressStore"
          tablePage="dresses/DressStore"
          type={isSuccess ? "success" : "error"}
        />
      ) : (
        <>
          <h2 style={{ marginBottom: 20 }}>
            {initalState === emptyState
              ? "Adding New Dress Store"
              : "Editing Record"}
          </h2>
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
                defaultValue={postObject.name_ar}
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
                defaultValue={postObject.name_en}
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
                value={postObject.address_ar}
                defaultValue={postObject.address_ar}
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
                defaultValue={postObject.address_en}
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
                defaultValue={postObject.phone}
                maxLength={12}
                onChange={(e) =>
                  setPostObject({ ...postObject, phone: e.target.value })
                }
                placeholder="Please enter your Phone Number"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item label="Latitude & Longitude" style={{ marginBottom: 0 }}>
              <Form.Item
                name="Latitude"
                rules={[
                  { required: true, message: "Please enter the Latitude" },
                ]}
                style={{
                  display: "inline-block",
                  width: "calc(50% - 5px)",
                  marginRight: 8,
                }}
              >
                <Input
                  value={postObject.lat}
                  defaultValue={postObject?.lat}
                  onChange={(e) =>
                    setPostObject({
                      ...postObject,
                      lat: parseFloat(e.target.value),
                    })
                  }
                  placeholder="Please enter the Latitude "
                />
              </Form.Item>
              <Form.Item
                name="Longitude"
                rules={[
                  { required: true, message: "Please enter the Latitude" },
                ]}
                style={{ display: "inline-block", width: "calc(50% - 5px)" }}
              >
                <Input
                  value={postObject.long}
                  defaultValue={postObject?.long}
                  onChange={(e) =>
                    setPostObject({
                      ...postObject,
                      long: parseFloat(e.target.value),
                    })
                  }
                  placeholder="Please enter the Longitude"
                />
              </Form.Item>
            </Form.Item>
            {/* {postObject?.lat && postObject?.long && (
              <Form.Item name="Cordinates" t label="Cordinates">
                <div style={{ height: "350px", width: "50%" }}>
                  <GoogleMapReact
                    center={[
                      parseFloat(postObject?.lat),
                      parseFloat(postObject?.long),
                    ]}
                    defaultCenter={defaultProps.center}
                    zoom={defaultProps.zoom}
                    // bootstrapURLKeys={{key: API_KEY}} // set if you need stats etc ...
                  >
                    <Marker
                      lat={parseFloat(postObject?.lat)}
                      lng={parseFloat(postObject?.long)}
                    />
                  </GoogleMapReact>
                </div>
              </Form.Item>
            )} */}

            <Form.Item label="Countries & Cities" style={{ marginBottom: 0 }}>
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
                <Input
                  value={postObject.country_id}
                  defaultValue={postObject.country_id}
                  onChange={(e) =>
                    setPostObject({ ...postObject, country_id: e.target.value })
                  }
                  placeholder="Please enter the Country "
                />
              </Form.Item>
              <Form.Item
                name="City"
                rules={[{ required: true, message: "Please enter the City" }]}
                style={{ display: "inline-block", width: "calc(50% - 5px)" }}
              >
                <Input
                  value={postObject.city_id}
                  defaultValue={postObject.city_id}
                  onChange={(e) =>
                    setPostObject({ ...postObject, city_id: e.target.value })
                  }
                  placeholder="Please enter the City"
                />
              </Form.Item>
            </Form.Item>

            <Form.Item name={"open_at"} label="Open At">
              <Input
                type="datetime-local"
                defaultValue={postObject.open_at}
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
                defaultValue={postObject.close_at}
                name="close_at"
              />
            </Form.Item>

            <Form.Item name={"seller_id"} label="Seller Name">
              <Select
                showSearch
                placeholder="Select a Seller"
                optionFilterProp="children"
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
              <Button
                type="default"
                style={{ marginRight: 20 }}
                onClick={() => history.push("dressStore")}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!buttonValidation()}
                onClick={() => setLoading(true)}
                loading={isloading}
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
export default AddDressStore;
