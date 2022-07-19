import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetch, useFetchSingle } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import WeddingExtraField from "./WeddingExtraField";
import GeneralField from "./GeneralField";
import Loading from "components/shared-components/Loading";
import WeddingHallDetails from "./WeddingHallDetails";
import Payment from './Payment_Methods'
const { TabPane } = Tabs;
const DEFAULT_DETAILS = [
  {
    id: 1,
    generic_detail_type_id: null,
    generic_detail_id: null,
  },
];
const WeddingHall = 2;
const ProductForm = () => {
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const { services } = useFetch("hotels");
  const history = useHistory();
  const tags = useFetch("tags");
  const genericDetailes = useFetch(`genericDetailsProducts/${WeddingHall}`);
  const orignalDetailesList = genericDetailes.services;
  const detailIsSuccess = genericDetailes.isSuccess;
  const [buttonCheker, setButtonChecker] = useState(true);
  const extraPackageRes = useFetch("weddingHallExtraPackages");
  const extraPackageList = extraPackageRes.services;
  const extraPackageListIsSuccess = extraPackageRes.isSuccess;

  const [genericDetailsList, setGenericDetials] = useState();
  const tagsList = tags.services;
  const location = useLocation();
  const recordId = new URLSearchParams(location.search).get("id");
  const actionType = new URLSearchParams(location.search).get("name");
  const getSingleWeddingHall = useFetchSingle(`weddingHall/${recordId}`);
  const singleWeddingHall = getSingleWeddingHall.services;
  const refetch = getSingleWeddingHall.refetch;
  const isSuccess = getSingleWeddingHall.isSuccess;
  const [variationList, setVariationList] = useState([
    {
      id: 0,
      price: null,
      name_en: "",
      name_ar: "",
      description_en: "",
      description_ar: "",
      extraPackages: [],
    },
  ]);
  const inialState = {
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    hotel_id: null,
    main_image: null,
    images: [],
    tags: [],
    details: [],
  };
  const [postObject, setPostObject] = useState(inialState);
  const [detailsList, setDetailsList] = useState([]);
  const [PayMentmethod,setPayMentmethod]=useState([])
  const [Periods,setPeriods]=useState([])

  console.log(postObject, "Post Object");
  useEffect(() => {
    setGenericDetials(orignalDetailesList);
  }, [detailIsSuccess]);
  const buttonValidation = () => {
    let count = 0;
    for (const key in inialState) {
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

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      // const test = singleWeddingHall.variations.map((element) => {
      //   return {
      //     ...element,
      //     extraPackages: element.extraPackages.map(
      //       (item) => item.extra_package_id
      //     ),
      //   };
      // });

      // console.log(test, "Just a test of the array");
      setPostObject({
        ...singleWeddingHall,
        tags: singleWeddingHall?.tags.map((element, index) => element.tag_id),
        // variations: test,
        // main_image: singleWeddingHall.main_image.split("/")[4],
      });
      // setVariationList(test);

      const cleanDetails = singleWeddingHall?.details?.map((element) => {
        return {
          id: element.id,
          generic_detail_type_id: element.parent_id,
          generic_detail_id: element.detail_id,
        };
      });

      setDetailsList(cleanDetails);
      setPayMentmethod([...singleWeddingHall.wedding_hall_payment_method])
      setDetailsList([...singleWeddingHall.details])
      setPeriods([...singleWeddingHall.wedding_hall_period_variation])


    }
  }, [isSuccess && extraPackageListIsSuccess]);

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
        !element.name_en ||
        !element.name_ar ||
        !element.description_en ||
        !element.description_ar ||
        element?.extraPackages?.length === 0
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

  // useEffect(() => {
  //   if (isSuccess) {
  //     form.resetFields();
  //     setPostObject(singleDress);
  //   }
  // }, [isSuccess]);

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done",
    });
  };
  const onFinish = async (postObject) => {
    setSubmitLoading(true);

    console.log("postObject-postObject-postObject",postObject)
    try {
      const data = new FormData();
      for (const key of Object.keys(postObject)) {
        data.append(key, postObject[key]);
      }
      await service.put(`/web/weddingHall/${recordId}`, {
        ...postObject,
        main_image: postObject.main_image.split("/")[4]
          ? postObject.main_image.split("/")[4]
          : postObject.main_image,
      });
      refetch();
      setSubmitLoading(false);
      openNotificationWithIcon("success");
      history.push("weddingHall");
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
                  {actionType === "view" ? "Read Product" : "Edit Product"}
                </h2>
                <div className="mb-3">
                  <Button
                    className="mr-2"
                    onClick={() => history.push("weddingHall")}
                  >
                    Discard
                  </Button>
                  <Button
                    type="primary"
                    // disabled={
                    //   !buttonValidation() ||
                    //   !detailsButtonValidation() ||
                    //   !variationButtonValidation() ||
                    //   detailsList.length === 0 ||
                    //   !buttonCheker ||
                    //   actionType === "view"
                    // }
                    onClick={() =>
                      setPostObject({
                        ...postObject,
                        variations: variationList,
                        paymentMethods:PayMentmethod,
                        details:detailsList,
                        periods: Periods,



                        // details: detailsList.map(
                        //   (element) => element.generic_detail_id
                        // ),
                      })
                    }
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
                  services={services}
                  tagsList={tagsList}
                  checkView={actionType === "view"}
                  postObject={postObject}
                  setPostObject={setPostObject}
                  setButtonChecker={setButtonChecker}
                />
              </TabPane>
              <TabPane tab="Details" key="2">
                <WeddingHallDetails
                  postObject={postObject}
                  setPostObject={setPostObject}
                  // variationList={variationList}
                  // setVariationList={setVariationList}
                  // orignalDetailesList={orignalDetailesList}
                  detailsList={detailsList}
                  setDetailsList={setDetailsList}
                  // genericDetailsList={genericDetailsList}
                  // setGenericDetials={setGenericDetials}
                  checkView={actionType === "view"}
                />
              </TabPane>
              <TabPane tab="Variations" key="3">
                <WeddingExtraField
                  checkView={actionType === "view"}
                  postObject={postObject}
                  setPostObject={setPostObject}
                  // variationList={variationList}
                  // setVariationList={setVariationList}
                  // setButtonChecker={setButtonChecker}
                  // extraPackageList={extraPackageList}
                  Periods={Periods}setPeriods={setPeriods}
                />
              </TabPane>
              <TabPane tab="Payment Methods" key="4">
              <Payment
                postObject={postObject}
                setPostObject={setPostObject}
                checkView={actionType === "view"}
                PayMentmethod={PayMentmethod}
                setPayMentmethod={setPayMentmethod}
                services={services}
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
