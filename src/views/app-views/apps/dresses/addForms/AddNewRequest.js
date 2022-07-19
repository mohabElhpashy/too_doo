import { Button, Form, Input, Select } from "antd";
import service from "auth/FetchInterceptor";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
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
  const { services } = useFetch("dressVariation");
  const clientsResponse = useFetch("clients");
  const [isSuccess, setSuccess] = useState(false);
  const location = useLocation();
  const [isloading, setLoading] = useState(false);
  const clientList = clientsResponse.services;
  const emptyState = {
    dress_variation_id: null,
    client_id: null,
    status_id: 1,
    fit_date: "",
    pickup_date: "",
  };
  let initalState;

  const { Option } = Select;

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

  //Handle sumbit Button validation
  const buttonValidation = () => {
    if (postObject.dress_variation_id && postObject.client_id) return true;
    else {
      return false;
    }
  };

  //HANDEL SUBMIT
  const handelSubmit = async (postObject) => {
    try {
      if (initalState === emptyState) {
        await service.post("/web/dressReservation", postObject);
      } else {
        await service.put(`/web/dressReservation/${postObject.id}`, postObject);
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
          samePage="dresses/AddNewRequest"
          tablePage="dresses/ListRequests"
          type={isSuccess ? "success" : "error"}
        />
      ) : (
        <>
          <h2 style={{ marginBottom: 20 }}>
            {initalState === emptyState
              ? "Adding New Dress Request"
              : "Editing Record"}{" "}
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
                name="dress_variation_id"
                required
                label={<span>Dress Variation&nbsp;</span>}
              >
                <Select
                  showSearch
                  placeholder="Select a Dress Variation ID"
                  defaultValue={postObject.dress_variation_id}
                  optionFilterProp="children"
                  onChange={(e) =>
                    setPostObject({ ...postObject, dress_variation_id: e })
                  }
                  value={postObject.dress_variation_id}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {services?.map((element) => (
                    <Option value={element.id}>Test</Option>
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
                type="text"
                placeholder="Please enter your Status ID"
                value={postObject.status_id}
                defaultValue={postObject.status_id}
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
              name="fit_date"
              label={<span>Fit Date&nbsp;</span>}
              rules={[
                {
                  required: true,
                  message: "Please input your Fit Date!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                type="datetime-local"
                placeholder="Please enter your Fit Date"
                value={postObject.fit_date}
                defaultValue={postObject.fit_date}
                name="fit_date"
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    fit_date: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item
              name="pickup_date"
              label={<span>Pick Up Date&nbsp;</span>}
              rules={[
                {
                  required: true,
                  message: "Please input your Pick UP Date!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                type="datetime-local"
                placeholder="Please enter your Pick UP Date"
                value={postObject.pickup_date}
                defaultValue={postObject.pickup_date}
                name="pickup_date"
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    pickup_date: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
                type="default"
                style={{ marginRight: 20 }}
                onClick={() => history.push("/app/apps/dresses/ListRequests")}
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
