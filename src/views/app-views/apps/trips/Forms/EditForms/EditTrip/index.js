import { Button, Form, notification, Tabs } from "antd";
import service from "auth/FetchInterceptor";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import Loading from "components/shared-components/Loading";
import { useFetch, useFetchSingle } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import GeneralField from "./GeneralField";
import TripVariationField from "./TripVariationField";
import TripDetails from "./TripDetails";
import Payment from './Payment_Methods'

const { TabPane } = Tabs;
const DEFAULT_DETAILS = [
  {
    id: 1,
    generic_detail_type_id: null,
    generic_detail_id: null,
  },
];
const DEFUALT_VARAIATION = {
  price: null,
  number_of_days: "",
  description_ar: "",
  description_en: "",
};
const TRIPS_ID = 6;
const ProductForm = () => {
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const { services } = useFetch("travelAgency");
  const history = useHistory();
  const location = useLocation();
  const tags = useFetch("tags");
  const genericDetailes = useFetch(`genericDetailsProducts/${TRIPS_ID}`);
  const orignalDetailesList = genericDetailes.services;
  const detailsIsSuccess = genericDetailes.isSuccess;
  const [genericDetailsList, setGenericDetials] = useState();
  const tripsDestinationRes = useFetch("tripDestination");
  const tripsDestinations = tripsDestinationRes.services;
  const tripsisSuccess = tripsDestinationRes.isSuccess;

  const recordId = new URLSearchParams(location.search).get("id");
  const actionType = new URLSearchParams(location.search).get("name");
  const getSingleTrip = useFetchSingle(`trip/${recordId}`);
  const refetch = getSingleTrip.refetch;
  const singleObjectIsSuccess = getSingleTrip.isSuccess;

  const singleTrip = getSingleTrip.services;
  const isSuccess = getSingleTrip.isSuccess;
  const tagsList = tags.services;
  const [variationList, setVariationList] = useState([DEFUALT_VARAIATION]);
  const INITAL_STATE = {
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    traveling_agency_id: null,
    main_image: null,
    meal_type: null,
    with_transportation: null,
    images: [],
    tags: [],
    details: [],
  };
  const DisableObj = {
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    traveling_agency_id: null,
    main_image: null,
    meal_type: null,
    images: [],
    tags: [],
    details: [],
  };
  const [postObject, setPostObject] = useState(INITAL_STATE);
  const [detailsList, setDetailsList] = useState(DEFAULT_DETAILS);
  useEffect(() => {
    setGenericDetials(orignalDetailesList);
  }, [detailsIsSuccess]);
  const [buttonCheker, setButtonChecker] = useState(true);
  const [PayMentmethod,setPayMentmethod]=useState([])


  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      setPostObject({
        ...singleTrip,
        tags: singleTrip?.tags.map((element, index) => element.tag_id),
        // main_image: singleTrip.main_image.split("/")[4],
      });
      setVariationList(singleTrip.variations);
      const cleanDetails = singleTrip?.details?.map((element) => {
        return {
          id: element.id,
          generic_detail_type_id: element.parent_id,
          generic_detail_id: element.detail_id,
        };
      });

      setDetailsList(cleanDetails);
    }
  }, [singleObjectIsSuccess]);
  const buttonValidation = () => {
    let count = 0;
    for (const key in DisableObj) {
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
        !element.number_of_days ||
        !element.description_en ||
        !element.description_ar
    );
    if (variationCheckerr) {
      varationChecker = false;
    } else {
      varationChecker = true;
    }
    return varationChecker;
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
      const data = new FormData();
      for (const key of Object.keys(postObject)) {
        data.append(key, postObject[key]);
      }
      await service.put(`/web/trip/${recordId}`, {
        ...postObject,
        main_image: postObject.main_image.split("/")[4]
          ? postObject.main_image.split("/")[4]
          : postObject.main_image,
      });
      setSubmitLoading(false);
      openNotificationWithIcon("success");
      refetch();
      history.push("Trips");
    } catch (error) {
      setSubmitLoading(false);
    }
  };
  return (
    <>
      {!singleObjectIsSuccess ? (
        <Loading align="center" cover="content" loading={true} />
      ) : (
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
                  {actionType === "view" ? "Read Record" : "Edit Record"}
                </h2>
                <div className="mb-3">
                  <Button
                    className="mr-2"
                    onClick={() => history.push("Trips")}
                  >
                    Discard
                  </Button>
                  <Button
                    type="primary"
                    disabled={
                      !buttonValidation() ||
                      !detailsButtonValidation() ||
                      !variationButtonValidation() ||
                      detailsList.length === 0 ||
                      variationList.length === 0 ||
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
                  postObject={postObject}
                  setPostObject={setPostObject}
                  tripsDestinations={tripsDestinations}
                  setButtonChecker={setButtonChecker}
                  checkView={actionType === "view"}
                />
              </TabPane>
              <TabPane tab="Details" key="2">
                <TripDetails
                  postObject={postObject}
                  setPostObject={setPostObject}
                  variationList={variationList}
                  setVariationList={setVariationList}
                  orignalDetailesList={orignalDetailesList}
                  detailsList={detailsList}
                  setDetailsList={setDetailsList}
                  genericDetailsList={genericDetailsList}
                  setGenericDetials={setGenericDetials}
                  checkView={actionType === "view"}
                />
              </TabPane>
              <TabPane tab="Variation" key="3">
                <TripVariationField
                  checkView={actionType === "view"}
                  postObject={postObject}
                  setPostObject={setPostObject}
                  variationList={variationList}
                  setVariationList={setVariationList}
                  setButtonChecker={setButtonChecker}
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
      )}
    </>
  );
};

export default ProductForm;
