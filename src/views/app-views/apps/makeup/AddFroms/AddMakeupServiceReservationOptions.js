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

const AddMakeupServiceReservationOptions = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [error, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const { services } = useFetch("makeupServiceReservations");
  const makeUPOptionRes = useFetch("makeupServiceOptions");
  const [isloading, setLoading] = useState(false);
  const makeUPOptionList = makeUPOptionRes.services;
  const location = useLocation();
  const emptyState = {
    makeup_service_reservation_id: null,
    makeup_service_option_id: null,
    option_price: "",
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
    if (
      postObject.makeup_service_reservation_id &&
      postObject.makeup_service_option_id &&
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
      if (initalState === emptyState) {
        await service.post("/web/makeupServiceReservationOptions", postObject);
      } else {
        await service.put(
          `/web/makeupServiceReservationOptions/${postObject.id}`,
          postObject
        );
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
          samePage="makeup/AddMakeupServiceReservationOptions"
          tablePage="makeup/makeupReservationOptions"
        />
      ) : (
        <>
          <h2 style={{ marginBottom: 20 }}>
            {initalState === emptyState
              ? "Adding New MakeUp Reservation Option"
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
                name="makeup_service_reservation_id"
                required
                label={<span>MakeUp Service Reservation&nbsp;</span>}
              >
                <Select
                  showSearch
                  placeholder="Select a MakeUp Service Reservation "
                  optionFilterProp="children"
                  defaultValue={postObject.makeup_service_reservation_id}
                  onChange={(e) =>
                    setPostObject({
                      ...postObject,
                      makeup_service_reservation_id: e,
                    })
                  }
                  value={postObject.makeup_service_reservation_id}
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
                name="makeup_service_option_id"
                required
                label={<span>MakeUp Service Option&nbsp;</span>}
              >
                <Select
                  showSearch
                  placeholder="Select a MakeUp Service Option"
                  optionFilterProp="children"
                  defaultValue={postObject.makeup_service_option_id}
                  onChange={(e) =>
                    setPostObject({
                      ...postObject,
                      makeup_service_option_id: e,
                    })
                  }
                  value={postObject.makeup_service_option_id}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {makeUPOptionList?.map((element) => (
                    <Option value={element.id}>{element?.id}</Option>
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
                defaultValue={postObject.option_price}
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
                onClick={() => history.push("makeup/makeupReservationOptions")}
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
export default AddMakeupServiceReservationOptions;
