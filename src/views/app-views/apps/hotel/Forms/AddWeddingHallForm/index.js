import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message, notification } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import { useFetch } from "hooks";
import service from "auth/FetchInterceptor";
import WeddingExtraField from "./WeddingExtraField";
import { useHistory, useLocation } from "react-router-dom";
import WeddingHallDetails from "./WeddingHallDetails";
import Payment from './PaymentMethod'

const { TabPane } = Tabs;

const ADD = "ADD";
const EDIT = "EDIT";
const HOTEL_ID = 2;
const ProductForm = (props) => {
  const { mode = ADD, param } = props;
  const location = useLocation();
  const storeIdProp = new URLSearchParams(location.search).get("store_id");
  const sellerIdProp = new URLSearchParams(location.search).get("seller_id");

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const { services } = useFetch("hotels");
  const history = useHistory();
  const tags = useFetch("tags");
  const extraPackageRes = useFetch("weddingHallExtraPackages");
  const extraPackageList = extraPackageRes.services;
  const genericDetailes = useFetch(`genericDetailsProducts/${HOTEL_ID}`);
  const orignalDetailesList = genericDetailes.services;
  const isSuccess = genericDetailes.isSuccess;
  const tagsList = tags.services;
  const [genericDetailsList, setGenericDetials] = useState();
  // const [detailsList, setDetailsList] = useState(DEFAULT_DETAILS);
  const [PayMentmethod,setPayMentmethod]=useState([])

  

  const [variationList, setVariationList] = useState([
    {
      id: 0,
      name_ar: "",
      name_en: "",
      description_en: "",
      description_ar: "",
      price: null,
      extraPackages: [],
    },
  ]);
 
  const [details,setdetails]=useState([{
    id:1,
    name_en:"",
    name_ar:"",
    description_en:"",
    description_ar:""
  }])
  const [periods_packagePrices,setperiods_packagePrices]=useState([])
  console.log("periods_packagePrices",periods_packagePrices)
 
  const[periods_Variations,setperiods_Variations ]=useState([{
      id:1,
      name_ar:"",
      name_en:"",
      description_ar:"",
      description_en:"",
      packagePrices: periods_packagePrices
  }])

  periods_Variations[periods_Variations.length-1].packagePrices = periods_packagePrices
  // console.log("after",periods_Variations)
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

  const[periods_General,setperiods_General]=useState([
  //   {id:1,
  //     wedding_hall_period_id:"",
  //   capacity:"",
  //   available_from:"",
  //   available_to:"",  
  //   variations: periods_Variations,

  // }
  ])
  const [postObject, setPostObject] = useState({
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    hotel_id: storeIdProp ? storeIdProp : null,
    main_image: null,
    images: [],
    video_link:"",
    video_link_URL:"",
    true_view:"",
    thumbnail_image:"",


    tags: [],
    details: details,

  });
  useEffect(() => {
    // console.log("periods",periods)
    setGenericDetials(orignalDetailesList);
  }, [isSuccess,periods_General]);
 
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done",
    });
  };
  const onFinish = async (postObject) => {
    setSubmitLoading(true);
    
    try {
     
      await service.post("/web/weddingHall", postObject);
      setSubmitLoading(false);
      openNotificationWithIcon("success");
      history.push(
        sellerIdProp
          ? `/app/apps/CRM/veForm?name=view&id=${sellerIdProp}`
          : "WeddingHall"
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
                  onClick={() => {
                    // setDetailsList([]);
                    history.push("weddingHall");
                  }}
                >
                  Discard
                </Button>
                <Button
                id="ADDDDDDD"
                  type="primary"
                  disabled={
                    // !buttonValidation() ||
                    // !detailsButtonValidation() ||
                    // !variationButtonValidation()||
                    !Payment_Methods()
                  }
                  onClick={() => {
                    setPostObject({
                      ...postObject,
                      periods: periods_General,
                      paymentMethods:PayMentmethod,

                      // details: detailsList.map(
                      //   (element) => element.generic_detail_id
                      // ),
                    });
                  }}
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
              />
            </TabPane>
             <TabPane tab="Details" key="3">
              <WeddingHallDetails
                // postObject={postObject}
                // setPostObject={setPostObject}
                // variationList={variationList}
                // setVariationList={setVariationList}
                // orignalDetailesList={orignalDetailesList}
                // detailsList={detailsList}
                // setDetailsList={setDetailsList}
                // genericDetailsList={genericDetailsList}
                // setGenericDetials={setGenericDetials}
                details={details}
                setdetails={setdetails}
              />
            </TabPane>
           <TabPane tab="Variations" key="2">
              <WeddingExtraField
              periods_General= {periods_General}
               setperiods_General={setperiods_General}
               periods_Variations={periods_Variations}
               setperiods_Variations={setperiods_Variations}
               periods_packagePrices={periods_packagePrices}
               setperiods_packagePrices={setperiods_packagePrices}
              />
            </TabPane>
               {/* <Payment
                postObject={postObject}
                setPostObject={setPostObject}
                PayMentmethod={PayMentmethod}
                setPayMentmethod={setPayMentmethod}
                services={services}
              /> */}
               {postObject.hotel_id? <TabPane tab="Payment Methods" key="4">
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
