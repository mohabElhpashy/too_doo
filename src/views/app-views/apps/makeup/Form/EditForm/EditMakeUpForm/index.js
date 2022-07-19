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
import AccountManager from "../../../../CRM/Forms/SellerForms/AddSellerForm/AccountManager";
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
  const [variationList, setVariationList] = useState([]);
  const [form] = Form.useForm();
  const [uploadedImg, setImage] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const disableObject = {
    store_name_ar: "",
    store_name_en: "",
    store_phone: "",
    store_address_ar: "",
    store_address_en: "",
    lat: null,
    long: null,
    open_at: null,
    close_at: null,
    seller_id: null,
  };
  const inialState = {
    name_ar: "",
    name_en: "",
    phone: "",
    country_id: null,
    city_id: null,
    address_ar: "",
    address_en: "",
    days_off: null,
    lat: null,
    long: null,
    open_at: null,
    close_at: null,
    seller_id: null,
  };
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const countryRespose = useFetch("countries");
  const sellerRes = useFetch("sellers");
  const cityRespose = useFetch("cities");
  const recordId = new URLSearchParams(location.search).get("id");
  const actionType = new URLSearchParams(location.search).get("name");
  const { services, isSuccess, refetch } = useFetchSingle(
    `makeups/${recordId}`
  );

  const sellerList = sellerRes.services;
  const countryList = countryRespose.services;
  const cityList = cityRespose.services;
  const citySuccess = cityRespose.isSuccess;
  const [postObject, setPostObject] = useState(inialState);
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
  useEffect(() => {
    if (isSuccess && citySuccess) {
      form.resetFields();
      setPostObject(services);
      setVariationList(services?.account_mangers);
    }
  }, [isSuccess]);

  const onFinish = async (postObject, recordId) => {
    setLoading(true);
    try {
      await service.put(`/web/makeups/${recordId}`, postObject);
      setLoading(false);
      openNotificationWithIcon("success");
      refetch();
      history.push("makeup");
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
          onFinish={() => {
            onFinish(postObject, recordId);
          }}
          onSubmitCapture={(e) => {
            e.preventDefault();
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
                <h2 className="mb-3">
                  {actionType === "view"
                    ? "Read MakeUp Store"
                    : "Edit MakeUp Store"}
                </h2>
                <div className="mb-3">
                  <Button
                    className="mr-2"
                    onClick={() => history.push("makeup")}
                  >
                    Go Back
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() =>
                      setPostObject({
                        ...postObject,
                        account_mangers: variationList,
                      })
                    }
                    disabled={
                      !buttonValidation() ||
                      actionType === "view" ||
                      postObject?.store_phone?.length !== 11
                    }
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
                  uploadedImg={uploadedImg}
                  uploadLoading={uploadLoading}
                  setPostObject={setPostObject}
                  postObject={postObject}
                  countryList={countryList}
                  cityList={cityList}
                  sellerList={sellerList}
                  checkViewMode={actionType === "view"}
                />
              </TabPane>
              <TabPane tab="Account Manager" key="2">
                <AccountManager
                  variationList={variationList}
                  setVariationList={setVariationList}
                  isDisabled={actionType === "view"}
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
