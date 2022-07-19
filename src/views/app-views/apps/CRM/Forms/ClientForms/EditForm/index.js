import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetchSingle } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import GeneralField from "./GeneralField";

import Loading from "components/shared-components/Loading";
import AccountDetails from "./AccountDetails";

const { TabPane } = Tabs;

const ADD = "ADD";

const ProductForm = (props) => {
  const { mode = ADD, param } = props;

  const [form] = Form.useForm();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const recordId = new URLSearchParams(location.search).get("id");
  const actionType = new URLSearchParams(location.search).get("name");
  const { services, isSuccess, refetch } = useFetchSingle(
    `clients/${recordId}`
  );
  const [buttonChecker, setButtonChecker] = useState(true);
  const inialState = {
    first_name: "",
    last_name: "",
    email: "",
    marital_status: "",
    gender: "",
    phone: "",
    country_code: "",
    range_from: null,
    range_to: null,
  };
  const [postObject, setPostObject] = useState(inialState);

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      setPostObject(services);
    }
  }, [isSuccess]);
  //Handle Notification
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done Successfully!",
    });
  };
  // Button Disabled
  // const disabledObjcet = {
  //   first_name: "",
  //   last_name: "",
  //   email: "",
  //   marital_status: "",
  //   gender: "",
  //   phone: "",
  //   country_code: "",
  //   range_from: null,
  //   range_to: null,
  // };

  const buttonValidation = () => {
    let count = 0;
    for (const key in inialState) {
      if (!postObject[key]) {
        count++;
      }
    }
    if (count == 0) {
      return true;
    } else {
      return false;
    }
  };

  const onFinish = async (postObject, recordId) => {
    setLoading(true);
    try {
      await service.put(`/web/clients/${recordId}`, postObject);
      setLoading(false);
      openNotificationWithIcon("success");
      refetch();
      history.push("client");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      {isSuccess ? (
        <Form
          layout="vertical"
          form={form}
          name="advanced_search"
          onFinish={() => {
            onFinish(postObject, recordId);
          }}
          onSubmitCapture={(e) => {
            e.preventDefault();
          }}
          className="ant-advanced-search-form"
          initialValues={{
            prefix: "+20",
          }}
        >
          <PageHeaderAlt className="border-bottom" overlap>
            <div className="container">
              <Flex
                className="py-2"
                mobileFlex={false}
                justifyContent="between"
                alignItems="center"
              >
                <h2 className="mb-3">
                  {actionType === "view" ? "Read Client" : "Edit Client"}
                </h2>
                <div className="mb-3">
                  <Button
                    className="mr-2"
                    onClick={() => history.push("client")}
                  >
                    Go Back
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={
                      !buttonValidation() ||
                      actionType === "view" ||
                      !buttonChecker ||
                      postObject?.email?.length < 2
                    }
                    loading={loading}
                  >
                    Save
                  </Button>
                </div>
              </Flex>
            </div>
          </PageHeaderAlt>
          <div className="container">
            <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
              <TabPane tab="General" key="1">
                <GeneralField
                  setButtonChecker={setButtonChecker}
                  uploadLoading={uploadLoading}
                  setPostObject={setPostObject}
                  postObject={postObject}
                  checkViewMode={actionType === "view"}
                />
              </TabPane>
              <TabPane tab="Account Details" key="2">
                <AccountDetails
                  uploadLoading={uploadLoading}
                  postObject={postObject}
                  checkViewMode={actionType === "view"}
                />
              </TabPane>
            </Tabs>
          </div>
        </Form>
      ) : (
        <Loading cover="content" align={"center"} loading={true} />
      )}
    </>
  );
};

export default ProductForm;
