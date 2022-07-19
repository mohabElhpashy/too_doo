import React, { useState, useEffect } from "react";
import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetch } from "hooks";
import { useHistory, useLocation } from "react-router-dom";
import GeneralField from "./GeneralField";
import MakeUpDetails from "./MakeUpDetails";
import SERVICE_ID from "constants/ServiceIdConstants";
import PaymentMethod from './PaymentMethod'

const { TabPane } = Tabs;
const DEFAULT_DETAILS = [{}];
const ADD = "ADD";
const ProductForm = (props) => {
  const { mode = ADD, param } = props;

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const { services } = useFetch("makeups");
  const history = useHistory();
  const tags = useFetch("tags");
  const genericDetailes = useFetch(
    `genericDetailsProducts/${SERVICE_ID.MAKEUP_ID}`
  );
  const orignalDetailesList = genericDetailes.services;
  const isSuccess = genericDetailes.isSuccess;
  const [genericDetailsList, setGenericDetials] = useState();
  const [PayMentmethod,setPayMentmethod]=useState([])

  const tagsList = tags.services;
  const location = useLocation();
  const storeIdProp = new URLSearchParams(location.search).get("store_id");
  const sellerIdProp = new URLSearchParams(location.search).get("seller_id");
  const DISABLEOBJECT = {
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    makeup_id: storeIdProp ? storeIdProp : null,
    main_image: null,
    images: [],
    price: "",
    tags: [],
    details: [],
  };
  const [postObject, setPostObject] = useState({
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    with_veil: false,
    makeup_id: storeIdProp ? storeIdProp : null,
    main_image: null,
    video_link:"",
    video_link_URL:"",
    true_view:"",
    thumbnail_image:"",


    images: [],
    price: "",
    tags: [],
    details: [],
  });
  const [detailsList, setDetailsList] = useState(DEFAULT_DETAILS);
  const Payment_Methods = () => {
    let PaymentMethods;
    const variationCheckerr = PayMentmethod.length
    console.log("variationCheckerr",variationCheckerr)
    if (variationCheckerr==0) {
      PaymentMethods = false;
    } else {
      PaymentMethods = true;
    }
   return PaymentMethods
    // for (const key in variationList) {
    //   if (!variationList[key]) {
    //     count++;
    //   }
    // }
  };
  useEffect(() => {
    setGenericDetials(orignalDetailesList);
  }, [isSuccess]);
  const buttonValidation = () => {
    let count = 0;
    for (const key in DISABLEOBJECT) {
      if (!postObject[key]) {
        count++;
      }
      if (
        !postObject[key] ||
        postObject["tags"].length === 0 ||
        postObject["images"].length === 0
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

  const detailsButtonValidation = () => {
    let detail;
    const detailsChecker = detailsList.find(
      (element) =>
        element.generic_detail_id === null ||
        element.generic_detail_type_id === null
    );
    if (detailsChecker) {
      detail = false;
    } else {
      detail = true;
    }
    return detail;
    // for (const key in variationList) {
    //   if (!variationList[key]) {
    //     count++;
    //   }
    // }
  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done",
    });
  };

  const onFinish = async (postObject) => {
    setSubmitLoading(true);

    try {
      // const data = new FormData();
      // for (const key of Object.keys(postObject)) {
      //   data.append(key, postObject[key]);
      // }
      await service.post("/web/makeupServices", postObject);
      setSubmitLoading(false);
      openNotificationWithIcon("success");
      history.push(
        sellerIdProp
          ? `/app/apps/CRM/veForm?name=view&id=${sellerIdProp}`
          : "makeupService"
      );
    } catch (error) {
      setSubmitLoading(false);
    }
  };
  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        onFinish={() => onFinish(postObject)}
        onSubmitCapture={(e) => {
          e.preventDefault();
        }}
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
                {mode === "ADD" ? "Add New Product" : `Edit Product`}{" "}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() => history.push("makeupService")}
                >
                  Discard
                </Button>
                <Button
                  type="primary"
                  disabled={!buttonValidation() || !detailsButtonValidation()||!Payment_Methods()}
                  htmlType="submit"
                  loading={submitLoading}
                  onClick={() =>
                    setPostObject({
                      ...postObject,
                      paymentMethods:PayMentmethod,
                      details: detailsList.map(
                        (element) => element.generic_detail_id
                      ),
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
                services={services}
                tagsList={tagsList}
                postObject={postObject}
                setPostObject={setPostObject}
                storeIdProp={storeIdProp}
              />
            </TabPane>
            <TabPane tab="Details" key="2">
              <MakeUpDetails
                postObject={postObject}
                setPostObject={setPostObject}
                orignalDetailesList={orignalDetailesList}
                detailsList={detailsList}
                setDetailsList={setDetailsList}
                genericDetailsList={genericDetailsList}
                setGenericDetials={setGenericDetials}
              />
            </TabPane>
           
            {postObject.makeup_id? <TabPane tab="Payment Method" key="3">
              <PaymentMethod
                postObject={postObject}
                setPostObject={setPostObject}
                orignalDetailesList={orignalDetailesList}
                PayMentmethod={PayMentmethod}
                setPayMentmethod={setPayMentmethod}
              />
            </TabPane>: null}
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
