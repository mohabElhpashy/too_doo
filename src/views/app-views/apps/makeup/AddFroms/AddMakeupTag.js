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

const AddMakeupTag = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [error, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const { services } = useFetch("makeups");
  const location = useLocation();
  const emptyState = {
    makeup_id: null,
    tag_id: "",
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

  const [isloading, setLoading] = useState(false);
  const [postObject, setPostObject] = useState(initalState);
  const { Option } = Select;
  //Handle sumbit Button validation
  const buttonValidation = () => {
    if (postObject.makeup_id && postObject.tag_id) return true;
    else {
      return false;
    }
  };

  //HANDEL SUBMIT
  const handelSubmit = async (postObject) => {
    try {
      if (initalState === emptyState) {
        await service.post("/web/makeupTags", postObject);
      } else {
        await service.put(`/web/makeupTags/${postObject.id}`, postObject);
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
          samePage="makeup/AddMakeupTag"
          tablePage="makeup/makeupTags"
        />
      ) : (
        <>
          <h2 style={{ marginBottom: 20 }}>Adding New MakeUp Tag</h2>
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
              name="makeup_id"
              required
              label={<span>MakeUp&nbsp;</span>}
            >
              <Select
                showSearch
                placeholder="Select a MakeUp"
                defaultValue={postObject.makeup_id}
                optionFilterProp="children"
                onChange={(e) => setPostObject({ ...postObject, makeup_id: e })}
                value={postObject.makeup_id}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {services?.map((element) => (
                  <Option value={element.id}>{element.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="tag_id"
              label={<span> Tag&nbsp;</span>}
              rules={[
                {
                  required: true,
                  message: "Please input your tag_id!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                type="number"
                placeholder="Please enter your Tag"
                value={postObject.tag_id}
                defaultValue={postObject.tag_id}
                name="tag_id"
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    tag_id: e.target.value,
                  })
                }
              />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button
                type="default"
                style={{ marginRight: 20 }}
                onClick={() => history.push("makeup/makeupTags")}
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
export default AddMakeupTag;
