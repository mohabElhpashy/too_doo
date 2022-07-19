import { Button, Form, Input, Select } from "antd";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks/index";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
  const { services } = useFetch("weddingHall");
  const clientsResponse = useFetch("clients");
  const [isSuccess, setSuccess] = useState(false);
  const [isloading, setLoading] = useState(false);
  const clientList = clientsResponse.services;
  const [postObject, setPostObject] = useState({
    wedding_hotel_id: null,
    client_id: null,
    total_price: null,
    wedding_hotel_price: null,
    time_from: "",
    time_to: "",
  });
  const { Option } = Select;

  //Handle sumbit Button validation
  const buttonValidation = () => {
    if (postObject.wedding_hotel_id && postObject.client_id) return true;
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
      await service.post("/web/weddingHallReservation", postObject);
      setSuccess(true);
    } catch (error) {
      setError(true);
    }
  };
  return (
    <>
      {isSuccess || error ? (
        <CustomSubmittion
          samePage="hotel/AddNewRequest"
          tablePage="hotel/ListRequests"
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
                name="wedding_hotel_id"
                required
                label={<span>Wedding Hall&nbsp;</span>}
              >
                <Select
                  showSearch
                  placeholder="Select a Wedding Hall"
                  optionFilterProp="children"
                  onChange={(e) =>
                    setPostObject({ ...postObject, wedding_hotel_id: e })
                  }
                  value={postObject.wedding_hotel_id}
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
              name="wedding_hotel_price"
              label={<span> Wedding Hall Price&nbsp;</span>}
              rules={[
                {
                  required: true,
                  message: "Please input your Wedding Hall Price!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                placeholder="Please enter your Wedding Hall Price"
                value={postObject.wedding_hotel_price}
                name="wedding_hotel_price"
                addonAfter="EGP"
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    wedding_hotel_price: e.target.value,
                  })
                }
              />
            </Form.Item>

            <Form.Item
              name="total_price"
              label={<span> Total Price&nbsp;</span>}
              rules={[
                {
                  required: true,
                  message: "Please input your Total Price!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                placeholder="Please enter your Total Price"
                value={postObject.total_price}
                name="total_price"
                addonAfter="EGP"
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    total_price: e.target.value,
                  })
                }
              />
            </Form.Item>

            <Form.Item
              name="time_from"
              label={<span>Time Date&nbsp;</span>}
              rules={[
                {
                  required: true,
                  message: "Please input your Time!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                type="datetime-local"
                placeholder="Please enter your Time "
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
                  message: "Please input your Time !",
                  whitespace: true,
                },
              ]}
            >
              <Input
                type="datetime-local"
                placeholder="Please enter your Time"
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
                onClick={() => history.push("/app/apps/hotel/ListRequests")}
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
