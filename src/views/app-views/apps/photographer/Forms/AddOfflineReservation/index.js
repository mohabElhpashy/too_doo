import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetch } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import GeneralField from "./GeneralField";

const { TabPane } = Tabs;

const ProductForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const offlinceClients = useFetch("offlineClients");
  const offlineClientsList = offlinceClients.services;
  const { services } = useFetch("services");
  const [requestedData, setRequestedData] = useState({
    service: [],
    store: [],
    product: [],
  });
  const actionType = new URLSearchParams(location.search).get("name");
  //Handle Notification
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done Successfully!",
    });
  };
  // Button Disabled
  const emptyObject = {
    offline_client_id: null,
    product_id: null,
    seller_id: null,
    service_id: 5,
    price: "",
  };

  useEffect(() => {
    (async () => {
      const data = await service.get("/web/stores/5");
      setRequestedData({ ...requestedData, store: data.data });
    })();
  }, []);
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

  const onFinish = async (postObject) => {
    setLoading(true);
    try {
      await service.post(`/web/offlineReservation/store`, postObject);
      setLoading(false);
      openNotificationWithIcon("success");
      history.push("offline");
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
                  onClick={() => history.push("offline")}
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
                offlineClients={offlineClientsList}
                services={services}
                requestedData={requestedData}
                setRequestedData={setRequestedData}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
