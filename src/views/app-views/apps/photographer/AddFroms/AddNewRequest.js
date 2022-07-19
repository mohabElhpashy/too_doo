import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Switch } from "antd";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks/index";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CustomSubmittion from "../../Components/CustomSubmittion";

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

const AddNewRequest = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [error, setError] = useState(false);
  const { services } = useFetch("photosession");
  const clientsResponse = useFetch("clients");
  const location = useLocation();
  const [isSuccess, setSuccess] = useState(false);
  const [isloading, setLoading] = useState(false);
  const clientList = clientsResponse.services;

  const emptyState = {
    photo_session_id: null,
    client_id: null,
    total_price: "",
    photo_session_price: "",
    rent_from: "",
    rent_to: "",
    status: 1,
  };

  let initalState;
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
  const { Option } = Select;
  //Handle sumbit Button validation
  const buttonValidation = () => {
    if (postObject.photo_session_id && postObject.client_id) return true;
    else {
      return false;
    }
  };

  //HANDEL SUBMIT
  const handelSubmit = async (postObject) => {
    try {
      //   const data = new FormData();
      //   for (const key of Object.keys(postObject)) {
      //     data.append(key, postObject[key]);
      //   }
      if (initalState === emptyState) {
        await service.post("/web/photoSessionReservation", postObject);
      } else {
        await service.put(
          `/web/photoSessionReservation/${postObject.id}`,
          postObject
        );
      }

      setSuccess(true);
    } catch (error) {
      setError(true);
    }
  };
  return (
    <>
      {isSuccess || error ? (
        <CustomSubmittion
          samePage="photographer/AddNewRequest"
          tablePage="photographer/ListRequests"
          type={isSuccess ? "success" : "error"}
        />
      ) : (
        <>
          <h2 style={{ marginBottom: 20 }}>
            {initalState === emptyState
              ? "Adding New Reservation Request"
              : "Editing Record"}
          </h2>
          <Form
            {...formItemLayout}
            form={form}
            onSubmitCapture={(e) => {
              e.preventDefault();
              handelSubmit(postObject);
            }}
            name="register"
            // onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item style={{ marginBottom: 0 }}>
              <Form.Item
                name="photo_session_id"
                required
                label={<span>PhotoSession Name&nbsp;</span>}
              >
                <Select
                  showSearch
                  placeholder="Select a PhotoSession Service"
                  optionFilterProp="children"
                  defaultValue={postObject.photo_session_id}
                  onChange={(e) =>
                    setPostObject({
                      ...postObject,
                      photo_session_id: e,
                    })
                  }
                  value={postObject.photo_session_id}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {services?.map((element) => (
                    <Option value={element.id}>{element.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="client_id"
                required
                label={<span>Client Name&nbsp;</span>}
              >
                <Select
                  showSearch
                  placeholder="Select a Client"
                  optionFilterProp="children"
                  defaultValue={postObject.client_id}
                  onChange={(e) =>
                    setPostObject({ ...postObject, client_id: e })
                  }
                  value={postObject.client_id}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {clientList?.map((element) => (
                    <Option key={element.id} value={element.id}>
                      {element?.first_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form.Item>
            <Form.Item
              required
              name={"photo_session_price"}
              label="PhotoSession Price"
            >
              <Input
                addonAfter="EGP"
                defaultValue={postObject.photo_session_price}
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    photo_session_price: e.target.value,
                  })
                }
                placeholder="Please enter your PhotoSession Price"
                defaultValue={postObject.photo_session_price}
                value={postObject.photo_session_price}
                name="photo_session_price"
              />
            </Form.Item>

            <Form.Item required name={"total_price"} label="Total Price">
              <Input
                addonAfter="EGP"
                onChange={(e) =>
                  setPostObject({ ...postObject, total_price: e.target.value })
                }
                placeholder="Please enter your Total Price"
                value={postObject.total_price}
                defaultValue={postObject.total_price}
                name="total_price"
              />
            </Form.Item>

            <Form.Item
              name="rent_from"
              label={<span>Rent From&nbsp;</span>}
              rules={[
                {
                  required: true,
                  message: "Please input your Rent From!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                type="datetime-local"
                placeholder="Please enter your Rent From"
                value={postObject.rent_from}
                defaultValue={postObject.rent_from}
                name="rent_from"
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    rent_from: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item
              name="rent_to"
              label={<span>Rent To&nbsp;</span>}
              rules={[
                {
                  required: true,
                  message: "Please input your Rent To !",
                  whitespace: true,
                },
              ]}
            >
              <Input
                type="datetime-local"
                placeholder="Please enter your Rent To "
                value={postObject.rent_to}
                name="rent_to"
                defaultValue={postObject.rent_to}
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    rent_to: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item name={"status"} label="Status">
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(e) => {
                  if (e) setPostObject({ ...postObject, status: 1 });
                  else {
                    setPostObject({ ...postObject, status: 0 });
                  }
                }}
                defaultChecked
              />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
                type="default"
                style={{ marginRight: 20 }}
                onClick={() => history.push("ListRequests")}
              >
                Cancel
              </Button>
              <Button
                loading={isloading}
                type="primary"
                htmlType="submit"
                disabled={!buttonValidation()}
                onClick={() => setLoading(true)}
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
export default AddNewRequest;
