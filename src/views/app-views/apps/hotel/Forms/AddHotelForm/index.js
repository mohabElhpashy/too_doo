import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetch } from "hooks";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import GeneralField from "./GeneralField";

const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const ADD = "ADD";
const EDIT = "EDIT";

const ProductForm = (props) => {
  const { mode = ADD, param } = props;

  const [form] = Form.useForm();
  const [uploadedImg, setImage] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);

  const inialState = {
    name_ar: "",
    name_en: "",
    phone: "",
    country_id: null,
    city_id: null,
    address_en: "",
    address_ar: "",
    lat: 30.04720230873402,
    long: 31.240386415272962,
    open_at: null,
    close_at: null,
    seller_id: null,
  };
  const history = useHistory();
  const [postObject, setPostObject] = useState(inialState);
  const { services } = useFetch("sellers");
  const countryRespose = useFetch("countries");
  const countryList = countryRespose.services;
  const cityRespose = useFetch("cities");
  const cityList = cityRespose.services;
  const [loading, setLoading] = useState(false);
  //Handle Notification
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done",
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
      await service.post("/web/hotels", postObject);
      setLoading(false);
      openNotificationWithIcon("success");
      setPostObject(inialState);
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
        initialValues={{ ...inialState, prefix: "+02" }}
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
                {mode === "ADD" ? "Add New Hotel" : `Edit Product`}
              </h2>
              <div className="mb-3">
                <Button className="mr-2" onClick={() => history.push("Hotels")}>
                  Discard
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!buttonValidation()}
                  loading={loading}
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
                uploadedImg={uploadedImg}
                uploadLoading={uploadLoading}
                setPostObject={setPostObject}
                postObject={postObject}
                countryList={countryList}
                cityList={cityList}
                sellerList={services}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
