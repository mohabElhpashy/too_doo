import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import GeneralField from "./GeneralField";

const { TabPane } = Tabs;

const ADD = "ADD";

const ProductForm = (props) => {
  const { mode = ADD, param } = props;

  const [form] = Form.useForm();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const recordId = location.state.record.id;
  const checkViewMode = location.state?.record?.view;
  const [postObject, setPostObject] = useState(location.state.record);

  //Handle Notification
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done Successfully!",
    });
  };
  // Button Disabled
  const disabledObjcet = {
    first_name: "",
    last_name: "",
    email: "",
    marital_status: "",
    gender: "",
    phone: "",
    country_code: "",
  };
  const buttonValidation = () => {
    let count = 0;
    for (const key in disabledObjcet) {
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
      history.push("client");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        onSubmitCapture={(e) => {
          e.preventDefault();
          onFinish(postObject, recordId);
        }}
        className="ant-advanced-search-form"
        initialValues={{
          ...postObject,
          prefix: "+02",
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
              <h2 className="mb-3">View Complain</h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() => history.push("complain")}
                >
                  Go Back
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!buttonValidation() || checkViewMode}
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
                uploadLoading={uploadLoading}
                setPostObject={setPostObject}
                postObject={postObject}
                checkViewMode={checkViewMode}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
      )
    </>
  );
};

export default ProductForm;
