import { Button, Form, Input, Select } from "antd";
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

const AddMakeupServiceOption = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [error, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const { services } = useFetch("makeupServiceGenericOptions");
  const makeUpServiceResp = useFetch("makeupServices");
  const makeupServiceList = makeUpServiceResp.services;
  const [isloading, setLoading] = useState(false);
  const location = useLocation();
  const emptyState = {
    makeup_service_generic_option_id: null,
    makeup_service_id: null,
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
    if (postObject.makeup_service_generic_option_id && postObject.price)
      return true;
    else {
      return false;
    }
  };

  //HANDEL SUBMIT
  const handelSubmit = async (postObject) => {
    try {
      if (initalState === emptyState) {
        await service.post("/web/makeupServiceOptions", postObject);
      } else {
        await service.put(
          `/web/makeupServiceOptions/${postObject.id}`,
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
          samePage="makeup/AddMakeupServiceOption"
          tablePage="makeup/makeupServiceOptions"
        />
      ) : (
        <>
          <h2 style={{ marginBottom: 20 }}>
            {initalState === emptyState
              ? "  Adding New MakeUp Option"
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
              name="makeup_service_id"
              required
              label={<span>MakeUp Service Option&nbsp;</span>}
            >
              <Select
                showSearch
                placeholder="Select a MakeUp Generic Option"
                defaultValue={postObject.makeup_service_id}
                optionFilterProp="children"
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    makeup_service_id: e,
                  })
                }
                value={postObject.makeup_service_id}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {makeupServiceList?.map((element) => (
                  <Option value={element.id}>{element.name_en}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="makeup_service_generic_option_id"
              required
              label={<span>MakeUp Genertic Option&nbsp;</span>}
            >
              <Select
                showSearch
                placeholder="Select a MakeUp Generic Option"
                optionFilterProp="children"
                defaultValue={postObject.makeup_service_generic_option_id}
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    makeup_service_generic_option_id: e,
                  })
                }
                value={postObject.makeup_service_generic_option_id}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {services?.map((element) => (
                  <Option value={element.id}>{element.title_en}</Option>
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
                defaultValue={postObject.price}
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
                onClick={() => history.push("makeup/makeupServiceOptions")}
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
export default AddMakeupServiceOption;
