import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetch } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import GeneralField from "./GeneralField";
import BeautyCenterDetails from "./BeautyCenterDetails";
import PaymentMethod from './PaymentMethod'
const { TabPane } = Tabs;
const DEFAULT_DETAILS = [
  {
    id: 1,
    generic_detail_type_id: null,
    generic_detail_id: null,
  },
];
const ADD = "ADD";
const EDIT = "EDIT";
const BEAUTY_CENTER = 4;
const ProductForm = (props) => {
  const { mode = ADD, param } = props;
  const location = useLocation();
  const storeIdProp = new URLSearchParams(location.search).get("store_id");
  const sellerIdProp = new URLSearchParams(location.search).get("seller_id");

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [PayMentmethod,setPayMentmethod]=useState([])

  const { services } = useFetch("beautyCenters");
  const history = useHistory();
  const tags = useFetch("tags");
  const genericDetailes = useFetch(`genericDetailsProducts/${BEAUTY_CENTER}`);
  const orignalDetailesList = genericDetailes.services;
  const isSuccess = genericDetailes.isSuccess;

  const tagsList = tags.services;

  const [postObject, setPostObject] = useState({
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    beauty_center_id: storeIdProp ? storeIdProp : null,
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
  const buttonValidation = () => {
    let count = 0;
    for (const key in postObject) {
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
  const Payment_Methods = () => {
    let PaymentMethods;
    const variationCheckerr = PayMentmethod.length
    // console.log("variationCheckerr",variationCheckerr)
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
  const [genericDetailsList, setGenericDetials] = useState();

  const [detailsList, setDetailsList] = useState(DEFAULT_DETAILS);

  useEffect(() => {
    setGenericDetials(orignalDetailesList);
  }, [isSuccess]);
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
      await service.post("web/beautyCenterServices", postObject);
      setSubmitLoading(false);
      openNotificationWithIcon("success");
      history.push(
        sellerIdProp
          ? `/app/apps/CRM/veForm?name=view&id=${sellerIdProp}`
          : "beautyCenterServices"
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
                {mode === "ADD" ? "Add New Product" : `Edit Product`}{" "}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() => history.push("beautyCenterServices")}
                >
                  Discard
                </Button>
                <Button
                  type="primary"
                  disabled={!buttonValidation() || !detailsButtonValidation()||!Payment_Methods()
                  }
                  htmlType="submit"
                  onClick={() =>
                    setPostObject({
                      ...postObject,
                      paymentMethods:PayMentmethod,
                      details: detailsList.map(
                        (element) => element.generic_detail_id
                      ),
                    })
                  }
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
                services={services}
                tagsList={tagsList}
                postObject={postObject}
                storeIdProp={storeIdProp}
                setPostObject={setPostObject}
              />
            </TabPane>
            <TabPane tab="Details" key="2">
              <BeautyCenterDetails
                postObject={postObject}
                setPostObject={setPostObject}
                orignalDetailesList={orignalDetailesList}
                detailsList={detailsList}
                setDetailsList={setDetailsList}
                genericDetailsList={genericDetailsList}
                setGenericDetials={setGenericDetials}
              />
            </TabPane>
            {/* <TabPane tab="Payment Methods" key="3">
            <PaymentMethod
                postObject={postObject}
                setPostObject={setPostObject}
                orignalDetailesList={orignalDetailesList}
                PayMentmethod={PayMentmethod}
                setPayMentmethod={setPayMentmethod}
              />
            </TabPane> */}
            {postObject.beauty_center_id?  <TabPane tab="Payment Methods" key="3">
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
