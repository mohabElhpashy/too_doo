import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message, notification } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import { useFetch } from "hooks";
import service from "auth/FetchInterceptor";
import CarsVariationField from "./CarsVariationField";
import { useHistory, useLocation } from "react-router-dom";
import CarDetails from "./CarDetails";
import Payment from './Payment_Methods'

const { TabPane } = Tabs;

const ADD = "ADD";
const EDIT = "EDIT";
const CAR_ID = 1;
const ProductForm = (props) => {
  const { mode = ADD, param } = props;
  const location = useLocation();
  const storeIdProp = new URLSearchParams(location.search).get("store_id");
  const sellerIdProp = new URLSearchParams(location.search).get("seller_id");

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const { services } = useFetch("agencies");
  const history = useHistory();
  const tags = useFetch(`tags/service/${CAR_ID}`);
  const genericDetailes = useFetch(`genericDetailsProducts/${CAR_ID}`);
  const gerericDetailesList = genericDetailes.services;
  const tagsList = tags.services;
  const [genericDetailsList, setGenericDetials] = useState();

  const orignalDetailesList = genericDetailes.services;
  const isSuccess = genericDetailes.isSuccess;

  const [variationList, setVariationList] = useState([
    {
      id: 0,
      price: null,
      number_of_hours: "",
    },
  ]);
  const DEFAULT_DETAILS = [
    {
      id: 1,
      generic_detail_type_id: null,
      generic_detail_id: null,
    },
  ];
  const [detailsList, setDetailsList] = useState(DEFAULT_DETAILS);
  useEffect(() => {
    setGenericDetials(orignalDetailesList);
  }, [isSuccess]);
  const DISABLE_OBJECT = {
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    agency_id: storeIdProp ? storeIdProp : null,
    main_image: null,
    images: [],

    tags: [],
    details: {},
    no_of_seats: null,
    variations: [],
  };
  const [PayMentmethod,setPayMentmethod]=useState([])
  const [postObject, setPostObject] = useState({
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    agency_id: storeIdProp ? storeIdProp : null,
    main_image: null,
    images: [],
    tags: [],
    video_link:"",
    video_link_URL:"",
    true_view:"",
    thumbnail_image:"",
    image_URL:"",
    details: {},
    with_decoration: false,
    with_captain: false,
    no_of_seats: null,
    variations: [],
  });

  const buttonValidation = () => {
    let count = 0;
    for (const key in DISABLE_OBJECT) {
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
        element.generic_details_id === null ||
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
      (element) => !element.price || !element.number_of_hours
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
      console.log("CArs",postObject)
      await service.post("/web/cars", postObject);
      setSubmitLoading(false);
      openNotificationWithIcon("success");
      history.push(
        sellerIdProp
          ? `/app/apps/CRM/veForm?name=view&id=${sellerIdProp}`
          : "cars"
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
                <Button className="mr-2" onClick={() => history.push("cars")}>
                  Discard
                </Button>
                <Button
                  type="primary"
                  disabled={
                    !buttonValidation() ||
                    !detailsButtonValidation() ||
                    !variationButtonValidation()||
                    !Payment_Methods()
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
                gerericDetailesList={gerericDetailesList}
              />
            </TabPane>

            <TabPane tab="Details" key="2">
              <CarDetails
                postObject={postObject}
                setPostObject={setPostObject}
                variationList={variationList}
                setVariationList={setVariationList}
                orignalDetailesList={orignalDetailesList}
                detailsList={detailsList}
                setDetailsList={setDetailsList}
                genericDetailsList={genericDetailsList}
                setGenericDetials={setGenericDetials}
              />
            </TabPane>
            <TabPane tab="Variation" key="3">
              <CarsVariationField
                postObject={postObject}
                setPostObject={setPostObject}
                variationList={variationList}
                setVariationList={setVariationList}
                services={services}
              />
            </TabPane>
            {postObject.agency_id? <TabPane tab="Payment Methods" key="4">
              <Payment
                postObject={postObject}
                setPostObject={setPostObject}
                PayMentmethod={PayMentmethod}
                setPayMentmethod={setPayMentmethod}
                services={services}
              />
            </TabPane>: null}
           
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
