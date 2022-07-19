import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetchSingle } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import GeneralField from "./GeneralField";

const { TabPane } = Tabs;

const ADD = "ADD";

const ProductForm = (props) => {
  const { mode = ADD, param } = props;

  const [form] = Form.useForm();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const recordId = new URLSearchParams(location.search).get("id");
  const actionType = new URLSearchParams(location.search).get("name");

  const { services, isSuccess } = useFetchSingle(
    `carGenericOption/${recordId}`
  );
  const history = useHistory();

  //Handle Notification
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done Successfully!",
    });
  };

  // Button Disabled

  const emptyObject = { name_ar: "", name_en: "" };

  const [postObject, setPostObject] = useState(emptyObject);
  const buttonValidation = () => {
    let count = 0;
    for (const key in emptyObject) {
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

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      setPostObject(services);
    }
  }, [isSuccess]);

  const onFinish = async (postObject) => {
    setLoading(true);
    try {
      await service.put(`/web/carGenericOption/${recordId}`, postObject);
      setLoading(false);
      openNotificationWithIcon("success");
      history.push("GenericOptions");
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
          onFinish(postObject);
        }}
        className="ant-advanced-search-form"
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <h2 className="mb-3">Add Record</h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() => history.push("GenericOptions")}
                >
                  Go Back
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!buttonValidation() || actionType === "view"}
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
                checkView={actionType === "view"}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
