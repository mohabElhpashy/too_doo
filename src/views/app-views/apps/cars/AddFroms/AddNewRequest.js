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
  const { services } = useFetch("cars");
  const clientsResponse = useFetch("clients");
  const [isSuccess, setSuccess] = useState(false);
  const [isloading, setLoading] = useState(false);
  const clientList = clientsResponse.services;
  const [postObject, setPostObject] = useState({
    car_id: null,
    client_id: null,
    status_id: null,
    rent_from: "",
    rent_to: "",
  });
  const { Option } = Select;

  //Handle sumbit Button validation
  const buttonValidation = () => {
    if (postObject.car_id && postObject.client_id) return true;
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
      await service.post("/web/carReservation", postObject);
      setSuccess(true);
    } catch (error) {
      setError(true);
    }
  };
  return (
    <>
      {isSuccess || error ? (
        <CustomSubmittion
          samePage="cars/AddNewRequest"
          tablePage="cars/ListRequests"
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
                name="car_id"
                required
                label={<span>Car Name&nbsp;</span>}
              >
                <Select
                  showSearch
                  placeholder="Select a Car"
                  optionFilterProp="children"
                  onChange={(e) => setPostObject({ ...postObject, car_id: e })}
                  value={postObject.car_id}
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
              name="rent_from"
              label={<span>Rent Date&nbsp;</span>}
              rules={[
                {
                  required: true,
                  message: "Please input your Rent Date!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                type="datetime-local"
                placeholder="Please enter your Rent Date"
                value={postObject.rent_from}
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
                  message: "Please input your Rent To Date!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                type="datetime-local"
                placeholder="Please enter your Rent To Date"
                value={postObject.rent_to}
                name="rent_to"
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    rent_to: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
                type="default"
                style={{ marginRight: 20 }}
                onClick={() => history.push("/app/apps/cars/ListRequests")}
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
