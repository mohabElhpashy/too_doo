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

const AddCarOption = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [error, setError] = useState(false);
  const location = useLocation();
  const [isSuccess, setSuccess] = useState(false);
  const { services } = useFetch("carGenericOption");
  const [isloading, setLoading] = useState(false);

  const emptyState = {
    car_generic_option_id: null,
    carOption: null,
    price: "",
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
    if (postObject.car_generic_option_id && postObject.price) return true;
    else {
      return false;
    }
  };

  //HANDEL SUBMIT
  const handelSubmit = async (postObject) => {
    try {
      if (initalState === emptyState) {
        await service.post("/web/carOption", postObject);
      } else {
        await service.put(`/web/${postObject.id}`, postObject);
      }
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
          samePage="cars/AddCarOption"
          tablePage="cars/CarOption"
        />
      ) : (
        <>
          <h2 style={{ marginBottom: 20 }}>
            {initalState === emptyState
              ? "Adding New Car Option"
              : "Editing Record"}
          </h2>
          <Form
            {...formItemLayout}
            form={form}
            onSubmitCapture={(e) => {
              e.preventDefault();
              handelSubmit(postObject);
            }}
            // onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item
              name="car_generic_option_id"
              required
              label={<span>Car Genertic Option&nbsp;</span>}
            >
              <Select
                showSearch
                placeholder="Select a Car Generic Option"
                defaultValue={postObject.car_generic_option_id}
                optionFilterProp="children"
                onChange={(e) =>
                  setPostObject({ ...postObject, car_generic_option_id: e })
                }
                value={postObject.car_generic_option_id}
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
              name="price"
              label={<span> Price&nbsp;</span>}
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
                defaultValue={postObject.price}
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
                onClick={() => history.push("/app/apps/cars/CarOption")}
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
export default AddCarOption;
