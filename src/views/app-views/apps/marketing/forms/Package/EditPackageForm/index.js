import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import Loading from "components/shared-components/Loading";
import { useFetch } from "hooks";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useLocation } from "react-router-dom";
import GeneralField from "./GeneralField";

const { TabPane } = Tabs;

const ADD = "ADD";

const ProductForm = (props) => {
  const [requestedData, setRequestedData] = useState({
    service: [],
    store: [],
    product: [],
  });
  const { mode = ADD } = props;
  const { services } = useFetch("categories");

  const emptyState = {
    name_ar: "",
    name_en: "",
    available_from: "",
    available_to: "",
    reservation_available_from: "",
    reservation_available_to: "",
    products: [],
    total_amount: 0,
    capacity: null,
    payment_method_id: null,
  };

  let initalState = emptyState;

  const inialOperations = {
    service_id: null,
    store_id: null,
    product_id: null,
    product_name: null,
  };
  const location = useLocation();
  const recordId = new URLSearchParams(location.search).get("id");
  const actionType = new URLSearchParams(location.search).get("name");

  const [postObject, setPostObject] = useState(initalState);
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);

  const { data, refetch, isSuccess } = useQuery("packagessss  ", async () => {
    const res = await service.get(`/web/packages/${recordId}`);

    return res;
  });
  const paymentMethod = useFetch("paymentMethods");
  const paymentMethodList = paymentMethod.services;
  const [currentPackage, setPackage] = useState([]);
  const history = useHistory();
  const [operations, setOperation] = useState(inialOperations);
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      setPostObject(data);

      setPackage(data?.products);
    }
  }, [isSuccess]);
  const buttonValidation = () => {
    if (currentPackage?.length === 0) {
      return false;
    } else {
      return true;
    }
  };
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done Successfully!",
    });
  };
  const onFinish = async () => {
    setSubmitLoading(true);

    try {
      await service.put(`/web/packages/${recordId}`, postObject);
      openNotificationWithIcon("success");
      setSubmitLoading(false);
      refetch();
      history.push("packagess");
    } catch (error) {
      setSubmitLoading(false);
    }
  };
  useEffect(() => {
    setOperation(inialOperations);
  }, [postObject?.payment_method_id]);
  return (
    <>
      {!isSuccess ? (
        <Loading cover="content" align={"center"} loading={true} />
      ) : (
        <Form
          layout="vertical"
          form={form}
          onFinish={() => {
            onFinish();
          }}
          onSubmitCapture={(e) => {
            e.preventDefault();
          }}
          name="advanced_search"
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
                  {mode === "ADD" ? "Add New Record" : `Edit Record`}{" "}
                </h2>
                <div className="mb-3">
                  <Button
                    className="mr-2"
                    onClick={() => history.push("packagess")}
                  >
                    Discard
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitLoading}
                    disabled={!buttonValidation() || actionType === "view"}
                    onClick={() =>
                      setPostObject({
                        ...postObject,
                        products: [...currentPackage],
                        number_of_items: currentPackage.length,
                      })
                    }
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
                  setPackage={setPackage}
                  currentPackage={currentPackage}
                  category={services}
                  setPostObject={setPostObject}
                  postObject={postObject}
                  setRequestedData={setRequestedData}
                  requestedData={requestedData}
                  operations={operations}
                  setOperation={setOperation}
                  inialOperations={inialOperations}
                  paymentMethodList={paymentMethodList}
                  viewMode={actionType === "view"}
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
