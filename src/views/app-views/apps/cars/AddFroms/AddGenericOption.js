import { Button, Form, Input, Select } from "antd";
import service from "auth/FetchInterceptor";
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

const AddGenericOption = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [error, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isloading, setLoading] = useState(false);
  const location = useLocation();
  const emptyState = { name_ar: "", name_en: "" };
  let initalState;
  if (location.state !== undefined) {
    if (location.state.viewMode !== undefined) {
      var { viewMode } = location.state;
      initalState = viewMode;
    } else {
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
    }
  } else {
    initalState = emptyState;
  }
  const [postObject, setPostObject] = useState(initalState);

  //Handle sumbit Button validation
  const buttonValidation = () => {
    if (postObject.name_ar && postObject.name_en) return true;
    else {
      return false;
    }
  };
  //HANDEL SUBMIT
  const handelSubmit = async (postObject) => {
    try {
      if (initalState === emptyState) {
        await service.post("/web/carGenericOption", postObject);
      } else {
        await service.put(`/web/carGenericOption/${postObject.id}`, postObject);
      }
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      {isSuccess || error ? (
        <CustomSubmittion
          samePage="cars/AddGenericOption"
          tablePage="cars/GenericOptions"
          type={isSuccess ? "success" : "error"}
        />
      ) : (
        <>
          <h2 style={{ marginBottom: 20 }}>
            {initalState === emptyState
              ? "Adding New Generic OPtion"
              : "Edi Record"}
          </h2>
          <Form
            {...formItemLayout}
            onSubmitCapture={(e) => {
              e.preventDefault();
              handelSubmit(postObject);
            }}
            name="register"
            // onFinish={onFinish}
            initialValues={{
              residence: ["egypt", "hangzhou", "xihu"],
              prefix: "+02",
            }}
            scrollToFirstError
          >
            <Form.Item
              name="name_ar"
              label={
                <span>
                  Title in Arabic&nbsp;
                  {/* <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip> */}
                </span>
              }
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your Title!",
              //     whitespace: true,
              //   },
              // ]}
            >
              <Input
                placeholder="Please enter your Title in Arabic"
                value={postObject?.name_ar}
                defaultValue={postObject?.name_ar}
                disabled={initalState === viewMode ? true : false}
                name="name_ar"
                onChange={(e) =>
                  setPostObject({ ...postObject, name_ar: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item
              name="name_en"
              label={
                <span>
                  Title in English&nbsp;
                  {/* <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip> */}
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your Title!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                placeholder="Please enter your Title in English"
                value={postObject?.name_en}
                defaultValue={postObject?.name_en}
                disabled={initalState === viewMode ? true : false}
                name="name_en"
                onChange={(e) =>
                  setPostObject({ ...postObject, name_en: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              {initalState === viewMode ? (
                <Button
                  className="w-50"
                  type={"primary"}
                  onClick={() => history.push("GenericOptions")}
                >
                  Go Back
                </Button>
              ) : (
                <>
                  <Button
                    type="default"
                    style={{ marginRight: 20 }}
                    onClick={() => history.push("GenericOptions")}
                  >
                    Cancel
                  </Button>
                  <Button
                    loading={isloading}
                    type="primary"
                    htmlType="submit"
                    onClick={() => setLoading(true)}
                    disabled={!buttonValidation()}
                  >
                    Submit
                  </Button>
                </>
              )}
            </Form.Item>
          </Form>
        </>
      )}
    </>
  );
};
export default AddGenericOption;
