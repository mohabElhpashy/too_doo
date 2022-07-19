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

const AddBeautyCenterServiceReservationOptions = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [error, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const { services } = useFetch("beautyCenterServiceReservations");
  const beautyCenterRes = useFetch("beautyCenterServiceOptions");
  const [isloading, setLoading] = useState(false);
  const beautyCenterOptionList = beautyCenterRes.services;
  const [postObject, setPostObject] = useState({
    beauty_center_service_reservation_id: null,
    beauty_center_service_option_id: null,
    option_price: "",
  });
  const { Option } = Select;

  //Handle sumbit Button validation
  const buttonValidation = () => {
    if (
      postObject.beauty_center_service_reservation_id &&
      postObject.beauty_center_service_option_id &&
      postObject.option_price
    )
      return true;
    else {
      return false;
    }
  };

  //HANDEL SUBMIT
  const handelSubmit = async (postObject) => {
    try {
      await service.post(
        "/web/beautyCenterServiceReservationOptions",
        postObject
      );
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setError(true);
    }
  };
  return (
    <>
      {error || isSuccess ? (
        <CustomSubmittion
          type={isSuccess ? "success" : "error"}
          samePage="beauty/AddBeautyCenterServiceReservationOptions"
          tablePage="beauty/beautyCenterServiceReservationOptions"
        />
      ) : (
        <>
          <h2 style={{ marginBottom: 20 }}>
            Adding New Beauty Center Reservation Option
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
                name="beauty_center_service_reservation_id"
                required
                label={<span>Beauty Center Service Reservation&nbsp;</span>}
              >
                <Select
                  showSearch
                  placeholder="Select a Beauty Center Service Reservation "
                  optionFilterProp="children"
                  onChange={(e) =>
                    setPostObject({
                      ...postObject,
                      beauty_center_service_reservation_id: e,
                    })
                  }
                  value={postObject.beauty_center_service_reservation_id}
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
                name="beauty_center_service_option_id"
                required
                label={<span>MakeUp Service Option&nbsp;</span>}
              >
                <Select
                  showSearch
                  placeholder="Select a Beauty Center Service Option"
                  optionFilterProp="children"
                  onChange={(e) =>
                    setPostObject({
                      ...postObject,
                      beauty_center_service_option_id: e,
                    })
                  }
                  value={postObject.beauty_center_service_option_id}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {beautyCenterOptionList?.map((element) => (
                    <Option value={element.id}>
                      {element?.car_generic_option_id}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form.Item>

            <Form.Item
              name="option_price"
              label={<span>Option Price&nbsp;</span>}
              rules={[
                {
                  required: true,
                  message: "Please input your Price!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                type="number"
                placeholder="Please enter your Price"
                value={postObject.option_price}
                name="option_price"
                addonAfter="EGP"
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    option_price: e.target.value,
                  })
                }
              />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button
                type="default"
                style={{ marginRight: 20 }}
                onClick={() =>
                  history.push("beautyCenterServiceReservationOptions")
                }
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
export default AddBeautyCenterServiceReservationOptions;
