import React, { useState } from "react";
import { Form, Button, Input, Row, Col, message } from "antd";
import service from "auth/FetchInterceptor";

const ChangePassword = () => {
  const [changePassword, setChangePassword] = useState({
    newPassword: "",
    newPassword_confirmation: "",
    oldPassword: "",
  });
  const [loading, showLoading] = useState(false);
  const currentUserJSON = localStorage.getItem("user");
  const currentUser = JSON.parse(currentUserJSON);
  const USER_ID = currentUser.id;
  //   onFinish = () => {
  //     message.success({ content: "Password Changed!", duration: 2 });
  //     this.onReset();
  //   };
  //   const onReset = () => {
  //     this.changePasswordFormRef.current.resetFields();
  //   };
  const onChangeInput = (value, key) => {
    setChangePassword({ ...changePassword, [key]: value });
  };
  const postCredential = async () => {
    const key = "Updatable!";
    message.loading({ content: "Loading...", key });

    try {
      showLoading(true);
      await service.put(`/change-password/${USER_ID}`, changePassword);
      message.success({ content: "Done!", key, duration: 2 });
      window.location = "/";

      //   const token = res.data.record.access_token;
      //   setUser({ ...res.data.record, loggedIn: true });
      //   localStorage.setItem(AUTH_TOKEN, token);
      //   localStorage.setItem("user", JSON.stringify(res.data.record));
      //   window.location = "/";
    } catch (err) {
      message.error({ content: "Error Occured!", key, duration: 2 });
    } finally {
      showLoading(false);
    }
  };
  return (
    <>
      <h2 className="mb-4">Change Password</h2>
      <Row>
        <Col xs={24} sm={24} md={24} lg={8}>
          <Form
            name="changePasswordForm"
            layout="vertical"
            // ref={this.changePasswordFormRef}
            onFinish={postCredential}
          >
            <Form.Item
              label="Current Password"
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter your currrent password!",
                },
              ]}
            >
              <Input.Password
                onChange={(e) => onChangeInput(e.target.value, "oldPassword")}
                placeholder="Please enter the Current Password"
              />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter your new password!",
                },
              ]}
            >
              <Input.Password
                onChange={(e) => onChangeInput(e.target.value, "newPassword")}
                placeholder="Please enter the New Password"
              />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Password not matched!");
                  },
                }),
              ]}
            >
              <Input.Password
                onChange={(e) =>
                  onChangeInput(e.target.value, "newPassword_confirmation")
                }
                placeholder="Please enter the New Password"
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Change password
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ChangePassword;
