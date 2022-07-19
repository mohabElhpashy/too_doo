import React, { useState, useEffect } from "react";
import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetch } from "hooks";
import { useHistory, useLocation } from "react-router-dom";
import GeneralField from "./GeneralField";
import TripVariationField from "./TripVariationField";
import TripDetails from "./TripDetails";
import PaymentMethod from './Payment'
const { TabPane } = Tabs;
const DEFAULT_DETAILS = [
  { id: 1, generic_detail_type_id: null, generic_detail_id: null },
];

const ADD = "ADD";
const TRIPS_ID = 6;
const ProductForm = (props) => {
  const { mode = ADD, param } = props;
  const location = useLocation();
  const storeIdProp = new URLSearchParams(location.search).get("store_id");
  const sellerIdProp = new URLSearchParams(location.search).get("seller_id");

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const { services } = useFetch("travelAgency");
  const history = useHistory();
  const genericDetailes = useFetch(`genericDetailsProducts/${TRIPS_ID}`);
  const orignalDetailesList = genericDetailes.services;
  const isSuccess = genericDetailes.isSuccess;
  const [genericDetailsList, setGenericDetials] = useState();
  const [PayMentmethod,setPayMentmethod]=useState([])

  const tripsDestinationRes = useFetch("tripDestination");
  const tripsDestinations = tripsDestinationRes.services;

  const tags = useFetch("tags");
  const tagsList = tags.services;
  const [detailsList, setDetailsList] = useState(DEFAULT_DETAILS);
  useEffect(() => {
    setGenericDetials(orignalDetailesList);
  }, [isSuccess]);

  const [variationList, setVariationList] = useState([
    {
      id: 0,
      price: null,
      number_of_days: "",
      description_ar: "",
      description_en: "",
    },
  ]);
  const disableObject = {
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    traveling_agency_id: storeIdProp ? storeIdProp : null,
    main_image: null,
    meal_type: null,
    custom_image: null,
    images: [],
    tags: [],
    details: [],
    variations: [],
  };
  const [postObject, setPostObject] = useState({
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    traveling_agency_id: storeIdProp ? storeIdProp : null,
    main_image: null,
    with_transportation: false,
    meal_type: null,
    custom_image: null,
    images: [],
    tags: [],
    details: [],
    variations: [],
  });
  const buttonValidation = () => {
    let count = 0;
    for (const key in disableObject) {
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
  const variationButtonValidation = () => {
    let varationChecker;
    const variationCheckerr = variationList.find(
      (element) =>
        !element.price ||
        !element.description_en ||
        !element.description_ar ||
        !element.number_of_days
    );
    if (variationCheckerr) {
      varationChecker = false;
    } else {
      varationChecker = true;
    }
    return varationChecker;
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
      await service.post("/web/trip", postObject);
      setSubmitLoading(false);
      openNotificationWithIcon("success");
      history.push(
        sellerIdProp
          ? `/app/apps/CRM/veForm?name=view&id=${sellerIdProp}`
          : "Trips"
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
                <Button className="mr-2" onClick={() => history.push("Trips")}>
                  Discard
                </Button>
                <Button
                  type="primary"
                  disabled={
                    !buttonValidation() ||
                    !detailsButtonValidation() ||
                    !variationButtonValidation()
                  }
                  onClick={() =>
                    setPostObject({
                      ...postObject,
                      variations: variationList,
                      paymentMethods:PayMentmethod,
                      details: detailsList.map(
                        (element) => element.generic_detail_id
                      ),
                    })
                  }
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
                services={services}
                tagsList={tagsList}
                postObject={postObject}
                storeIdProp={storeIdProp}
                setPostObject={setPostObject}
                tripsDestinations={tripsDestinations}
              />
            </TabPane>
            <TabPane tab="Details" key="2">
              <TripDetails
                postObject={postObject}
                setPostObject={setPostObject}
                orignalDetailesList={orignalDetailesList}
                detailsList={detailsList}
                setDetailsList={setDetailsList}
                genericDetailsList={genericDetailsList}
                setGenericDetials={setGenericDetials}
              />
            </TabPane>
            <TabPane tab="Variation" key="3">
              <TripVariationField
                postObject={postObject}
                setPostObject={setPostObject}
                variationList={variationList}
                setVariationList={setVariationList}
              />
            </TabPane>
            
            {postObject.traveling_agency_id? <TabPane tab="Payment Method" key="4">
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
