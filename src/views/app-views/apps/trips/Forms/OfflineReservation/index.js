import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import Loading from "components/shared-components/Loading";
import { useFetch, useFetchSingle } from "hooks";
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import GeneralField from "./GeneralField";

const { TabPane } = Tabs;

const ProductForm = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [checkLoading, setcheckLoading] = useState(true);
  const history = useHistory();
  const location = useLocation();
  const recordId = new URLSearchParams(location.search).get("id");
  const actionType = new URLSearchParams(location.search).get("name");
  const { services, isLoading, isSuccess } = useFetchSingle(
    `offlineReservation/single/6/${recordId}`
  );
  //Handle Notification
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done Successfully!",
    });
  };
  // Button Disabled

  const disabledObjcet = {
    offline_client_id: "",
    product_id: "",
    seller_id: "",
    service_id: "",
  };
  const [requestedData, setRequestedData] = useState({
    service: [],
    store: [],
    product: [],
  });
  const [postObject, setPostObject] = useState({
    offline_client_id: "",
    product_name: "",
    product_id: "",
    seller_id: "",
    service_id: "",
  });
  const offlinceClients = useFetch("offlineClients");
  const offlineClientsList = offlinceClients.services;
  useEffect(() => {
    if (isSuccess) {
      (async () => {
        try {
          await service.get(`/web/products/6/${services?.seller_id}`);
          setPostObject(services);
          setcheckLoading(false);
          form.resetFields();
        } catch (error) {
          setcheckLoading(false);
        }
      })();
    }
  }, [isSuccess]);

  const buttonValidation = () => {
    let count = 0;
    if (services) {
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
    }
  };

  useEffect(() => {
    (async () => {
      const data = await service.get("/web/stores/6");
      setRequestedData({ ...requestedData, store: data.data });
    })();
  }, []);

  const onFinish = async (postObject, recordId) => {
    setLoading(true);
    try {
      await service.put(`/web/offlineReservation/${recordId}`, postObject);
      setLoading(false);
      openNotificationWithIcon("success");
      history.push("offline");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      {checkLoading ? (
        <Loading cover="content" align={"center"} />
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
                <h2 className="mb-3">
                  {actionType === "view" ? "View Record" : "Edit Record"}
                </h2>
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
                  setPostObject={setPostObject}
                  postObject={postObject}
                  checkViewMode={actionType === "view"}
                  setRequestedData={setRequestedData}
                  requestedData={requestedData}
                  offlineClients={offlineClientsList}
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
