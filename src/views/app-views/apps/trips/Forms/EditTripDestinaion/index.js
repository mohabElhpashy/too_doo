import React, { useState, useEffect } from "react";
import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetchSingle } from "hooks";
import { useHistory, useLocation } from "react-router-dom";
import GeneralField from "./GeneralField";
import Loading from "components/shared-components/Loading";

const { TabPane } = Tabs;

const ProductForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const recordId = new URLSearchParams(location.search).get("id");
  const actionType = new URLSearchParams(location.search).get("name");
  const { services, isSuccess, refetch } = useFetchSingle(
    `tripDestination/${recordId}`
  );
  const history = useHistory();
  const inialState = {
    name_ar: "",
    name_en: "",
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

  const onFinish = async (postObject) => {
    setLoading(true);
    try {
      await service.put(`/web/tripDestination/${recordId}`, postObject);
      refetch();
      setLoading(false);
      openNotificationWithIcon("success");
      history.push("destination");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      {!isSuccess ? (
        <Loading cover="content" align={"center"} loading={true} />
      ) : (
        <Form
          layout="vertical"
          form={form}
          name="advanced_search"
          onFinish={() => onFinish(postObject)}
          onSubmitCapture={(e) => {
            e.preventDefault();
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
                <h2 className="mb-3">
                  {" "}
                  {actionType === "view"
                    ? "Read Trip Destination"
                    : "Save Trip Destination"}
                </h2>
                <div className="mb-3">
                  <Button
                    className="mr-2"
                    onClick={() => history.push("destination")}
                  >
                    Go Back
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!buttonValidation()}
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
                  checkViewMode={actionType === "view"}
                />
              </TabPane>
            </Tabs>
          </div>
        </Form>
      )}
    </>
  );
};

export default ProductForm;
