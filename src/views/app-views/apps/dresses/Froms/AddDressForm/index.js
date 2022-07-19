import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message, notification } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import { useFetch } from "hooks";
import service from "auth/FetchInterceptor";
import DressVariationField from "./DressVariationField";
import { useHistory, useLocation } from "react-router-dom";
import DressDetails from "./DressDetails";
const { TabPane } = Tabs;
const DEFAULT_DETAILS = [
  {
    id: 1,
    generic_detail_type_id: null,
    generic_detail_id: null,
  },
];
const ADD = "ADD";
const DRESS_ID = 7;

const ProductForm = (props) => {
  const { mode = ADD, param } = props;
  const location = useLocation();
  const storeIdProp = new URLSearchParams(location.search).get("store_id");
  const sellerIdProp = new URLSearchParams(location.search).get("seller_id");
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const { services, isSuccess } = useFetch("dressStore");
  const history = useHistory();
  const tags = useFetch("tags");
  const genericDetailes = useFetch(`genericDetailsProducts/${DRESS_ID}`);
  const orignalDetailesList = genericDetailes.services;
  const isDetailsSuccess = genericDetailes.isSuccess;

  const [genericDetailsList, setGenericDetials] = useState();
  const tagsList = tags.services;
  const [ALL_Data,setALL_Data]=useState([])

  const [variationList, setVariationList] = useState([
    {
      id: 0,
      price: null,
      purchase_type: "",
      payment_methods:[]
      
    },
  ]);
  const [detailsList, setDetailsList] = useState(DEFAULT_DETAILS);
  const Payment_Methods = () => {
    let PaymentMethods;
    const variationCheckerr = variationList[0].payment_methods.length
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
    console.log("____________________________",ALL_Data)
    setGenericDetials(orignalDetailesList);
  }, [isDetailsSuccess,ALL_Data]);

  useEffect(() => {
    form.resetFields();
  }, [isSuccess]);
  const disabledObj = {
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    color: "#FFFFF",
    dress_store_id: null,
    images: [],
    details: [],
    tags: [],
  };
  const [postObject, setPostObject] = useState({
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    color: "#FFFFF",
    dress_store_id: storeIdProp ? storeIdProp : null,
    main_image: null,
    with_accessories: false,
    with_veil: false,
    with_modification: false,
    handmade: false,
    video_link:"",
    video_link_URL:"",
    true_view:"",
    thumbnail_image:"",


    images: [],
    details: [],
    tags: [],
  });
  const buttonValidation = () => {
    let count = 0;
    for (const key in disabledObj) {
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
      (element) => !element.price || !element.purchase_type 
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
  console.log(postObject, "Post Object");
  const onFinish = async (postObject) => {
    setSubmitLoading(true);
    const finalObject = {
      ...postObject,
      images: postObject.images.map((element) => {
        return {
          ...element,
          image: element.image.split("Dress/")[1],
        };
      }),
    };
    // console.log(finalObject, "This is the final Object");
    try {
      await service.post("/web/dress", postObject);
      setSubmitLoading(false);
      openNotificationWithIcon("success");
      history.push(
        sellerIdProp
          ? `/app/apps/CRM/veForm?name=view&id=${sellerIdProp}`
          : "dress"
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
                <Button className="mr-2" onClick={() => history.push("dress")}>
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
                storeIdProp={storeIdProp}
                postObject={postObject}
                setPostObject={setPostObject}
                gerericDetailesList={orignalDetailesList}
                ALL_Data={ALL_Data}setALL_Data={setALL_Data}

              />
            </TabPane>
            <TabPane tab="Details" key="2">
              <DressDetails
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
            {/* <TabPane tab="Variations" key="3">
              <DressVariationField
                services={services}
                postObject={postObject}
                setPostObject={setPostObject}
                variationList={variationList}
                setVariationList={setVariationList}
                ALL_Data={ALL_Data}
              />
            </TabPane> */}
            {postObject.dress_store_id? <TabPane tab="Variations" key="3">
              <DressVariationField
                services={services}
                postObject={postObject}
                setPostObject={setPostObject}
                variationList={variationList}
                setVariationList={setVariationList}
                ALL_Data={ALL_Data}
              />
            </TabPane>: null}
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
