import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input } from "antd";
import axios from "axios";
import { API_BASE_URL } from "configs/AppConfig";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  hideAuthMessage,
  showAuthMessage,
  showLoading,
} from "redux/actions/Auth";
import { AUTH_TOKEN } from "redux/constants/Auth";

export const LoginForm = (props) => {
  const [error, setError] = useState(null);
  const initialCredential = {
    email: "admin@dev.com",
    password: "123456789",
  };
  const [auth, setAuth] = useState(initialCredential);
  // const [storeUser,setStoreUser]=useLocalStorage('user' , {});

  const {
    showForgetPassword,
    onForgetPasswordClick,
    showLoading,
    loading,
    showMessage,
  } = props;

  const postCredential = async (email, password) => {
    try {
      showLoading(true);
      const res = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });

      const token = res.data.record.access_token;
      localStorage.setItem(AUTH_TOKEN, token);
      localStorage.setItem("user", JSON.stringify(res.data.record));
      window.location = "/";
    } catch (err) {
      setError("Invalid Input");
    } finally {
      showLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: showMessage ? 1 : 0,
          marginBottom: showMessage ? 20 : 0,
        }}
      ></motion.div>
      <Form
        layout="vertical"
        name="login-form"
        // initialValues={initialCredential}
        onFinish={() => postCredential(auth.email, auth.password)}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input your email",
            },
            {
              type: "email",
              message: "Please enter a validate email!",
            },
          ]}
        >
          <Input
            value={auth.email}
            placeholder="Please enter your Email"
            onChange={(e) => setAuth({ ...auth, email: e.target.value })}
            prefix={
              <MailOutlined
                className="text-primary"
                style={{ paddingRight: 5 }}
              />
            }
          />
        </Form.Item>
        <Form.Item
          name="password"
          label={
            <div
              className={`${
                showForgetPassword
                  ? "d-flex justify-content-between w-100 align-items-center"
                  : ""
              }`}
            >
              <span>Password</span>
              {showForgetPassword && (
                <span
                  onClick={() => onForgetPasswordClick}
                  className="cursor-pointer font-size-sm font-weight-normal text-muted"
                >
                  Forget Password?
                </span>
              )}
            </div>
          }
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
          ]}
        >
          <Input.Password
            value={auth.password}
            placeholder="Please enter your Password"
            onChange={(e) => setAuth({ ...auth, password: e.target.value })}
            prefix={
              <LockOutlined
                className="text-primary"
                style={{ paddingRight: 5 }}
              />
            }
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Sign In
          </Button>
          <div style={{ marginTop: 20 }}>
            {error && (
              <Alert
                type="error"
                closable
                showIcon
                message={error}
                description="Wrong credentials"
              />
            )}
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

LoginForm.propTypes = {
  otherSignIn: PropTypes.bool,
  showForgetPassword: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

LoginForm.defaultProps = {
  otherSignIn: true,
  showForgetPassword: false,
};

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, redirect, userid } = auth;
  return { loading, message, showMessage, token, redirect, userid };
};

const mapDispatchToProps = {
  showAuthMessage,
  showLoading,
  hideAuthMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
