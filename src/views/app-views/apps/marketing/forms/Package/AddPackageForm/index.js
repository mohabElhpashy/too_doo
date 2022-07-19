import { Button, Form, Tabs, notification } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetch } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
  const [postObject, setPostObject] = useState(initalState);
  const [form] = Form.useForm();
  const [uploadedImg, setImage] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const paymentMethod = useFetch("paymentMethods");
  const paymentMethodList = paymentMethod.services;
  const [currentPackage, setPackage] = useState([]);
  const history = useHistory();
  const [operations, setOperation] = useState(inialOperations);

  const buttonValidation = () => {
    let count = 0;
    if (currentPackage.length === 0) {
      return false;
    }
    for (const key in postObject) {
      if (postObject[key] === "" || postObject[key] == null) {
        count++;
      }
    }
    if (count == 0) {
      return true;
    } else {
      return false;
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
      await service.post("/web/packages", postObject);
      openNotificationWithIcon("success");
      setSubmitLoading(false);
      history.push("packages");
    } catch (error) {
      setSubmitLoading(false);
    }
  };
  useEffect(() => {
    setPackage([]);
    setOperation(inialOperations);
  }, [postObject.payment_method_id]);
  return (
    <>
      <Form
        layout="vertical"
        form={form}
        onSubmitCapture={(e) => {
          e.preventDefault();
          onFinish();
        }}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          heightUnit: "cm",
          widthUnit: "cm",
          weightUnit: "kg",
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
                  disabled={!buttonValidation()}
                  onClick={() =>
                    setPostObject({
                      ...postObject,
                      products: [...currentPackage],
                      number_of_items: currentPackage.length,
                    })
                  }
                >
                  {mode === "ADD" ? "Add" : `Save`}
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
                uploadedImg={uploadedImg}
                setRequestedData={setRequestedData}
                requestedData={requestedData}
                operations={operations}
                setOperation={setOperation}
                inialOperations={inialOperations}
                paymentMethodList={paymentMethodList}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
