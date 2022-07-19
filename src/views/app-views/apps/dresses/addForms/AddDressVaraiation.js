import { Button, Form, Input, Select } from "antd";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CustomSubmittion from "../../Components/CustomSubmittion";
const { Option } = Select;
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

const AddDressVaraiation = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const history = useHistory();
  const { services } = useFetch("dress");
  const location = useLocation();
  const [isloading, setLoading] = useState(false);

  const emptyState = {
    dress_id: "",
    price: "",
    purchase_type: "",
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

  const [postObject, setPostObject] = useState({ ...initalState });

  //Handle sumbit Button validation
  const buttonValidation = () => {
    if (postObject.price && postObject.purchase_type && postObject.dress_id)
      return true;
    else {
      return false;
    }
  };

  //HANDEL SUBMIT
  const handelSubmit = async (postObject) => {
    try {
      if (initalState === emptyState) {
        await service.post("/web/dressVariation", postObject);
      } else {
        await service.put(`/web/dressVariation/${postObject.id}`, postObject);
      }

      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <>
      {isSuccess || error ? (
        <CustomSubmittion
          samePage="dresses/AddDressVaraiation"
          tablePage="dresses/dressVariation"
          type={isSuccess ? "success" : "error"}
        />
      ) : (
        <>
          <h2 style={{ marginBottom: 20 }}>
            {initalState === emptyState
              ? "Adding New Dress Variation"
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
            initialValues={{
              residence: ["zhejiang", "hangzhou", "xihu"],
              prefix: "86",
            }}
            scrollToFirstError
          >
            <Form.Item
              name="dress_id"
              required
              label={<span>Dress Name&nbsp;</span>}
            >
              <Select
                defaultValue={postObject.dress_id}
                showSearch
                placeholder="Select a Dress"
                optionFilterProp="children"
                onChange={(e) => setPostObject({ ...postObject, dress_id: e })}
                value={postObject.dress_id}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {services?.map((element) => (
                  <Option value={element.id}>{element?.name_en}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="Price"
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
                placeholder="Please enter your Price"
                value={postObject.price}
                defaultValue={postObject.price}
                addonAfter="EGP"
                name="price"
                onChange={(e) =>
                  setPostObject({ ...postObject, price: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item
              name="purchase_type"
              label={<span>Purchase Type&nbsp;</span>}
              rules={[
                {
                  required: true,
                  message: "Please input your  Purchase Type!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                placeholder="Please enter your Purchase Type"
                value={postObject.purchase_type}
                defaultValue={postObject.purchase_type}
                name="purchase_type"
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    purchase_type: e.target.value,
                  })
                }
              />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button
                type="default"
                style={{ marginRight: 20 }}
                onClick={() => history.push("dresses/dressStore")}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!buttonValidation()}
                loading={isloading}
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
export default AddDressVaraiation;
