import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetch } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Billing from "views/app-views/pages/setting/Billing";
import GeneralField from "./GeneralField";
import StoreInformation from "./StoreInformation";
import AccountManager from "./AccountManager";
const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const ADD = "ADD";

const ProductForm = (props) => {
  const { mode = ADD, param } = props;
  const [variationList, setVariationList] = useState([]);
  const [form] = Form.useForm();
  const [uploadedImg, setImage] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  console.log(variationList);
  const inialState = {
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    country_code: null,
    phone: "",
    service_id: null,
    displayImage: "",
    store_name_ar: "",
    store_name_en: "",
    store_address_ar: "",
    store_address_en: "",
    store_lat: "",
    store_long: "",
    open_at: "",
    close_at: "",
    store_phone: "",
    store_lat: 30.04720230873402,
    store_long: 31.240386415272962,
    country_id: null,
    city_id: null,
    facebook_link: "",
    instagram_link: "",
    payment_method: [],
    status: true,
    is_forget_password: true,
    seller_type:""
  };
  const disableObject = {
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    country_code: null,
    phone: "",
    service_id: null,
    store_name_ar: "",
    store_name_en: "",
    store_address_ar: "",
    store_address_en: "",
    store_lat: "",
    store_long: "",
    open_at: "",
    close_at: "",
    store_phone: "",
    store_lat: 30.04720230873402,
    store_long: 31.240386415272962,
    // country_id: null,
    // city_id: null,
    payment_method: [],
    status: true,
    is_forget_password: true,
  };
  const history = useHistory();
  const [postObject, setPostObject] = useState(inialState);
  const { services, isSuccess } = useFetch("countries");
  const sellerResponse = useFetch("sellers");
  const refetch = sellerResponse.refetch;
  const cities = useFetch("cities");
  const cityList = cities.services;
  const payment_method = useFetch("paymentMethods");
  const paymentMethodList = payment_method.services;
  const [loading, setLoading] = useState(false);
  const [formValidation, setFormValidation] = useState({});
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
    for (const key in disableObject) {
      if (!postObject[key] || postObject.payment_method.length == 0) {
        count++;
      }
    }
    if (count == 0) {
      return true;
    } else {
      return false;
    }
  };
  const handleUploadChange = (info) => {
    if (info.file.status === "uploading") {
      setUploadLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImage(imageUrl);
        setUploadLoading(true);
      });
    }
  };
useEffect(()=>{
console.log("post paymentMethodListpaymentMethodList",paymentMethodList)
},[postObject])
  const onFinish = async (postObject) => {
    console.log("is vip",postObject)
    setLoading(true);
    // const finalPost = { ...postObject, phone: `+20 ${postObject.phone}` };
    try {
      await service.post("/web/sellers", postObject);
      setLoading(false);
      setPostObject(inialState);
      refetch();
      openNotificationWithIcon("success");
      history.push("seller");
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
        onFinish={() => {
          const finalPaymentMethodArray = postObject.payment_method.map(
            (element) => element.id
          );
          const data = {
            ...postObject,
            payment_method: finalPaymentMethodArray,
            phone: `+2${postObject.phone}`,
          };
          onFinish(data);
        }}
        onSubmitCapture={(e) => {
          e.preventDefault();
        }}
        className="ant-advanced-search-form"
        initialValues={{ ...inialState, prefix: "+2" }}
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
                {mode === "ADD" ? "Add New Seller" : `Edit Product`}
              </h2>
              <div className="mb-3">
                <Button className="mr-2" onClick={() => history.push("seller")}>
                  Discard
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!buttonValidation()}
                  loading={loading}
                  onClick={() =>
                    setPostObject({
                      ...postObject,
                      account_mangers: variationList,
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
                formValidation={formValidation}
                setFormValidation={setFormValidation}
                uploadedImg={uploadedImg}
                uploadLoading={uploadLoading}
                handleUploadChange={handleUploadChange}
                setPostObject={setPostObject}
                postObject={postObject}
                countries={services}
                cityList={cityList}
                paymentMethodList={paymentMethodList}
              />
            </TabPane>
            <TabPane tab="Store" key="2">
              <StoreInformation
                postObject={postObject}
                setPostObject={setPostObject}
                paymentMethodList={paymentMethodList}
                countries={services}
                cityList={cityList}
              />
            </TabPane>
            <TabPane tab="Account Manager" key="4">
              <AccountManager
                variationList={variationList}
                setVariationList={setVariationList}
              />
            </TabPane>
            <TabPane tab="Payment Method" key="3">
              <Billing
                postObject={postObject}
                setPostObject={setPostObject}
                paymentMethodList={paymentMethodList}
                countries={services}
                cityList={cityList}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
