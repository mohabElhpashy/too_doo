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

const AddBeautyCenterTag = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [error, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const { services } = useFetch("beautyCenters");
  const [isloading, setLoading] = useState(false);
  const [postObject, setPostObject] = useState({
    beauty_center_id: null,
    tag_id: "",
  });
  const { Option } = Select;

  //Handle sumbit Button validation
  const buttonValidation = () => {
    if (postObject.beauty_center_id && postObject.tag_id) return true;
    else {
      return false;
    }
  };

  //HANDEL SUBMIT
  const handelSubmit = async (postObject) => {
    try {
      await service.post("/web/beautyCenterTags", postObject);
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
          samePage="beauty/AddBeautyCenterTag"
          tablePage="beauty/beautyCenterTag"
        />
      ) : (
        <>
          <h2 style={{ marginBottom: 20 }}>Adding New Beauty Center Tag</h2>
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
              name="beauty_center_id"
              required
              label={<span>Beauty Center&nbsp;</span>}
            >
              <Select
                showSearch
                placeholder="Select a MakeUp"
                optionFilterProp="children"
                onChange={(e) =>
                  setPostObject({ ...postObject, beauty_center_id: e })
                }
                value={postObject.beauty_center_id}
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
                onClick={() => history.push("beautyCenterTag")}
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
export default AddBeautyCenterTag;
