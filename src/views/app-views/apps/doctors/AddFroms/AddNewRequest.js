import { Button, Form, Input, Select } from "antd";
import service from "auth/FetchInterceptor";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TestError from "../../../../auth-views/errors/error-page-2";
import { useFetch } from "hooks/index";
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
  const { services } = useFetch("checkups");
  const clientsResponse = useFetch("clients");
  const [isSuccess, setSuccess] = useState(false);
  const [isloading, setLoading] = useState(false);
  const clientList = clientsResponse.services;
  const [postObject, setPostObject] = useState({
    checkup_id: null,
    client_id: null,
    status_id: null,
    total_price: "",
    checkup_price: "",
    time_from: "",
    time_to: "",
  });
  const { Option } = Select;

  //Handle sumbit Button validation
  const buttonValidation = () => {
    if (postObject.checkup_id && postObject.client_id) return true;
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
      await service.post("/web/checkupReservation", postObject);
      setSuccess(true);
    } catch (error) {
      setError(true);
    }
  };
  return (
    <>
      {isSuccess || error ? (
        <CustomSubmittion
          samePage="doctors/AddNewRequest"
          tablePage="doctors/ListRequests"
          type={isSuccess ? "success" : "error"}
        />
      ) : (
        <>
          <h2 style={{ marginBottom: 20 }}>Adding New Request</h2>
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
                name="checkup_id"
                required
                label={<span>Check Up Name&nbsp;</span>}
              >
                <Select
                  showSearch
                  placeholder="Select a Check Up"
                  optionFilterProp="children"
                  onChange={(e) =>
                    setPostObject({ ...postObject, checkup_id: e })
                  }
                  value={postObject.checkup_id}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {services?.map((element) => (
                    <Option value={element.id}>{element.name_en}</Option>
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
                    <Option value={element.id}>{element?.first_name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Form.Item>
            <Form.Item required name={"checkup_price"} label="Check Up Price">
              <Input
                addonAfter="EGP"
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    checkup_price: e.target.value,
                  })
                }
                placeholder="Please enter your Check Up Price"
                value={postObject.checkup_price}
                name="checkup_price"
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
                name="total_price"
              />
            </Form.Item>
            <Form.Item
              name="status_id"
              label={<span>Status ID&nbsp;</span>}
              rules={[
                {
                  required: true,
                  message: "Please input your Status ID!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                placeholder="Please enter your Status ID"
                value={postObject.status_id}
                name="status_id"
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    status_id: e.target.value,
                  })
                }
              />
            </Form.Item>

            <Form.Item
              name="time_from"
              label={<span>Time From&nbsp;</span>}
              rules={[
                {
                  required: true,
                  message: "Please input your Time From!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                type="datetime-local"
                placeholder="Please enter your Time From"
                value={postObject.time_from}
                name="time_from"
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    time_from: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item
              name="time_to"
              label={<span>Time To&nbsp;</span>}
              rules={[
                {
                  required: true,
                  message: "Please input your Time To !",
                  whitespace: true,
                },
              ]}
            >
              <Input
                type="datetime-local"
                placeholder="Please enter your Time To "
                value={postObject.time_to}
                name="time_to"
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    time_to: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
                type="default"
                style={{ marginRight: 20 }}
                onClick={() => history.push("/app/apps/doctors/ListRequests")}
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
