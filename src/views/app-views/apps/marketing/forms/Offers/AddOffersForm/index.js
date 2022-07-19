import React, { useState, useEffect } from "react";
import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetch } from "hooks";
import { useHistory } from "react-router-dom";
import GeneralField from "./GeneralField";
import Loading from "components/shared-components/Loading";

const { TabPane } = Tabs;

const ADD = "ADD";
const ProductForm = (props) => {
  const { mode = ADD } = props;

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const { services, isSuccess } = useFetch("services");
  const [listofStores, setStoreList] = useState([]);
  const [buttonCheker, setButtonChecker] = useState(true);
  const [currentSellers] = useState([]);
  const [productList, setProductList] = useState([]);
  const history = useHistory();
  const DISABLEOBJECT = {
    product_id: null,
    store_id: null,
    service_id: null,
    offer_from: "",
    offer_to: "",
    capacity: null,
    discount: null,
  };
  const [postObject, setPostObject] = useState({
    product_id: null,
    store_id: null,
    service_id: null,
    offer_from: "",
    offer_to: "",
    capacity: null,
    discount: null,
  });
  useEffect(async () => {
    if (postObject.service_id) {
      try {
        const data = await service.get(`web/stores/${postObject.service_id}`);
        setStoreList(data.data);
      } catch (error) {
        <h2>{error}</h2>;
      }
    }
  }, [postObject.service_id]);
  const buttonValidation = () => {
    let count = 0;
    for (const key in DISABLEOBJECT) {
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
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done",
    });
  };
  // useEffect(() => {
  //   setPostObject({ ...postObject, seller_id: null });
  //   const filterArray = listOfAllSellers?.filter(
  //     (element, index) => element.service_id === postObject.service_id
  //   );
  //   setCurrentSellers(filterArray);
  // }, [postObject.service_id]);
  console.log(postObject, "tHIS IS THE OBJECT");
  const onFinish = async (postObject) => {
    setSubmitLoading(true);
    let finalObject;
    for (const key in postObject) {
      if (postObject["variation_id"] === null) {
        delete postObject["variation_id"];
      }
      finalObject = postObject;
    }
    console.log(finalObject, "Final Object");
    try {
      const data = new FormData();
      for (const key of Object.keys(postObject)) {
        data.append(key, postObject[key]);
      }
      await service.post("/web/offers", postObject);
      setSubmitLoading(false);
      openNotificationWithIcon("success");
      history.push("offers");
    } catch (error) {
      setSubmitLoading(false);
    }
  };
  return (
    <>
      {isSuccess ? (
        <Form
          layout="vertical"
          form={form}
          name="advanced_search"
          onFinish={() => {
            onFinish(postObject);
          }}
          onSubmitCapture={(e) => {
            e.preventDefault();
          }}
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
                  {mode === "ADD" ? "Add New Offer" : `Edit Offer`}{" "}
                </h2>
                <div className="mb-3">
                  <Button
                    className="mr-2"
                    onClick={() => history.push("offers")}
                  >
                    Discard
                  </Button>
                  <Button
                    type="primary"
                    disabled={!buttonValidation() || buttonCheker}
                    htmlType="submit"
                    loading={submitLoading}
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
                  listofStores={listofStores}
                  services={services}
                  postObject={postObject}
                  setPostObject={setPostObject}
                  currentSellers={currentSellers}
                  setButtonChecker={setButtonChecker}
                  productList={productList}
                  setProductList={setProductList}
                />
              </TabPane>
            </Tabs>
          </div>
        </Form>
      ) : (
        <Loading cover="content" align={"center"} loading={true} />
      )}
    </>
  );
};

export default ProductForm;
