import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import Loading from "components/shared-components/Loading";
import { useFetch } from "hooks";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import GeneralField from "./GeneralField";
import serviceId from "constants/ServiceIdConstants";
const { TabPane } = Tabs;

const ProductForm = () => {
  const { direction } = useSelector((state) => state.theme);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const listClinicsRes = useFetch("clinics");
  const listofClinics = listClinicsRes.services;
  const history = useHistory();
  const inialState = {
    time_from: null,
    time_to: null,
    day: "",
    clinic_id: null,
  };

  const { services, isSuccess } = useFetch("services");
  const [postObject, setPostObject] = useState(inialState);
  const location = useLocation();
  const sellerId = new URLSearchParams(location.search).get("name");

  const filteredClinics = listofClinics?.filter(
    (element) => element.seller_id == sellerId
  );

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
      await service.post(`/web/availability`, postObject);
      setLoading(false);
      openNotificationWithIcon("success");
      history.push(`/app/apps/CRM/veForm?name=edit&id=${sellerId}`);
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
                <h2 className="mb-3">Add Doctor Availability</h2>
                <div className="mb-3">
                  <Button
                    className="mr-2"
                    onClick={() =>
                      history.push(
                        `/app/apps/CRM/veForm?name=edit&id=${sellerId}`
                      )
                    }
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
                  setPostObject={setPostObject}
                  postObject={postObject}
                  services={services}
                  filteredClinics={filteredClinics}
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
