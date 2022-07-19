import React, { useState, useEffect } from "react";
import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetch, useFetchSingle } from "hooks";
import { useHistory, useLocation } from "react-router-dom";
import GeneralField from "./GeneralField";
import Loading from "components/shared-components/Loading";

const { TabPane } = Tabs;

const ADD = "ADD";
const ProductForm = (props) => {
  const { mode = ADD } = props;
  const location = useLocation();

  const recordId = new URLSearchParams(location.search).get("id");
  const actionType = new URLSearchParams(location.search).get("name");
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const { services, isSuccess, refetch } = useFetchSingle(`offers/${recordId}`);
  const servicesResponse = useFetch("services");
  const listOfServices = servicesResponse.services;
  const [currentPrice, setCurrentPrice] = useState("0");

  const [listofStores, setStoreList] = useState([]);
  const [buttonCheker, setButtonChecker] = useState(true);
  const [currentSellers, setCurrentSellers] = useState([]);
  const [productList, setProductList] = useState([]);
  const history = useHistory();
  const DISABLEOBJECT = {
    product_id: null,
    service_id: null,
    offer_from: "",
    store_id: null,
    offer_to: "",
    capacity: null,
    discount: null,
  };
  const [postObject, setPostObject] = useState({
    product_id: null,
    store_id: null,
    service_id: null,
    price: null,
    offer_from: "",
    offer_to: "",
    capacity: null,
    discount: 0,
  });
  console.log(postObject, "Post Object ");
  useEffect(async () => {
    if (postObject?.service_id) {
      try {
        const data = await service.get(`web/stores/${postObject.service_id}`);
        setStoreList(data.data);
        refetch();
      } catch (error) {
        <h2>{error}</h2>;
      }
    }
  }, [postObject?.service_id]);
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      setPostObject(services);
      setCurrentPrice(services?.default_price);
    }
  }, [isSuccess]);

  const buttonValidation = () => {
    let count = 0;
    for (const key in DISABLEOBJECT) {
      if (
        !postObject[key] ||
        postObject["tags"] === 0 ||
        postObject["subImages"] === 0
      ) {
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

  const onFinish = async (postObject) => {
    setSubmitLoading(true);

    try {
      await service.put(`/web/offers/${recordId}`, postObject);
      setSubmitLoading(false);
      refetch();
      openNotificationWithIcon("success");
      history.push("offers");
    } catch (error) {
      setSubmitLoading(false);
    }
  };
  return (
    <>
      {isSuccess && listofStores.length !== 0 ? (
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
                  {actionType === "view" ? "Read Offer" : "Edit Record"}
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
                    disabled={!buttonValidation() || actionType === "view"}
                    htmlType="submit"
                    loading={submitLoading}
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
                  listofStores={listofStores}
                  services={services}
                  postObject={postObject}
                  setPostObject={setPostObject}
                  currentSellers={currentSellers}
                  setButtonChecker={setButtonChecker}
                  listOfServices={listOfServices}
                  productList={productList}
                  setProductList={setProductList}
                  checkViewMode={actionType === "view"}
                  isSuccess={isSuccess}
                  currentPrice={currentPrice}
                  setCurrentPrice={setCurrentPrice}
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
