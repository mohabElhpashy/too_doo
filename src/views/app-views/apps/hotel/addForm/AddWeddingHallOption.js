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

const AddWeddingHallOption = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [error, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const { services } = useFetch("weddingHall");
  const weddingRes = useFetch("weddingHallGenericOption");
  const location = useLocation();
  const genericOptionList = weddingRes.services;
  const [isloading, setLoading] = useState(false);
  const emptyState = {
    wedding_hall_id: "",
    wedding_hall_generic_option_id: "",
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
    if (
      postObject.wedding_hall_id &&
      postObject.wedding_hall_generic_option_id &&
      postObject.price
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
        await service.post("/web/weddingHallOption", postObject);
      } else {
        await service.put(
          `/web/weddingHallOption/${postObject.id}`,
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
          samePage="hotel/AddWeddingHallOption"
          tablePage="hotel/weddingHallOptions"
        />
      ) : (
        <>
          <h2 style={{ marginBottom: 20 }}>
            {initalState === emptyState
              ? "Adding New Wedding HAll Option"
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
            <Form.Item name={"wedding_hall_id"} label="Wedding Hall Name">
              <Select
                showSearch
                placeholder="Select a Wedding hall"
                optionFilterProp="children"
                onChange={(e) =>
                  setPostObject({ ...postObject, wedding_hall_id: e })
                }
                value={postObject?.wedding_hall_id}
                defaultValue={postObject?.wedding_hall_id}
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
              name="wedding_hall_generic_option_id"
              required
              label={<span>Wedding Hall Generic Option&nbsp;</span>}
            >
              <Select
                showSearch
                placeholder="Select a Wedding Hall Genric Option"
                optionFilterProp="children"
                defaultValue={postObject.wedding_hall_generic_option_id}
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    wedding_hall_generic_option_id: e,
                  })
                }
                value={postObject.wedding_hall_generic_option_id}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {genericOptionList?.map((element) => (
                  <Option key={element.id} value={element.id}>
                    {element.title_ar}
                  </Option>
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
                defaultValue={postObject.price}
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
                  history.push("/app/apps/hotel/weddingHallOptions")
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
export default AddWeddingHallOption;
