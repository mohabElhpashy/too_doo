import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetchSingle } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import GeneralField from "./GeneralField";

const { TabPane } = Tabs;

const ProductForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const [postObject, setPostObject] = useState({
    title: "",
    body: "",
  });

  const recordId = new URLSearchParams(location.search).get("id");
  const checkViewMode = new URLSearchParams(location.search).get("name");
  const { services, isFetching, isSuccess } = useFetchSingle(
    `privacyPolicy/${recordId}`
  );
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
  const disabledObjcet = {
    title: "",
    body: "",
  };
  const buttonValidation = () => {
    let count = 0;
    for (const key in disabledObjcet) {
      if (postObject !== undefined) {
        if (!postObject[key]) {
          count++;
        }
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
      await service.put(`/web/privacyPolicy/${recordId}`, postObject);
      setLoading(false);
      openNotificationWithIcon("success");
      history.push("privacy");
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
              <h2 className="mb-3">Edit Privacy</h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() => history.push("privacy")}
                >
                  Go Back
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!buttonValidation() || checkViewMode === "view"}
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
                setPostObject={setPostObject}
                postObject={postObject}
                checkViewMode={checkViewMode === "view"}
              />
            </TabPane>
            <TabPane tab="History" key="2">
              {/* <GeneralField
                setPostObject={setPostObject}
                postObject={postObject}
                checkViewMode={checkViewMode === "view"}
              /> */}
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
