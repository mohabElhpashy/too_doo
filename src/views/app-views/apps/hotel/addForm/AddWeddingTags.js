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

const AddWeddingTags = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [error, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const { services } = useFetch("weddingHall");
  const tagRes = useFetch("tags");
  const tagList = tagRes.services;
  const location = useLocation();
  const emptyState = {
    wedding_hall_id: null,
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
    if (postObject.wedding_hall_id && postObject.tag_id) return true;
    else {
      return false;
    }
  };

  //HANDEL SUBMIT
  const handelSubmit = async (postObject) => {
    try {
      await service.post("/web/weddingHallTag", postObject);
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
          samePage="hotel/AddWeddingTags"
          tablePage="hotel/weddingTags"
        />
      ) : (
        <>
          <h2 style={{ marginBottom: 20 }}>
            {initalState === emptyState
              ? "Adding New Wedding HAll Tag"
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
              name="wedding_hall_id"
              required
              label={<span>Wedding Hall&nbsp;</span>}
            >
              <Select
                showSearch
                placeholder="Select a Wedding Hall"
                defaultValue={postObject.wedding_hall_id}
                optionFilterProp="children"
                onChange={(e) =>
                  setPostObject({ ...postObject, wedding_hall_id: e })
                }
                value={postObject.wedding_hall_id}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {services?.map((element) => (
                  <Option key={element.id} value={element.id}>
                    {element.name_en}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="tag_id" required label={<span>Tags&nbsp;</span>}>
              <Select
                showSearch
                placeholder="Select a Tag"
                defaultValue={postObject.tag_id}
                optionFilterProp="children"
                onChange={(e) => setPostObject({ ...postObject, tag_id: e })}
                value={postObject.tag_id}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {tagList?.map((element) => (
                  <Option key={element.id} value={element.id}>
                    {element.name_en}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button
                type="default"
                style={{ marginRight: 20 }}
                onClick={() => history.push("/app/apps/hotel/weddingTags")}
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
export default AddWeddingTags;
