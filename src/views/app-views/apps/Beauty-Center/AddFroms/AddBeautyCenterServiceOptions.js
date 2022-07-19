import { Button, Form, Input, Select } from "antd";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks/index";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CustomSubmittion from "../../Components/CustomSubmittion";
import ProductForm from "../../e-commerce/ProductForm";
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

const AddBeautyCenterServiceOptions = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [error, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const { services } = useFetch("beautyCenterServiceGenericOptions");
  const beautyCenterServiceResp = useFetch("beautyCenterServices");
  const beautyCenterServiceList = beautyCenterServiceResp.services;
  const [isloading, setLoading] = useState(false);
  const [postObject, setPostObject] = useState({
    beauty_center_service_generic_option_id: null,
    beauty_center_service_id: null,
    price: "",
  });
  const { Option } = Select;

  //Handle sumbit Button validation
  const buttonValidation = () => {
    if (postObject.beauty_center_service_generic_option_id && postObject.price)
      return true;
    else {
      return false;
    }
  };

  //HANDEL SUBMIT
  const handelSubmit = async (postObject) => {
    try {
      await service.post("/web/beautyCenterServiceOptions", postObject);
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
          samePage="beauty/AddBeautyCenterServiceOptions"
          tablePage="beauty/beautyCenterServiceOptions"
        />
      ) : (
        <>
          <h2 style={{ marginBottom: 20 }}>
            Adding New Beauty Center Service Option
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
              name="beauty_center_service_id"
              required
              label={<span>Beauty Center Option&nbsp;</span>}
            >
              <Select
                showSearch
                placeholder="Select a Beauty Center Generic Option"
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
                {beautyCenterServiceList?.map((element) => (
                  <Option value={element.id}>{element.name_en}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="beauty_center_service_generic_option_id"
              required
              label={<span>Beauty Center Genertic Option&nbsp;</span>}
            >
              <Select
                showSearch
                placeholder="Select a MakeUp Generic Option"
                optionFilterProp="children"
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    beauty_center_service_generic_option_id: e,
                  })
                }
                value={postObject.beauty_center_service_generic_option_id}
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
                onClick={() => history.push("beautyCenterServiceOptions")}
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
export default AddBeautyCenterServiceOptions;
