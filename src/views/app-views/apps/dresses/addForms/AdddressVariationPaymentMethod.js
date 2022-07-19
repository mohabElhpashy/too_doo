import { Button, Form, Input, Select } from "antd";
import service from "auth/FetchInterceptor";
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

const AdddressVariationPaymentMethod = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [error, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isloading, setLoading] = useState(false);
  const location = useLocation();
  const emptyState = {
    dress_variation_id: null,
    payment_method_seller_id: null,
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

  //Handle sumbit Button validation
  const buttonValidation = () => {
    if (postObject.dress_variation_id && postObject.payment_method_seller_id)
      return true;
    else {
      return false;
    }
  };

  //HANDEL SUBMIT
  const handelSubmit = async (postObject) => {
    try {
      if (initalState === emptyState) {
        await service.post("/web/dressVariationPaymentMethod", postObject);
      } else {
        await service.put(
          `/web/dressVariationPaymentMethod/${postObject.id}`,
          postObject
        );
      }
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <>
      {isSuccess || error ? (
        <CustomSubmittion
          samePage="dresses/AdddressVariationPaymentMethod"
          tablePage="dressVariationPayment"
          type={isSuccess ? "success" : "error"}
        />
      ) : (
        <>
          <h2 style={{ marginBottom: 20 }}>
            {initalState === emptyState
              ? "Adding New Dress Variation Payment"
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
            initialValues={{
              residence: ["zhejiang", "hangzhou", "xihu"],
              prefix: "86",
            }}
            scrollToFirstError
          >
            <Form.Item
              name="dress_variation_id"
              label={<span>Dress Variation&nbsp;</span>}
              rules={[
                {
                  required: true,
                  message: "Please input your Dress Variation ID!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                placeholder="Please enter your Dress Variation!"
                value={postObject.dress_variation_id}
                defaultValue={postObject.dress_variation_id}
                name="dress_variation_id"
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    dress_variation_id: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item
              name="dress_id"
              label={<span>Payment Method&nbsp;</span>}
              rules={[
                {
                  required: true,
                  message: "Please input your Payment Method!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                placeholder="Please enter your Payment Method"
                value={postObject.payment_method_seller_id}
                defaultValue={postObject.payment_method_seller_id}
                name="payment_method_seller_id"
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    payment_method_seller_id: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
                type="default"
                style={{ marginRight: 20 }}
                onClick={() => history.push("dressVariationPayment")}
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
export default AdddressVariationPaymentMethod;
