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

const AddPhotoSessionOptions = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const location = useLocation();
  const [error, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const { services } = useFetch("photoSessionGenericOption");
  const photoSession = useFetch("photosession");
  const photoSessionList = photoSession.services;
  const [isloading, setLoading] = useState(false);
  const emptyState = {
    photo_session_generic_option_id: null,
    photo_session_id: null,
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
      postObject.photo_session_generic_option_id &&
      postObject.photo_session_id
    )
      return true;
    else {
      return false;
    }
  };

  //HANDEL SUBMIT
  const handelSubmit = async (postObject) => {
    try {
      if (postObject === emptyState) {
        await service.post("/web/photoSessionOption", postObject);
      } else {
        await service.put(
          `/web/photoSessionOption/${postObject.id}`,
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
          samePage="photographer/AddPhotoSessionOptions"
          tablePage="photographer/photoSessionOptions"
        />
      ) : (
        <>
          <h2 style={{ marginBottom: 20 }}>
            {initalState === emptyState
              ? "Adding New PhotoSession Option"
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
              name="photo_session_id"
              required
              label={<span>PhotoSession&nbsp;</span>}
            >
              <Select
                showSearch
                placeholder="Select a PhotoSession "
                optionFilterProp="children"
                defaultValue={postObject.photo_session_id}
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    photo_session_id: e,
                  })
                }
                value={postObject.photo_session_id}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {photoSessionList?.map((element) => (
                  <Option value={element.id}>{element.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="photo_session_generic_option_id"
              required
              label={<span>PhotoSession Genertic Option&nbsp;</span>}
            >
              <Select
                showSearch
                placeholder="Select a PhotoSession Generic Option"
                optionFilterProp="children"
                defaultValue={postObject.photo_session_generic_option_id}
                onChange={(e) =>
                  setPostObject({
                    ...postObject,
                    photo_session_generic_option_id: e,
                  })
                }
                value={postObject.photo_session_generic_option_id}
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

            <Form.Item {...tailFormItemLayout}>
              <Button
                type="default"
                style={{ marginRight: 20 }}
                onClick={() => history.push("photoSessionOptions")}
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
export default AddPhotoSessionOptions;
