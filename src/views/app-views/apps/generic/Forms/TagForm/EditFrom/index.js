import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetch, useFetchSingle } from "hooks";
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import GeneralField from "./GeneralField";
import Loading from "components/shared-components/Loading";
import { useSelector } from "react-redux";
const { TabPane } = Tabs;

const ADD = "ADD";

const ProductForm = (props) => {
  const { mode = ADD, param } = props;
  const { direction } = useSelector((state) => state.theme);

  const [form] = Form.useForm();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const recordId = new URLSearchParams(location.search).get("id");
  const checkViewMode = new URLSearchParams(location.search).get("name");

  const [postObject, setPostObject] = useState({
    name: "",
    lang: direction === "ltr" ? "en" : "ar",
    service_id: null,
  });
  const { services, isFetching, isSuccess, refetch } = useFetchSingle(
    `tags/${recordId}`
  );
  const serviceRespose = useFetch("services");
  const serviceList = serviceRespose.services;
  //Handle Notification
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done Successfully!",
    });
  };
  useEffect(() => {
    form.resetFields();
    setPostObject(services);
  }, [isSuccess]);

  // Button Disabled
  const disabledObjcet = {
    name: "",
    service_id: null,
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
      await service.put(`/web/tags/${recordId}`, postObject);
      setLoading(false);
      refetch();
      openNotificationWithIcon("success");
      history.push("tags");
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
                <h2 className="mb-3">Edit Tags</h2>
                <div className="mb-3">
                  <Button className="mr-2" onClick={() => history.push("tags")}>
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
                  uploadLoading={uploadLoading}
                  setPostObject={setPostObject}
                  postObject={postObject}
                  checkViewMode={checkViewMode === "view"}
                  serviceList={serviceList}
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
