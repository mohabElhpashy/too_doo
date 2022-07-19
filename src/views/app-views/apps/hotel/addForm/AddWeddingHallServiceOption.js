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

const AddWeddingHallServiceOption = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [error, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const { services } = useFetch("carReservation");
  const carOptionRes = useFetch("carOption");
  const [isloading, setLoading] = useState(false);
  const carOptionList = carOptionRes.services;
  const [postObject, setPostObject] = useState({
    checkup_id: null,
    car_option_id: null,
    price: "",
  });
  const { Option } = Select;

  //Handle sumbit Button validation
  const buttonValidation = () => {
    if (postObject.checkup_id && postObject.car_option_id && postObject.price)
      return true;
    else {
      return false;
    }
  };

  //HANDEL SUBMIT
  const handelSubmit = async (postObject) => {
    try {
      await service.post("/web/weddingHallReservationOption", postObject);
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
          samePage="hotel/AddWeddingHallServiceOption"
          tablePage="/hotel/weddingHallReservationOptions"
        />
      ) : (
        <>
          <h2 style={{ marginBottom: 20 }}>
            Adding New Wedding Hall Reservation Option
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
                name="checkup_id"
                required
                label={<span> Check Up&nbsp;</span>}
              >
                <Select
                  showSearch
                  placeholder="Select a  Wedding Hall Reservation Option"
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
                    <Option value={element.id}>Test</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="car_option_id"
                required
                label={<span>Check Up GenericOption&nbsp;</span>}
              >
                <Select
                  showSearch
                  placeholder="Select a Car Option"
                  optionFilterProp="children"
                  onChange={(e) =>
                    setPostObject({ ...postObject, car_option_id: e })
                  }
                  value={postObject.car_option_id}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {carOptionList?.map((element) => (
                    <Option value={element.id}>
                      {element?.car_generic_option_id}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form.Item>

            <Form.Item
              name="price"
              label={<span>Price&nbsp;</span>}
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
                value={postObject.price}
                name="price"
                addonAfter="EGP"
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    price: e.target.value,
                  })
                }
              />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button
                type="default"
                style={{ marginRight: 20 }}
                onClick={() =>
                  history.push("/app/apps/hotel/weddingHallReservationOptions")
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
export default AddWeddingHallServiceOption;
