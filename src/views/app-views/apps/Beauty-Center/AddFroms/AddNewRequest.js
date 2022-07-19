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
  const { services } = useFetch("beautyCenterServices");
  const clientsResponse = useFetch("clients");
  const [isSuccess, setSuccess] = useState(false);
  const [isloading, setLoading] = useState(false);
  const clientList = clientsResponse.services;
  const [postObject, setPostObject] = useState({
    beauty_center_service_id: null,
    client_id: null,
    total_price: "",
    beauty_center_service_price: "",
    rent_from: "",
    rent_to: "",
  });
  const { Option } = Select;

  //Handle sumbit Button validation
  const buttonValidation = () => {
    if (postObject.beauty_center_service_id && postObject.client_id)
      return true;
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
      await service.post("/web/beautyCenterServiceReservations", postObject);
      setSuccess(true);
    } catch (error) {
      setError(true);
    }
  };
  return (
    <>
      {isSuccess || error ? (
        <CustomSubmittion
          samePage="beauty/AddNewRequest"
          tablePage="beauty/ListRequests"
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
                name="beauty_center_service_id"
                required
                label={<span>Beauty Center Service Name&nbsp;</span>}
              >
                <Select
                  showSearch
                  placeholder="Select a Beauty Center Service"
                  optionFilterProp="children"
                  onChange={(e) =>
                    setPostObject({
                      ...postObject,
                      beauty_center_service_id: e,
                    })
                  }
                  value={postObject.beauty_center_service_id}
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
              required
              name={"beauty_center_service_price"}
              label="MakeUp Price"
            >
              <Input
                addonAfter="EGP"
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    beauty_center_service_price: e.target.value,
                  })
                }
                placeholder="Please enter your Beauty Center Price"
                value={postObject.beauty_center_service_price}
                name="beauty_center_service_price"
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
// import React from 'react'
// import Form from '../../e-commerce/ProductForm'
// function AddNewRequest() {
//   return (
//     <div>
//       <Form/>
//     </div>
//   )
// }

// export default AddNewRequest
