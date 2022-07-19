import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function CustomSubmittion({ type, samePage, tablePage }) {
  return (
    <Result
    key={samePage}
      status={type}
      title={type === "success" ? "Submission Succeeded" : "Submission Failed"}
      subTitle={
        type === "success"
          ? "Your data has been Added Successfully"
          : "Please check and modify the following information before resubmitting."
      }
      extra={[
        <Link to={`/app/apps/${tablePage}`}>
          <Button type="primary" key="console">
            Go Back
          </Button>
        </Link>,
        <Link to={`/app/apps/${samePage}`}>
          <Button key="buy">Do it Again!</Button>
        </Link>
      ]}
    ></Result>
  );
}

export default CustomSubmittion;
