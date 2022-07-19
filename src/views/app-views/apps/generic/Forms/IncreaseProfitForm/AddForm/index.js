import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFetch } from "hooks";
import GeneralField from "./GeneralField";
import Loading from "components/shared-components/Loading";

const { TabPane } = Tabs;

const ProductForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { services, isSuccess } = useFetch("services");
  const history = useHistory();
  const inialState = {
    service_id: null,
    number: "",
    subject_ar: "",
    subject_en: "",
    body_en: "",
    body_ar: "",
  };
  const [postObject, setPostObject] = useState(inialState);
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
    for (const key in postObject) {
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
      await service.post(`/web/service_tips`, postObject);
      setLoading(false);
      openNotificationWithIcon("success");
      history.push("increaseProfit");
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
            onFinish(postObject);
          }}
          onSubmitCapture={(e) => {
            e.preventDefault();
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
                <h2 className="mb-3">Add Record</h2>
                <div className="mb-3">
                  <Button
                    className="mr-2"
                    onClick={() => history.push("increaseProfit")}
                  >
                    Go Back
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!buttonValidation()}
                    loading={loading}
                  >
                    Add
                  </Button>
                </div>
              </Flex>
            </div>
          </PageHeaderAlt>
          <div className="container">
            <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
              <TabPane tab="General" key="1">
                <GeneralField
                  services={services}
                  setPostObject={setPostObject}
                  postObject={postObject}
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
