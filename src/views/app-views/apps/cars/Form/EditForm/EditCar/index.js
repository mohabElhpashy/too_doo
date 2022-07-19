import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { useFetch, useFetchSingle } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CarVariationField from "./CarVariationField";
import GeneralField from "./GeneralField";
import Loading from "components/shared-components/Loading";
import CarDetails from "../EditCar/CarsDetails";
import Payment from '../EditCar/Payment_Methods'
const { TabPane } = Tabs;
const DEFAULT_DETAILS = [
  {
    id: 1,
    generic_detail_type_id: null,
    generic_detail_id: null,
  },
];

const CAR_ID = 1;
const ProductForm = (props) => {
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const { services } = useFetch("agencies");

  const history = useHistory();
  const tags = useFetch("tags");
  const tagsList = tags.services;
  const location = useLocation();
  const recordId = new URLSearchParams(location.search).get("id");
  const actionType = new URLSearchParams(location.search).get("name");
  const getSingleCar = useFetchSingle(`cars/${recordId}`);
  const singleCar = getSingleCar.services;
  const isSuccess = getSingleCar.isSuccess;
  const refetch = getSingleCar.refetch;

  const afterMount = getSingleCar.isFetchedAfterMount;
  const genericDetailes = useFetch(`genericDetailsProducts/${CAR_ID}`);
  const orignalDetailesList = genericDetailes.services;
  const detailIsSuccess = genericDetailes.isSuccess;
  const [buttonCheker, setButtonChecker] = useState(true);
  const [PayMentmethod,setPayMentmethod]=useState([])


  const [variationList, setVariationList] = useState([
    {
      id: 0,
      price: null,
      number_of_hours: "",
    },
  ]);
  const INITAL_STATE = {
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    agency_id: null,
    main_image: null,
    with_decoration: false,
    with_captain: false,
    no_of_seats: null,
    images: [],
    details: [],
    tags: [],
  };
  const DISABLE_OBJECT = {
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    agency_id: null,
    main_image: null,
    images: [],
    details: [],
    tags: [],
  };
  const [postObject, setPostObject] = useState(INITAL_STATE);
  const [detailsList, setDetailsList] = useState(DEFAULT_DETAILS);
  const [genericDetailsList, setGenericDetials] = useState();
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
  // console.log(postObject, "Post Object");
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
  useEffect(() => {
    setGenericDetials(orignalDetailesList);
  }, [detailIsSuccess]);
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();

      setPostObject({
        ...singleCar,
        tags: singleCar?.tags.map((element, index) => element.tag_id),
      });
      setPayMentmethod([...singleCar.car_payment_method])
      // console.log("from end components")
      setVariationList(singleCar.variations);
      const cleanDetails = singleCar?.details?.map((element) => {
        return {
          id: element.id,
          generic_detail_type_id: element.parent_id,
          generic_detail_id: element.detail_id,
        };
      });
      setDetailsList(cleanDetails);
    }
  }, [isSuccess]);

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Process Feedback",
      description: "Your Process has been Done",
    });
  };
  console.log("PayMentmethod_PayMentmethod",PayMentmethod)
  const onFinish = async (postObject) => {
    setSubmitLoading(true);

    // console.log("show result",postObject.variations)
    try {
      // const data = new FormData();
      // for (const key of Object.keys(postObject)) {
      //   data.append(key, postObject[key]);
      // }
      await service.put(`/web/cars/${recordId}`, {
        ...postObject,
        main_image: postObject.main_image.split("Car/")[1]
          ? postObject.main_image.split("Car/")[1]
          : postObject.main_image,
      });
      refetch();
      setSubmitLoading(false);
      openNotificationWithIcon("success");
      history.push("cars");
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
                  <Button className="mr-2" onClick={() => history.push("cars")}>
                    Discard
                  </Button>
                  <Button
                    type="primary"
                    disabled={
                      !buttonValidation() ||
                      !detailsButtonValidation() ||
                      !variationButtonValidation() ||
                      detailsList.length === 0 ||
                      !buttonCheker ||
                      actionType === "view"
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
                  isSuccess={afterMount}
                  setButtonChecker={setButtonChecker}
                />
              </TabPane>
              <TabPane tab="Details" key="2">
                <CarDetails
                  postObject={postObject}
                  setPostObject={setPostObject}
                  variationList={variationList}
                  // setVariationList={setVariationList}
                  orignalDetailesList={orignalDetailesList}
                  detailsList={detailsList}
                  setDetailsList={setDetailsList}
                  genericDetailsList={genericDetailsList}
                  setGenericDetials={setGenericDetials}
                  checkView={actionType === "view"}
                />
              </TabPane>
              <TabPane tab="Variation" key="3">
                <CarVariationField
                  checkView={actionType === "view"}
                  postObject={postObject}
                  setPostObject={setPostObject}
                  variationList={variationList}
                  setVariationList={setVariationList}
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
