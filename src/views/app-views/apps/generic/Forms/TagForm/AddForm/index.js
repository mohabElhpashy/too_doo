import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import Loading from "components/shared-components/Loading";
import { useFetch } from "hooks";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import GeneralField from "./GeneralField";

const { TabPane } = Tabs;

const ADD = "ADD";

const ProductForm = (props) => {
  const { mode = ADD, param } = props;
  const { direction } = useSelector((state) => state.theme);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const inialState = {
    lang: direction === "ltr" ? "en" : "ar",
    name: "",
    service_id: null,
  };
  const { services, isSuccess, refetch } = useFetch("services");
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
      await service.post(`/web/tags`, postObject);
      setLoading(false);
      openNotificationWithIcon("success");
      refetch();
      history.push("tags");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      {!isSuccess ? (
        <Loading cover="content" loading={true} />
      ) : (
        <Form
          layout="vertical"
          form={form}
          name="advanced_search"
          onSubmitCapture={(e) => {
            e.preventDefault();
            onFinish(postObject);
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
                <h2 className="mb-3">Add Tags</h2>
                <div className="mb-3">
                  <Button className="mr-2" onClick={() => history.push("tags")}>
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
                  setPostObject={setPostObject}
                  postObject={postObject}
                  services={services}
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
